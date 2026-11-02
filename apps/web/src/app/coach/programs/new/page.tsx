"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Save } from "lucide-react";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import { TwilightCard } from "@/components/twilight/controls";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { formatPersianNumber } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { useUsers, useCreateTrainingProgram } from "@/hooks/use-api";
import {
  fromDateInputValue,
  jalaliLong,
  shiftDateInput,
  todayDateInput,
} from "../../_dates";
import { mutationErrorMessage } from "../../_errors";

const frequencyOptions = Array.from({ length: 7 }, (_, i) => ({
  value: String(i + 1),
  label: `${formatPersianNumber(i + 1)} روز در هفته`,
}));

export default function NewProgramPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const preselectedAthleteId = searchParams.get("athleteId") ?? "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAthleteId, setAthleteId] = useState("");
  const athleteId = selectedAthleteId || preselectedAthleteId;
  const [startDate, setStartDate] = useState(() => todayDateInput());
  const [endDate, setEndDate] = useState(() => shiftDateInput(todayDateInput(), 28));
  const [frequency, setFrequency] = useState("3");

  const { data: athletesData, isLoading: athletesLoading } = useUsers("athlete");
  const createProgram = useCreateTrainingProgram();
  const athletes = athletesData?.data || [];

  const handleSave = async () => {
    if (!title.trim() || !athleteId || !startDate || !endDate || !frequency) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      return;
    }
    if (endDate <= startDate) {
      toast.error("تاریخ پایان باید بعد از تاریخ شروع باشد");
      return;
    }
    try {
      const res = await createProgram.mutateAsync({
        name: title.trim(),
        description: description.trim() || undefined,
        athleteId,
        coachId: user?.id || "",
        startDate: fromDateInputValue(startDate),
        endDate: fromDateInputValue(endDate),
        frequencyPerWeek: Number(frequency),
        status: "draft",
      });
      toast.success("برنامه تمرینی با موفقیت ایجاد شد");
      if (res.data?.id) {
        router.push(`/coach/programs/${res.data.id}`);
      } else {
        router.push("/coach/programs");
      }
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در ایجاد برنامه تمرینی"));
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="برنامه جدید"
        subtitle="ایجاد برنامه تمرینی جدید برای شاگرد"
        action={
          <Button variant="ghost" size="sm" asChild>
            <Link href="/coach/programs">
              <ChevronRight className="h-4 w-4" />
              بازگشت
            </Link>
          </Button>
        }
      />

      <TwilightCard className="mx-auto w-full max-w-2xl !p-5">
        <div className="space-y-4">
          <Input
            label="عنوان برنامه"
            placeholder="مثال: برنامه حجیم‌سازی ۴ هفته‌ای"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={createProgram.isPending}
          />

          <div className="space-y-1.5">
            <Label>ورزشکار</Label>
            <Select
              value={athleteId}
              onValueChange={setAthleteId}
              disabled={athletesLoading || createProgram.isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder={athletesLoading ? "در حال بارگذاری..." : "انتخاب ورزشکار"} />
              </SelectTrigger>
              <SelectContent>
                {athletes.map((a) => {
                  const name = `${a.firstName} ${a.lastName}`.trim() || a.email;
                  return (
                    <SelectItem key={a.id} value={a.id}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="تاریخ شروع"
              type="date"
              value={startDate}
              hint={startDate ? jalaliLong(fromDateInputValue(startDate)) : undefined}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={createProgram.isPending}
            />
            <Input
              label="تاریخ پایان"
              type="date"
              value={endDate}
              hint={endDate ? jalaliLong(fromDateInputValue(endDate)) : undefined}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={createProgram.isPending}
            />
          </div>

          <div className="space-y-1.5">
            <Label>تعداد جلسات در هفته</Label>
            <Select
              value={frequency}
              onValueChange={setFrequency}
              disabled={createProgram.isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {frequencyOptions.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            label="توضیحات برنامه (اختیاری)"
            placeholder="اهداف دوره، نکات تغذیه‌ای یا ریکاوری..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={createProgram.isPending}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.push("/coach/programs")}
              disabled={createProgram.isPending}
            >
              انصراف
            </Button>
            <Button onClick={handleSave} loading={createProgram.isPending}>
              <Save className="ml-2 h-4 w-4" />
              ذخیره و افزودن حرکات
            </Button>
          </div>
        </div>
      </TwilightCard>
    </PageShell>
  );
}
