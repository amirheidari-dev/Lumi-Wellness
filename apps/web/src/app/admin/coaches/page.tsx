"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { formatPersianNumber } from "@/lib/utils";
import { useUsers, useTrainingPrograms } from "@/hooks/use-api";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import { CtaButton } from "@/components/twilight/controls";
import { UserDirectory, type DirectoryColumn } from "../_components/UserDirectory";
import type { User } from "@/lib/types";

export default function CoachesPage() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useUsers("coach");
  const { data: programsData } = useTrainingPrograms();

  const coaches = data?.data ?? [];

  // Distinct coached athletes per coach, from the program roster.
  const studentsByCoach = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const program of programsData?.data ?? []) {
      let set = map.get(program.coachId);
      if (!set) {
        set = new Set();
        map.set(program.coachId, set);
      }
      set.add(program.athleteId);
    }
    return map;
  }, [programsData?.data]);

  const columns = useMemo<DirectoryColumn[]>(
    () => [
      {
        key: "phone",
        label: "شماره تماس",
        value: (user: User) => user.phone || "—",
        ltr: true,
      },
      {
        key: "students",
        label: "تعداد شاگردان",
        value: (user: User) =>
          `${formatPersianNumber(studentsByCoach.get(user.id)?.size ?? 0)} نفر`,
      },
    ],
    [studentsByCoach]
  );

  return (
    <PageShell>
      <PageHeader
        title="مدیریت مربیان"
        subtitle="لیست تمام مربیان باشگاه"
        action={
          <CtaButton onClick={() => router.push("/admin/coaches/new")} className="w-auto px-5">
            <Plus className="h-4 w-4" strokeWidth={1.75} />
            افزودن مربی جدید
          </CtaButton>
        }
      />

      <UserDirectory
        users={coaches}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        basePath="/admin/coaches"
        noun="مربی"
        columns={columns}
        title="فهرست مربیان"
        description="جستجو، فیلتر وضعیت، ویرایش اطلاعات، تغییر رمز عبور و مدیریت حساب مربیان"
        emptyTitle="هیچ مربی‌ای یافت نشد"
        emptyDescription="هنوز مربی‌ای در باشگاه ثبت نشده است."
      />
    </PageShell>
  );
}
