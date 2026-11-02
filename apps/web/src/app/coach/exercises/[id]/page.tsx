"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Trash2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import {
  useExercise,
  useExercises,
  useUpdateExercise,
  useDeleteExercise,
} from "@/hooks/use-api";
import { Loading, ErrorDisplay } from "@/components/ui/DataState";
import {
  ExerciseForm,
  toExerciseFormValues,
  toExercisePayload,
  type ExerciseFormValues,
} from "../../_components/ExerciseForm";
import { ConfirmDialog } from "../../_components/ConfirmDialog";
import { facetValues } from "../../_meta";
import { mutationErrorMessage } from "../../_errors";

export default function EditExercisePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useExercise(params.id);
  const { data: exercisesResp } = useExercises();
  const updateExercise = useUpdateExercise();
  const deleteExercise = useDeleteExercise();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const suggestions = useMemo(() => {
    const list = exercisesResp?.data ?? [];
    return {
      categories: facetValues(list, "category"),
      muscleGroups: facetValues(list, "muscleGroup"),
      equipment: facetValues(list, "equipment"),
    };
  }, [exercisesResp]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay message={error?.message} onRetry={refetch} />;

  const exercise = data?.data;
  if (!exercise) return null;

  const handleSubmit = async (values: ExerciseFormValues) => {
    try {
      await updateExercise.mutateAsync({
        id: exercise.id,
        data: toExercisePayload(values),
      });
      toast.success("حرکت با موفقیت به‌روزرسانی شد");
      router.push("/coach/exercises");
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در به‌روزرسانی حرکت"));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExercise.mutateAsync(exercise.id);
      toast.success(`حرکت «${exercise.name}» حذف شد`);
      setConfirmDeleteOpen(false);
      router.push("/coach/exercises");
    } catch (err) {
      toast.error(
        mutationErrorMessage(
          err,
          "خطا در حذف حرکت",
          "این حرکت در یک برنامه تمرینی استفاده شده و قابل حذف نیست"
        )
      );
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="ویرایش حرکت"
        subtitle={exercise.name}
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
        key={exercise.updatedAt}
        defaultValues={toExerciseFormValues(exercise)}
        suggestions={suggestions}
        submitLabel="ذخیره تغییرات"
        pending={updateExercise.isPending}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/coach/exercises")}
        footerExtra={
          <Button
            type="button"
            variant="ghost"
            className="text-destructive"
            onClick={() => setConfirmDeleteOpen(true)}
            disabled={updateExercise.isPending || deleteExercise.isPending}
          >
            <Trash2 className="h-4 w-4" />
            حذف حرکت
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="حذف حرکت از کتابخانه"
        description={`آیا از حذف حرکت «${exercise.name}» مطمئن هستید؟ در صورتی که این حرکت در برنامه‌ای استفاده شده باشد حذف نخواهد شد.`}
        confirmLabel="حذف حرکت"
        loading={deleteExercise.isPending}
        onConfirm={handleDelete}
      />
    </PageShell>
  );
}
