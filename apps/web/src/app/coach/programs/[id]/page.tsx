"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, Plus, CheckCircle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import { StatCard, TwilightCard } from "@/components/twilight/controls";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { formatPersianNumber, formatDate } from "@/lib/utils";
import {
  useTrainingProgram,
  useExercises,
  useUsers,
  useUpdateTrainingProgram,
  useDeleteTrainingProgram,
  useAddProgramExercise,
  useUpdateProgramExercise,
  useDeleteProgramExercise,
} from "@/hooks/use-api";
import { Loading, ErrorDisplay } from "@/components/ui/DataState";
import type { ProgramExercise } from "@/lib/types";
import { WEEK_DAYS } from "../../_meta";
import { mutationErrorMessage } from "../../_errors";
import {
  ProgramDetailsSheet,
  type ProgramDetailsPatch,
} from "../../_components/ProgramDetailsSheet";
import {
  ProgramExerciseSheet,
  type ProgramExerciseDraft,
} from "../../_components/ProgramExerciseSheet";
import { ProgramExerciseRow } from "../../_components/ProgramExerciseRow";
import { ConfirmDialog } from "../../_components/ConfirmDialog";

const statusConfig: Record<
  string,
  { label: string; variant: "secondary" | "success" | "info" | "outline" | "blush" }
> = {
  draft: { label: "پیش‌نویس", variant: "secondary" },
  active: { label: "فعال", variant: "blush" },
  completed: { label: "تکمیل شده", variant: "info" },
  archived: { label: "بایگانی", variant: "outline" },
};

