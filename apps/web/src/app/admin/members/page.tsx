"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useUsers, useMemberships, useMembershipPlans } from "@/hooks/use-api";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import { CtaButton } from "@/components/twilight/controls";
import { UserDirectory, type DirectoryColumn } from "../_components/UserDirectory";
import type { User } from "@/lib/types";

export default function MembersPage() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useUsers("athlete");
  const { data: membershipsData } = useMemberships();
  const { data: plansData } = useMembershipPlans();

  const members = data?.data ?? [];

  const planByUserId = useMemo(() => {
    const planNameById = new Map(
      (plansData?.data ?? []).map((plan) => [plan.id, plan.name] as const)
    );
    const latestByUser = new Map<string, { endDate: string; planName: string }>();

    for (const m of membershipsData?.data ?? []) {
      const planName = m.plan?.name ?? planNameById.get(m.planId) ?? "بدون طرح";
      const existing = latestByUser.get(m.userId);
      if (!existing || (m.endDate ?? "") >= existing.endDate) {
        latestByUser.set(m.userId, { endDate: m.endDate ?? "", planName });
      }
    }

    const result = new Map<string, string>();
    for (const [uid, info] of latestByUser.entries()) {
      result.set(uid, info.planName);
    }
    return result;
  }, [membershipsData?.data, plansData?.data]);

  const columns = useMemo<DirectoryColumn[]>(
    () => [
      {
        key: "phone",
        label: "شماره تماس",
        value: (user: User) => user.phone || "—",
        ltr: true,
      },
      {
        key: "plan",
        label: "طرح اشتراک",
        value: (user: User) => planByUserId.get(user.id) ?? "بدون طرح",
      },
    ],
    [planByUserId]
  );

  return (
    <PageShell>
      <PageHeader
        title="مدیریت اعضا"
        subtitle="لیست تمام اعضای باشگاه"
        action={
          <CtaButton onClick={() => router.push("/admin/members/new")} className="w-auto px-5">
            <Plus className="h-4 w-4" strokeWidth={1.75} />
            افزودن عضو جدید
          </CtaButton>
        }
      />

      <UserDirectory
        users={members}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        basePath="/admin/members"
        noun="عضو"
        columns={columns}
        title="فهرست اعضا"
        description="جستجو، فیلتر وضعیت، ویرایش اطلاعات، تغییر رمز عبور و مدیریت حساب اعضا"
        emptyTitle="هیچ عضوی یافت نشد"
        emptyDescription="هنوز عضوی در باشگاه ثبت‌نام نکرده است."
      />
    </PageShell>
  );
}
