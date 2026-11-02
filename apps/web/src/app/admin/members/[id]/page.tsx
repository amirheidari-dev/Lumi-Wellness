"use client";

import { useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  Calendar,
  Award,
  ChevronRight,
  Edit,
  Trash2,
  KeyRound,
  CalendarPlus,
  PencilLine,
  Snowflake,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  formatPersianNumber,
  formatCurrency,
  formatDate,
  formatDateTime,
  getInitials,
} from "@/lib/utils";
import { Loading, ErrorDisplay } from "@/components/ui/DataState";
import {
  useUser,
  useDeleteUser,
  useMemberships,
  useMembershipPlans,
  useTrainingPrograms,
  useUsers,
  useGoals,
  usePayments,
} from "@/hooks/use-api";
import { apiErrorMessage } from "@/components/auth/auth-helpers";
import { PageShell, SectionTitle } from "@/components/twilight/Page";
import { StatCard, TwilightCard } from "@/components/twilight/controls";
import { PAYMENT_METHOD, USER_STATUS, MEMBERSHIP_STATUS, fullName } from "../../_components/admin-data";
import { UserEditSheet, UserPasswordSheet } from "../../_components/UserAdminSheets";
import {
  MembershipFormSheet,
  FreezeSheet,
  useUnfreezeMembershipAction,
} from "../../_components/MembershipSheets";
import { ConfirmDialog } from "../../_components/ConfirmDialog";

function InfoRow({
  icon,
  label,
  value,
  ltr,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 hover:bg-secondary">
      <span className="flex items-center gap-3">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </span>
      <span dir={ltr ? "ltr" : undefined} className="text-sm text-foreground">
        {value}
      </span>
    </div>
  );
}

const thClass = "px-4 py-3 text-right text-[10px] font-semibold text-muted-foreground";
const tdClass = "px-4 py-3 text-muted-foreground";

