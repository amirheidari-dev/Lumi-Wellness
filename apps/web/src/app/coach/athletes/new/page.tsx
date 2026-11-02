"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select";
import { ChevronRight, Save } from "lucide-react";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import { TwilightCard } from "@/components/twilight/controls";
import { useCreateUser, useBranches } from "@/hooks/use-api";
import { mutationErrorMessage } from "../../_errors";

const athleteSchema = z.object({
  firstName: z.string().trim().min(1, "نام را وارد کنید"),
  lastName: z.string().trim().min(1, "نام خانوادگی را وارد کنید"),
  email: z.string().trim().min(1, "ایمیل را وارد کنید").email("ایمیل نامعتبر است"),
  phone: z.string().trim().min(1, "شماره موبایل را وارد کنید"),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "رمز عبور باید شامل حداقل یک حرف انگلیسی و یک عدد باشد"),
  branch: z.string().min(1, "شعبه را انتخاب کنید"),
});

type AthleteFormData = z.infer<typeof athleteSchema>;

export default function NewAthletePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createUser = useCreateUser();
  const { data: branchesData } = useBranches();
  const branches = useMemo(() => branchesData?.data ?? [], [branchesData]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<AthleteFormData>({
    resolver: zodResolver(athleteSchema),
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", password: "", branch: "" },
  });

  const selectedBranch = watch("branch");

  // Single-branch rule: Lumi-Wellness has only the LUMI branch, so hide the
  // branch field and bind it automatically when exactly one branch exists.
  useEffect(() => {
    if (branches.length === 1) {
      setValue("branch", branches[0].id);
    }
  }, [branches, setValue]);

  const onSubmit = async (formData: AthleteFormData) => {
    setIsSubmitting(true);
    try {
      await createUser.mutateAsync({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: "athlete",
        branchId: formData.branch,
        status: "active",
      });
      toast.success("شاگرد جدید با موفقیت ثبت شد");
      router.push("/coach/athletes");
    } catch (err) {
      toast.error(
        mutationErrorMessage(
          err,
          "خطا در ثبت شاگرد جدید",
          "این ایمیل قبلاً در سیستم ثبت شده است"
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="ثبت شاگرد جدید"
        subtitle="ثبت اطلاعات شاگرد جدید"
        action={
          <Button variant="ghost" size="sm" asChild>
            <Link href="/coach/athletes">
              <ChevronRight className="h-4 w-4" />
              بازگشت
            </Link>
          </Button>
        }
      />

      <TwilightCard className="!p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="نام" placeholder="نگار" error={errors.firstName?.message} {...register("firstName")} />
            <Input label="نام خانوادگی" placeholder="محمدی" error={errors.lastName?.message} {...register("lastName")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="ایمیل" type="email" dir="ltr" placeholder="athlete@example.com" error={errors.email?.message} {...register("email")} />
            <Input label="شماره موبایل" type="tel" dir="ltr" placeholder="09121112233" error={errors.phone?.message} {...register("phone")} />
          </div>
          <Input
            label="رمز عبور اولیه"
            type="password"
            dir="ltr"
            placeholder="حداقل ۸ کاراکتر شامل حرف و عدد"
            error={errors.password?.message}
            {...register("password")}
          />
          {branches.length !== 1 && (
            <div className="space-y-1.5">
              <Label>شعبه</Label>
              <Select value={selectedBranch} onValueChange={(v) => setValue("branch", v)}>
                <SelectTrigger><SelectValue placeholder="انتخاب کنید" /></SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branch && <p className="text-sm text-destructive">{errors.branch.message}</p>}
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => router.push("/coach/athletes")}>انصراف</Button>
            <Button type="submit" loading={isSubmitting}><Save className="ml-2 h-4 w-4" />ثبت شاگرد</Button>
          </div>
        </form>
      </TwilightCard>
    </PageShell>
  );
}