export default function ProgramDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: programResp, isLoading, isError, error, refetch } = useTrainingProgram(params.id);
  const { data: exercisesResp } = useExercises();
  const { data: athletesResp } = useUsers("athlete");

  const updateProgram = useUpdateTrainingProgram();
  const deleteProgram = useDeleteTrainingProgram();
  const addProgramExercise = useAddProgramExercise();
  const updateProgramExercise = useUpdateProgramExercise();
  const deleteProgramExercise = useDeleteProgramExercise();

  const [selectedDay, setActiveDay] = React.useState<number | null>(null);
  const [detailsSheetOpen, setDetailsSheetOpen] = React.useState(false);
  const [exerciseSheetOpen, setExerciseSheetOpen] = React.useState(false);
  const [editingEntry, setEditingEntry] = React.useState<ProgramExercise | null>(null);
  const [deletingEntry, setDeletingEntry] = React.useState<ProgramExercise | null>(null);
  const [confirmDeleteProgram, setConfirmDeleteProgram] = React.useState(false);

  const program = programResp?.data;
  const library = exercisesResp?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay message={error?.message} onRetry={refetch} />;
  if (!program) return null;

  const firstExerciseDay = program.exercises?.length
    ? Math.min(...program.exercises.map((e) => e.dayOfWeek))
    : 0;
  const defaultDay =
    Number.isFinite(firstExerciseDay) && firstExerciseDay >= 0 && firstExerciseDay <= 6
      ? firstExerciseDay
      : 0;
  const activeDay = selectedDay ?? defaultDay;

  const groupedByDay: Record<number, ProgramExercise[]> = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  for (const ex of program.exercises ?? []) {
    const day = ex.dayOfWeek >= 0 && ex.dayOfWeek <= 6 ? ex.dayOfWeek : 0;
    groupedByDay[day].push(ex);
  }
  for (const dayKey of Object.keys(groupedByDay)) {
    groupedByDay[Number(dayKey)].sort((a, b) => a.order - b.order);
  }

  const countsByDay = WEEK_DAYS.map((d) => groupedByDay[d.value]?.length ?? 0);

  const resolvedAthlete =
    program.athlete ??
    (athletesResp?.data ?? []).find((a) => a.id === program.athleteId);
  const athleteName = resolvedAthlete
    ? `${resolvedAthlete.firstName} ${resolvedAthlete.lastName}`.trim() || resolvedAthlete.email
    : program.athleteId || "نامشخص";
  const frequencyLabel = `${formatPersianNumber(program.frequencyPerWeek)} روز در هفته`;

  const isBusy =
    updateProgram.isPending ||
    deleteProgram.isPending ||
    addProgramExercise.isPending ||
    updateProgramExercise.isPending ||
    deleteProgramExercise.isPending;

  const handleSaveDetails = async (patch: ProgramDetailsPatch) => {
    try {
      await updateProgram.mutateAsync({ id: program.id, data: patch });
      toast.success("مشخصات برنامه به‌روزرسانی شد");
      setDetailsSheetOpen(false);
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در ذخیره مشخصات برنامه"));
    }
  };

  const handleStatusChange = async (nextStatus: "active" | "completed") => {
    try {
      await updateProgram.mutateAsync({ id: program.id, data: { status: nextStatus } });
      toast.success(
        nextStatus === "active" ? "برنامه تمرینی فعال شد" : "برنامه تمرینی تکمیل شد"
      );
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در تغییر وضعیت برنامه"));
    }
  };

  const handleDeleteProgram = async () => {
    try {
      await deleteProgram.mutateAsync(program.id);
      toast.success("برنامه تمرینی حذف شد");
      setConfirmDeleteProgram(false);
      router.push("/coach/programs");
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در حذف برنامه"));
    }
  };

  const handleOpenAddExercise = (dayOfWeek: number) => {
    setActiveDay(dayOfWeek);
    setEditingEntry(null);
    setExerciseSheetOpen(true);
  };

  const handleOpenEditExercise = (entry: ProgramExercise) => {
    setEditingEntry(entry);
    setExerciseSheetOpen(true);
  };

  const handleExerciseSubmit = async (draft: ProgramExerciseDraft) => {
    const order = Math.max(0, draft.position - 1);
    try {
      if (editingEntry) {
        await updateProgramExercise.mutateAsync({
          programId: program.id,
          exerciseId: editingEntry.id,
          data: {
            exerciseId: draft.exerciseId,
            dayOfWeek: draft.dayOfWeek,
            order,
            sets: draft.sets,
            reps: draft.reps,
            weight: draft.weight,
            restSeconds: draft.restSeconds,
            notes: draft.notes,
          },
        });
        toast.success("حرکت برنامه ویرایش شد");
      } else {
        await addProgramExercise.mutateAsync({
          programId: program.id,
          data: {
            exerciseId: draft.exerciseId,
            dayOfWeek: draft.dayOfWeek,
            order,
            sets: draft.sets,
            reps: draft.reps,
            weight: draft.weight,
            restSeconds: draft.restSeconds,
            notes: draft.notes,
          },
        });
        toast.success("حرکت جدید به برنامه اضافه شد");
      }
      setActiveDay(draft.dayOfWeek);
      setExerciseSheetOpen(false);
      setEditingEntry(null);
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در ذخیره حرکت برنامه"));
    }
  };

  const handleMoveExercise = async (
    dayOfWeek: number,
    index: number,
    delta: -1 | 1
  ) => {
    const list = groupedByDay[dayOfWeek] ?? [];
    const targetIndex = index + delta;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const current = list[index];
    const neighbor = list[targetIndex];
    try {
      await Promise.all([
        updateProgramExercise.mutateAsync({
          programId: program.id,
          exerciseId: current.id,
          data: { order: targetIndex },
        }),
        updateProgramExercise.mutateAsync({
          programId: program.id,
          exerciseId: neighbor.id,
          data: { order: index },
        }),
      ]);
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در جابه‌جایی حرکت"));
    }
  };

  const handleConfirmDeleteExercise = async () => {
    if (!deletingEntry) return;
    try {
      await deleteProgramExercise.mutateAsync({
        programId: program.id,
        exerciseId: deletingEntry.id,
      });
      toast.success("حرکت از برنامه حذف شد");
      setDeletingEntry(null);
    } catch (err) {
      toast.error(mutationErrorMessage(err, "خطا در حذف حرکت از برنامه"));
    }
  };

  const editingPosition = editingEntry
    ? (groupedByDay[editingEntry.dayOfWeek]?.findIndex((e) => e.id === editingEntry.id) ?? 0) + 1
    : (countsByDay[activeDay] ?? 0) + 1;

  return (
    <PageShell>
      <PageHeader
        title={program.name}
        subtitle={athleteName}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDetailsSheetOpen(true)}
              disabled={isBusy}
            >
              <Pencil className="h-4 w-4" />
              ویرایش مشخصات
            </Button>
            {program.status === "draft" && (
              <Button
                variant="success"
                size="sm"
                onClick={() => handleStatusChange("active")}
                loading={updateProgram.isPending}
              >
                <CheckCircle className="h-4 w-4" />
                فعال‌سازی
              </Button>
            )}
            {program.status === "active" && (
              <Button
                variant="default"
                size="sm"
                onClick={() => handleStatusChange("completed")}
                loading={updateProgram.isPending}
              >
                <CheckCircle className="h-4 w-4" />
                تکمیل دوره
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => setConfirmDeleteProgram(true)}
              disabled={isBusy}
            >
              <Trash2 className="h-4 w-4" />
              حذف
            </Button>
          </div>
        }
      />

      <div className="flex items-center gap-3">
        <Badge variant={statusConfig[program.status]?.variant || "outline"}>
          {statusConfig[program.status]?.label || program.status}
        </Badge>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/coach/programs">
            <ChevronRight className="h-4 w-4" />
            بازگشت به برنامه‌ها
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="ورزشکار" value={<span className="text-lg">{athleteName}</span>} />
        <StatCard label="تاریخ شروع" value={<span className="text-lg">{formatDate(program.startDate)}</span>} />
        <StatCard label="تاریخ پایان" value={<span className="text-lg">{formatDate(program.endDate)}</span>} />
        <StatCard label="تعداد جلسات" value={<span className="text-lg">{frequencyLabel}</span>} />
      </div>

      <Tabs value={String(activeDay)} onValueChange={(v) => setActiveDay(Number(v))} dir="rtl">
        <TabsList className="w-full justify-start overflow-x-auto rounded-xl border border-border bg-card p-1">
          {WEEK_DAYS.map((day) => {
            const count = countsByDay[day.value] ?? 0;
            return (
              <TabsTrigger
                key={day.value}
                value={String(day.value)}
                className="gap-1.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              >
                <span>{day.label}</span>
                {count > 0 && (
                  <span className="rounded-md bg-secondary/40 px-1.5 py-0.5 text-[11px] tabular-nums">
                    {formatPersianNumber(count)}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {WEEK_DAYS.map((day) => {
          const dayExercises = groupedByDay[day.value] ?? [];
          return (
            <TabsContent key={day.value} value={String(day.value)} className="mt-4 space-y-4">
              <TwilightCard className="!p-4">
                <div className="flex items-center justify-between pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-normal text-foreground">{day.label}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatPersianNumber(dayExercises.length)} حرکت ثبت‌شده
                    </p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleOpenAddExercise(day.value)}
                    disabled={isBusy}
                  >
                    <Plus className="h-4 w-4" />
                    افزودن تمرین
                  </Button>
                </div>

                {dayExercises.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                    هیچ تمرینی برای {day.label} ثبت نشده است. با دکمه «افزودن تمرین» حرکت جدید اضافه کنید.
                  </p>
                ) : (
                  <ul className="space-y-2.5 pt-2">
                    {dayExercises.map((entry, idx) => (
                      <ProgramExerciseRow
                        key={entry.id}
                        entry={entry}
                        position={idx + 1}
                        isFirst={idx === 0}
                        isLast={idx === dayExercises.length - 1}
                        busy={isBusy}
                        onMove={(delta) => handleMoveExercise(day.value, idx, delta)}
                        onEdit={() => handleOpenEditExercise(entry)}
                        onDelete={() => setDeletingEntry(entry)}
                      />
                    ))}
                  </ul>
                )}
              </TwilightCard>
            </TabsContent>
          );
        })}
      </Tabs>

      <ProgramDetailsSheet
        open={detailsSheetOpen}
        onOpenChange={setDetailsSheetOpen}
        program={program}
        pending={updateProgram.isPending}
        onSubmit={handleSaveDetails}
      />

      <ProgramExerciseSheet
        open={exerciseSheetOpen}
        onOpenChange={(open) => {
          setExerciseSheetOpen(open);
          if (!open) setEditingEntry(null);
        }}
        entry={editingEntry}
        dayOfWeek={editingEntry?.dayOfWeek ?? activeDay}
        position={editingPosition}
        countsByDay={countsByDay}
        library={library}
        pending={addProgramExercise.isPending || updateProgramExercise.isPending}
        onSubmit={handleExerciseSubmit}
      />

      <ConfirmDialog
        open={deletingEntry !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingEntry(null);
        }}
        title="حذف حرکت از برنامه"
        description={
          deletingEntry
            ? `آیا از حذف حرکت «${deletingEntry.exercise?.name ?? "انتخاب‌شده"}» از این برنامه مطمئن هستید؟`
            : ""
        }
        confirmLabel="حذف حرکت"
        loading={deleteProgramExercise.isPending}
        onConfirm={handleConfirmDeleteExercise}
      />

      <ConfirmDialog
        open={confirmDeleteProgram}
        onOpenChange={setConfirmDeleteProgram}
        title="حذف برنامه تمرینی"
        description={`آیا از حذف کامل برنامه «${program.name}» و تمام حرکات آن مطمئن هستید؟`}
        confirmLabel="حذف برنامه"
        loading={deleteProgram.isPending}
        onConfirm={handleDeleteProgram}
      />
    </PageShell>
  );
}