export default function MemberProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useUser(params.id);
  const { data: membershipsData } = useMemberships();
  const { data: plansData } = useMembershipPlans();
  const { data: programsData } = useTrainingPrograms();
  const { data: usersData } = useUsers();
  const { data: goalsData } = useGoals(data?.data?.id);
  const { data: paymentsData } = usePayments(data?.data?.id);
  const deleteUser = useDeleteUser();
  const unfreezeAction = useUnfreezeMembershipAction();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [membershipSheetOpen, setMembershipSheetOpen] = useState(false);
  const [freezeOpen, setFreezeOpen] = useState(false);
  const [unfreezeOpen, setUnfreezeOpen] = useState(false);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay onRetry={() => void refetch()} />;
  const member = data?.data;
  if (!member) return <ErrorDisplay message="کاربر یافت نشد" />;
  const goals = goalsData?.data ?? [];
  const payments = paymentsData?.data ?? [];

  const membership = (membershipsData?.data ?? [])
    .filter((m) => m.userId === member.id)
    .sort((a, b) => (b.endDate ?? "").localeCompare(a.endDate ?? ""))[0];
  const planName =
    membership?.plan?.name ??
    plansData?.data?.find((p) => p.id === membership?.planId)?.name;
  const coachId = (programsData?.data ?? []).find((p) => p.athleteId === member.id)?.coachId;
  const coach = (usersData?.data ?? []).find((u) => u.id === coachId);
  const coachName = coach ? `${coach.firstName} ${coach.lastName}` : null;

  const statusMeta = USER_STATUS[member.status] ?? USER_STATUS.active;
  const membershipStatusMeta = membership ? MEMBERSHIP_STATUS[membership.status] : null;
  const displayName = fullName(member) || member.email;

  const handleConfirmDelete = () => {
    deleteUser.mutate(member.id, {
      onSuccess: () => {
        toast.success(`عضو «${displayName}» حذف شد`);
        setDeleteOpen(false);
        router.push("/admin/members");
      },
      onError: (err) => toast.error(apiErrorMessage(err, "حذف عضو ناموفق بود")),
    });
  };

  return (
    <PageShell>
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/admin/members">
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            بازگشت به لیست اعضا
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-gradient-to-br from-secondary to-card">
          <span className="font-serif text-2xl text-primary">
            {getInitials(`${member.firstName} ${member.lastName}`)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-2xl font-normal text-foreground">
              {member.firstName} {member.lastName}
            </h1>
            <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Edit className="h-4 w-4" strokeWidth={1.75} /> ویرایش
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPasswordOpen(true)}>
            <KeyRound className="h-4 w-4" strokeWidth={1.75} /> رمز عبور
          </Button>
          <Button
            variant="destructive"
            size="sm"
            aria-label={`حذف ${member.firstName} ${member.lastName}`}
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        <InfoRow
          icon={<Phone className="h-4 w-4" strokeWidth={1.75} />}
          label="تلفن"
          value={member.phone}
          ltr
        />
        <InfoRow
          icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
          label="ایمیل"
          value={member.email}
          ltr
        />
        <InfoRow
          icon={<Award className="h-4 w-4" strokeWidth={1.75} />}
          label="طرح اشتراک"
          value={planName ?? "—"}
        />
        <InfoRow
          icon={<Calendar className="h-4 w-4" strokeWidth={1.75} />}
          label="عضویت از"
          value={formatDate(member.createdAt)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          tone="blush"
          label="اشتراک"
          value={planName ?? "—"}
          suffix={membership ? formatDate(membership.endDate) : formatDate(member.createdAt)}
        />
        <StatCard tone="blush" label="مربی" value={coachName ?? "—"} />
        <TwilightCard className="col-span-2 border-blush-solid/30 bg-blush/10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                جلسات و اشتراک
              </span>
              {membershipStatusMeta && (
                <Badge variant={membershipStatusMeta.variant}>{membershipStatusMeta.label}</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMembershipSheetOpen(true)}
              >
                {membership ? (
                  <>
                    <PencilLine className="h-3.5 w-3.5" strokeWidth={1.75} />
                    ویرایش اشتراک
                  </>
                ) : (
                  <>
                    <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.75} />
                    تخصیص پلن اشتراک
                  </>
                )}
              </Button>
              {membership?.status === "active" && (
                <Button variant="outline" size="sm" onClick={() => setFreezeOpen(true)}>
                  <Snowflake className="h-3.5 w-3.5" strokeWidth={1.75} />
                  توقف اشتراک
                </Button>
              )}
              {membership?.status === "frozen" && (
                <Button variant="outline" size="sm" onClick={() => setUnfreezeOpen(true)}>
                  <Play className="h-3.5 w-3.5" strokeWidth={1.75} />
                  فعال‌سازی دوباره
                </Button>
              )}
            </div>
          </div>
          <div className="mt-3">
            <span className="font-sans text-2xl font-normal tabular-nums tracking-tight text-foreground">
              {formatPersianNumber(membership?.sessionsUsed ?? 0)} /{" "}
              {formatPersianNumber(membership?.sessionsTotal ?? 0)}
            </span>
            <Progress
              value={Math.min(
                100,
                Math.max(
                  0,
                  Math.round(
                    ((membership?.sessionsUsed || 0) / (membership?.sessionsTotal || 1)) * 100
                  )
                )
              )}
              className="mt-3"
              indicatorClassName="bg-none bg-blush-solid"
            />
          </div>
        </TwilightCard>
      </div>

      <Tabs defaultValue="goals" dir="rtl">
        <TabsList>
          <TabsTrigger value="goals">اهداف</TabsTrigger>
          <TabsTrigger value="payments">پرداخت‌ها</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-3">
          {goals.map((goal) => (
            <TwilightCard key={goal.id}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{goal.title}</span>
                <span className="text-xs text-muted-foreground">
                  {formatPersianNumber(goal.currentValue)}/{formatPersianNumber(goal.targetValue)}{" "}
                  {goal.unit}
                </span>
              </div>
              <Progress
                value={Math.min(
                  100,
                  Math.max(
                    0,
                    goal.progressPercentage ??
                      (goal.targetValue > 0
                        ? Math.round((goal.currentValue / goal.targetValue) * 100)
                        : 0)
                  )
                )}
                indicatorClassName="bg-none bg-blush-solid"
              />
            </TwilightCard>
          ))}
        </TabsContent>

        <TabsContent value="payments">
          <SectionTitle className="mb-3">تاریخچه پرداخت‌ها</SectionTitle>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>
                    مبلغ
                  </th>
                  <th scope="col" className={thClass}>
                    روش پرداخت
                  </th>
                  <th scope="col" className={thClass}>
                    وضعیت
                  </th>
                  <th scope="col" className={thClass}>
                    تاریخ
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-secondary">
                    <td className={`${tdClass} font-medium text-foreground`}>
                      {formatCurrency(p.amount)}
                    </td>
                    <td className={tdClass}>{PAYMENT_METHOD[p.method] ?? p.method}</td>
                    <td className={tdClass}>
                      <Badge variant={p.status === "completed" ? "success" : "warning"}>
                        {p.status === "completed" ? "موفق" : "معلق"}
                      </Badge>
                    </td>
                    <td className={tdClass}>{formatDateTime(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      <UserEditSheet open={editOpen} onOpenChange={setEditOpen} user={member} />
      <UserPasswordSheet open={passwordOpen} onOpenChange={setPasswordOpen} user={member} />
      <MembershipFormSheet
        open={membershipSheetOpen}
        onOpenChange={setMembershipSheetOpen}
        userId={member.id}
        membership={membership}
      />
      {membership && (
        <FreezeSheet
          open={freezeOpen}
          onOpenChange={setFreezeOpen}
          membership={membership}
        />
      )}
      {membership && (
        <ConfirmDialog
          open={unfreezeOpen}
          onOpenChange={setUnfreezeOpen}
          title="فعال‌سازی دوباره اشتراک"
          description="اشتراک این عضو از حالت توقف خارج شده و دوباره فعال می‌شود."
          confirmLabel="فعال‌سازی دوباره"
          variant="warning"
          loading={unfreezeAction.isPending}
          onConfirm={() => unfreezeAction.run(membership, () => setUnfreezeOpen(false))}
        />
      )}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="حذف حساب عضو"
        description={`حساب «${displayName}» برای همیشه حذف می‌شود. این کار قابل بازگشت نیست.`}
        confirmLabel="حذف عضو"
        loading={deleteUser.isPending}
        onConfirm={handleConfirmDelete}
      />
    </PageShell>
  );
}
