"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/twilight/Page";
import { TwilightCard, SearchInput, CtaButton, EmptyState } from "@/components/twilight/controls";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPersianNumber } from "@/lib/utils";
import { toast } from "sonner";
import { Plus, Copy, Clock, Dumbbell, Users, LayoutTemplate } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  useTrainingPrograms,
  useExercises,
  useUsers,
  useCreateTrainingProgram,
  useAddProgramExercise,
} from "@/hooks/use-api";
import type { TrainingProgram } from "@/lib/types";
import {
  CloneProgramSheet,
  type CloneProgramValues,
} from "../_components/CloneProgramSheet";
import { mutationErrorMessage } from "../_errors";

const presetTemplates = [
  { id: "tpl-1", name: "حجم‌سازی ۳ روزه", days: 3, exercisesCount: 6, intensity: "متوسط", usage: 8, category: "حجمی" },
  { id: "tpl-2", name: "قدرتی ۴ روزه", days: 4, exercisesCount: 8, intensity: "بالا", usage: 12, category: "قدرتی" },
  { id: "tpl-3", name: "کاهش وزن ۵ روزه", days: 5, exercisesCount: 10, intensity: "متوسط", usage: 6, category: "هوازی" },
  { id: "tpl-4", name: "فول بادی ۳ روزه", days: 3, exercisesCount: 6, intensity: "بالا", usage: 15, category: "ترکیبی" },
  { id: "tpl-5", name: "فانکشنال ۴ روزه", days: 4, exercisesCount: 8, intensity: "متوسط", usage: 4, category: "فانکشنال" },
  { id: "tpl-6", name: "مبتدی ۳ روزه", days: 3, exercisesCount: 6, intensity: "پایین", usage: 20, category: "مبتدی" },
];

const intensityColor: Record<string, "success" | "warning" | "destructive"> = {
  پایین: "success",
  متوسط: "warning",
  بالا: "destructive",
};

interface TemplateViewItem {
  id: string;
  name: string;
  days: number;
  exercisesCount: number;
  intensity: string;
  usage: number;
  category: string;
  sourceProgram: TrainingProgram;
  programHref?: string;
}

