"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import { useCreateExercise, useExercises } from "@/hooks/use-api";
import {
  ExerciseForm,
  emptyExerciseValues,
  toExercisePayload,
  type ExerciseFormValues,
} from "../../_components/ExerciseForm";
import { facetValues } from "../../_meta";
import { mutationErrorMessage } from "../../_errors";

export default function NewExercisePage() {
  const router = useRouter();
  const { data: exercisesResp } = useExercises();
  const createExercise = useCreateExercise();

  const suggestions = useMemo(() => {
    const list = exercisesResp?.data ?? [];
    return {
      categories: facetValues(list, "category"),
      muscleGroups: facetValues(list, "muscleGroup"),
      equipment: facetValues(list, "equipment"),
    };
  }, [exercisesResp]);

  const handleSubmit = async (values: ExerciseFormValues) => {
    try {
      await createExercise.mutateAsync(toExercisePayload(values));
      toast.success("حرکت جدید با موفقیت در کتابخانه ثبت شد");
      router.push("/coach/exercises");
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در ثبت حرکت جدید"));
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="افزودن حرکت جدید"
        subtitle="ثبت حرکت ورزشی جدید در کتابخانه"
        action={
          <Button variant="ghost" size="sm" asChild>
            <Link href="/coach/exercises">
              <ChevronRight className="h-4 w-4" />
              بازگشت
            </Link>
          </Button>
        }
      />

      <ExerciseForm
        defaultValues={emptyExerciseValues}
        suggestions={suggestions}
        submitLabel="ذخیره حرکت"
        pending={createExercise.isPending}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/coach/exercises")}
      />
    </PageShell>
  );
}