export default function TemplatesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [cloningSource, setCloningSource] = useState<TrainingProgram | null>(null);
  const [cloneProgress, setCloneProgress] = useState<{ done: number; total: number } | null>(null);

  const { data: programsResp } = useTrainingPrograms();
  const { data: exercisesResp } = useExercises();
  const { data: athletesResp, isLoading: athletesLoading } = useUsers("athlete");
  const createProgram = useCreateTrainingProgram();
  const addProgramExercise = useAddProgramExercise();

  const athletes = athletesResp?.data ?? [];

  const allTemplates = useMemo<TemplateViewItem[]>(() => {
    const library = exercisesResp?.data ?? [];
    const realPrograms = programsResp?.data ?? [];

    const fromReal: TemplateViewItem[] = realPrograms.map((prog) => ({
      id: `prog-${prog.id}`,
      name: prog.name,
      days: prog.frequencyPerWeek,
      exercisesCount: prog.exercises.length,
      intensity: prog.frequencyPerWeek >= 4 ? "بالا" : prog.frequencyPerWeek === 3 ? "متوسط" : "پایین",
      usage: 1,
      category: "برنامه مربی",
      sourceProgram: prog,
      programHref: `/coach/programs/${prog.id}`,
    }));

    const fromPresets: TemplateViewItem[] = presetTemplates.map((tpl, idx) => {
      const generatedExercises = Array.from({ length: Math.min(tpl.exercisesCount, Math.max(library.length, 3)) }, (_, i) => {
        const libEx = library[(idx * 2 + i) % Math.max(1, library.length)];
        const dayOfWeek = (i % tpl.days) * Math.max(1, Math.floor(6 / tpl.days));
        return {
          id: `${tpl.id}-ex-${i}`,
          programId: tpl.id,
          exerciseId: libEx?.id ?? "",
          exercise: libEx,
          dayOfWeek: Math.min(6, dayOfWeek),
          order: Math.floor(i / tpl.days),
          sets: tpl.intensity === "بالا" ? 4 : 3,
          reps: tpl.category === "قدرتی" ? "6-8" : "10-12",
          restSeconds: tpl.intensity === "بالا" ? 90 : 60,
          isCompleted: false,
        };
      }).filter((e) => Boolean(e.exerciseId));

      const blueprint: TrainingProgram = {
        id: tpl.id,
        athleteId: "",
        coachId: user?.id ?? "",
        name: tpl.name,
        description: `الگوی آماده ${tpl.category} (${tpl.days} روز در هفته)`,
        startDate: "2026-01-01T00:00:00.000Z",
        endDate: "2026-01-29T00:00:00.000Z",
        frequencyPerWeek: tpl.days,
        status: "draft",
        exercises: generatedExercises,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      };

      return {
        id: tpl.id,
        name: tpl.name,
        days: tpl.days,
        exercisesCount: generatedExercises.length || tpl.exercisesCount,
        intensity: tpl.intensity,
        usage: tpl.usage,
        category: tpl.category,
        sourceProgram: blueprint,
      };
    });

    return [...fromReal, ...fromPresets];
  }, [programsResp, exercisesResp, user?.id]);

  const filtered = allTemplates.filter(
    (t) => t.name.includes(search) || t.category.includes(search)
  );

  const handleCloneSubmit = async (values: CloneProgramValues) => {
    if (!cloningSource) return;
    try {
      const createdRes = await createProgram.mutateAsync({
        athleteId: values.athleteId,
        coachId: user?.id || cloningSource.coachId || "",
        name: values.name,
        description: cloningSource.description,
        startDate: values.startDate,
        endDate: values.endDate,
        frequencyPerWeek: cloningSource.frequencyPerWeek,
        status: "draft",
      });
      const newProgramId = createdRes.data?.id;
      if (!newProgramId) throw new Error("خطا در ساخت برنامه از الگو");

      const exercisesToCopy = cloningSource.exercises.filter((e) => Boolean(e.exerciseId));
      setCloneProgress({ done: 0, total: exercisesToCopy.length });

      for (let i = 0; i < exercisesToCopy.length; i++) {
        const ex = exercisesToCopy[i];
        await addProgramExercise.mutateAsync({
          programId: newProgramId,
          data: {
            exerciseId: ex.exerciseId,
            dayOfWeek: ex.dayOfWeek,
            order: ex.order,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            restSeconds: ex.restSeconds,
            notes: ex.notes,
          },
        });
        setCloneProgress({ done: i + 1, total: exercisesToCopy.length });
      }

      toast.success(`برنامه «${values.name}» از الگو ساخته شد`);
      setCloningSource(null);
      setCloneProgress(null);
      router.push(`/coach/programs/${newProgramId}`);
    } catch (err) {
      setCloneProgress(null);
      toast.error(mutationErrorMessage(err, "خطا در کپی برنامه از الگو"));
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="الگوهای برنامه"
        subtitle="الگوهای آماده قابل استفاده مجدد برای شاگردان"
        action={
          <CtaButton onClick={() => router.push("/coach/programs/new")} className="w-auto px-5">
            <Plus className="ml-2 h-4 w-4" strokeWidth={1.75} />
            الگوی جدید
          </CtaButton>
        }
      />

      <SearchInput value={search} onChange={setSearch} placeholder="جستجوی الگو..." className="max-w-md" />

      {filtered.length === 0 ? (
        <EmptyState
          tone="blush"
          icon={<LayoutTemplate className="h-6 w-6" strokeWidth={1.75} />}
          title="الگویی یافت نشد"
          description="الگویی با عبارت جست‌وجوی شما وجود ندارد"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <TwilightCard key={template.id} hover className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 flex-1 break-words font-serif text-lg font-normal leading-snug text-foreground">
                  {template.name}
                </h3>
                <Badge variant={intensityColor[template.intensity] ?? "warning"} className="shrink-0">
                  {template.intensity}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span className="tabular-nums">{formatPersianNumber(template.days)}</span> روز در هفته
                </span>
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span className="tabular-nums">{formatPersianNumber(template.exercisesCount)}</span> تمرین
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span className="tabular-nums">{formatPersianNumber(template.usage)}</span> بار استفاده
                </span>
              </div>
              <Badge variant="outline">{template.category}</Badge>
              <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full whitespace-normal leading-5 sm:w-auto sm:flex-1"
                  onClick={() => setCloningSource(template.sourceProgram)}
                >
                  <Copy className="h-4 w-4" />
                  استفاده برای شاگرد
                </Button>
                {template.programHref ? (
                  <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
                    <Link href={template.programHref}>مشاهده</Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => setCloningSource(template.sourceProgram)}
                  >
                    مشاهده و کپی
                  </Button>
                )}
              </div>
            </TwilightCard>
          ))}
        </div>
      )}

      {cloningSource && (
        <CloneProgramSheet
          open={Boolean(cloningSource)}
          onOpenChange={(open) => {
            if (!open) {
              setCloningSource(null);
              setCloneProgress(null);
            }
          }}
          source={cloningSource}
          athletes={athletes}
          athletesLoading={athletesLoading}
          pending={createProgram.isPending || addProgramExercise.isPending}
          progress={cloneProgress}
          onSubmit={handleCloneSubmit}
        />
      )}
    </PageShell>
  );
}
