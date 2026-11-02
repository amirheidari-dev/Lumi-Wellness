"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { CtaButton } from "@/components/twilight/CtaButton";
import { GymBackdrop } from "@/components/twilight/GymBackdrop";
import { MicroLabel } from "@/components/twilight/Type";
import { LumiLogo } from "@/components/ui/LumiLogo";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Activity,
  Users,
  Clock,
  ShieldCheck,
  Award,
  Star,
  MapPin,
  Phone,
  Dumbbell,
} from "lucide-react";
import { Reveal } from "@/components/animations/ScrollReveal";

/* -------------------------------------------------------------------------- */
/*                                 NAVIGATION                                 */
/* -------------------------------------------------------------------------- */

function LandingNavigation({
  onLogin,
  onRegister,
}: {
  onLogin: () => void;
  onRegister: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "فلسفه تمرین", href: "#philosophy" },
    { label: "رشته‌ها و متد", href: "#classes" },
    { label: "برنامه هفتگی", href: "#schedule" },
    { label: "مربیان ارشد", href: "#coaches" },
    { label: "اشتراک‌ها", href: "#memberships" },
    { label: "پرسش‌های متداول", href: "#faq" },
  ];

  return (
    <header className="sticky inset-x-0 top-0 z-40 px-4 py-3 sm:py-4">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-border/80 bg-background/85 px-4 py-3 shadow-lg shadow-scrim/5 backdrop-blur-xl sm:px-6"
        aria-label="ناوبری اصلی استودیو لومی"
      >
        <Link href="#top" className="flex items-center gap-2" aria-label="صفحه اصلی لومی ولنس">
          <LumiLogo size="sm" variant="auto" showSubtitle={true} />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 text-xs font-medium text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onLogin}
            className="hidden cursor-pointer rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-secondary sm:inline-flex"
          >
            ورود به پنل
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-l from-primary via-[#967347] to-blush px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
          >
            <span>شروع عضویت</span>
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground lg:hidden"
            aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-4 text-right">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-border/50 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegister();
                }}
                className="w-full rounded-xl bg-primary py-3 text-center text-xs font-bold text-primary-foreground shadow-md"
              >
                ثبت‌نام و عضویت باشگاه
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogin();
                }}
                className="w-full rounded-xl border border-border bg-secondary/50 py-3 text-center text-xs font-bold text-foreground"
              >
                ورود اعضا و مربیان
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SECTION                                */
/* -------------------------------------------------------------------------- */

function HeroSection({
  onLogin,
  onRegister,
}: {
  onLogin: () => void;
  onRegister: () => void;
}) {
  return (
    <section id="top" className="relative flex min-h-[92svh] items-center overflow-hidden px-4 py-14 lg:py-20">
      {/* Ambient background atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <GymBackdrop className="absolute inset-0 opacity-30 transition-opacity dark:opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background dark:from-background/80 dark:via-background/50 dark:to-background" />
        <div className="absolute top-1/4 -right-24 h-96 w-96 rounded-full bg-blush-fixed/15 blur-[130px] dark:bg-blush-solid/10" />
        <div className="absolute -bottom-16 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
        <div className="text-right">
          {/* Quiet editorial kicker */}
          <div className="mb-5 flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-blush animate-pulse" aria-hidden="true" />
            <span>استودیو تخصصی تندرستی و پیلاتس بانوان</span>
            <span aria-hidden="true">·</span>
            <span>محیط اختصاصی و امن</span>
          </div>

          <h1 className="mb-6 font-serif text-[2.4rem] font-normal leading-[1.3] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block font-light">طراحی هماهنگ بدن،</span>
            <span className="block bg-gradient-to-l from-blush via-blush-solid to-primary bg-clip-text font-medium text-transparent">
              آرامش و قدرت پیوسته
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-lg">
            پلتفرم و استودیو اختصاصی ویژه بانوان؛ ترکیب متد علمی ریفرمر پیلاتس با تمرینات قدرتی عملکردی، مربیان ارشد همراه و ثبت و پایش هوشمند تندرستی شما در هر جلسه.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center sm:justify-start">
            {/* Primary Action */}
            <button
              type="button"
              onClick={onRegister}
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-l from-primary via-[#967347] to-blush px-7 py-3.5 font-sans text-sm font-semibold tracking-normal text-white shadow-lg shadow-primary/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer w-full sm:w-auto"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
              />
              <span className="relative z-10 flex items-center gap-2">
                <span>ثبت‌نام و عضویت باشگاه</span>
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
            </button>

            {/* Secondary Action */}
            <button
              type="button"
              onClick={onLogin}
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card/80 px-6 py-3.5 font-sans text-sm font-medium tracking-normal text-foreground backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/70 hover:text-foreground hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <span>ورود اعضا و مربیان</span>
              </span>
            </button>
          </div>

          {/* Social proof indicators */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border/70 pt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 space-x-reverse">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-blush/20 text-[10px] font-bold text-blush">
                  م‌ا
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-primary/20 text-[10px] font-bold text-primary">
                  س‌ر
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-bold text-foreground">
                  ن‌ک
                </span>
              </div>
              <span className="font-medium text-foreground">+۴۵۰ ورزشکار فعال</span>
            </div>
            <div className="h-3.5 w-px bg-border" />
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" strokeWidth={1.5} />
              <span className="font-semibold text-foreground">۴.۹</span>
              <span>رضایت اعضا</span>
            </div>
            <div className="h-3.5 w-px bg-border" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.75} />
              <span>مربیان دارای گواهینامه بین‌المللی STOTT</span>
            </div>
          </div>
        </div>

        {/* Hero showcase card */}
        <div className="relative mx-auto w-full max-w-[28rem] lg:max-w-[30rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-blush/20 via-primary/10 to-transparent blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[28px] border border-border/80 bg-card/85 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-5">
              <div className="text-right">
                <span className="text-[11px] font-semibold tracking-wider text-primary">
                  امروز · برنامه اختصاصی شما
                </span>
                <h3 className="mt-1 font-serif text-xl font-normal text-foreground">
                  پیلاتس ریفرمر و میان‌تنه
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  همراه با مربی مهسا احمدی · استودیو VIP ۱
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blush/30 bg-blush/10 text-blush">
                <Activity className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </div>

            {/* Daily progress summary */}
            <div className="my-5 rounded-2xl border border-border/60 bg-secondary/40 p-4 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">میزان پیشرفت هفتگی</span>
                <span className="font-serif text-lg font-semibold text-blush" dir="ltr">
                  78%
                </span>
              </div>
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-blush-solid to-blush transition-all duration-500"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "کالری فعال", value: "۳۸۰", unit: "کالری", color: "bg-blush" },
                { label: "مدت تمرین", value: "۴۵", unit: "دقیقه", color: "bg-primary" },
                { label: "تداوم زنجیره", value: "۵", unit: "روز", color: "bg-emerald-500" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/60 bg-card/60 p-3 text-right backdrop-blur-sm transition-transform hover:-translate-y-0.5"
                >
                  <span className={`mb-2 block h-1.5 w-5 rounded-full ${item.color}`} />
                  <p className="text-[11px] text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-serif text-sm font-semibold text-foreground">
                    {item.value} <span className="text-[10px] font-normal text-muted-foreground">{item.unit}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Coach quote badge */}
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-3.5 text-right">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                م
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                «تمرکز امروز بر تنفس عمیق دیافراگمی و کنترل ستون فقرات روی دستگاه ریفرمر است.»
              </p>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-xl backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={2} />
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">پایش هوشمند</p>
              <p className="text-xs font-bold text-foreground">ثبت خودکار حضور و پیشرفت</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         PHILOSOPHY & 4-STEP METHOD                         */
/* -------------------------------------------------------------------------- */

function PhilosophySection() {
  const steps = [
    {
      num: "01",
      title: "ارزیابی بیومکانیک و ترکیبات بدنی",
      desc: "پیش از هر چیز، وضعیت پوسچر، گودی کمر، دامنه‌ی حرکتی مفاصل و آنالیز بافت چربی و عضله (InBody) به دقت ثبت و تحلیل می‌شود.",
      tag: "آنالیز تخصصی اولیه",
    },
    {
      num: "02",
      title: "طراحی برنامه اختصاصی و غیرتکراری",
      desc: "برنامه‌ای علمی متناسب با توانایی و هدف واقعی شما؛ ترکیب ریفرمر پیلاتس، تقویت میان‌تنه و تمرینات اصلاحی بدون فرسودگی عضلانی.",
      tag: "شخصی‌سازی شده",
    },
    {
      num: "03",
      title: "مربیگری حضوری و اصلاح لحظه‌ای فرم",
      desc: "در کلاس‌های خصوصی و نیمه‌خصوصی (حداکثر ۴ نفر)، مربی در تک‌تک تکرارها کنار شماست تا از هرگونه آسیب مفصلی جلوگیری شود.",
      tag: "توجه صددرصدی",
    },
    {
      num: "04",
      title: "پایش مداوم در اپلیکیشن اختصاصی",
      desc: "مشاهده برنامه روزانه، ثبت حضور، گفت‌وگوی مستقیم با مربی و مشاهده نمودار تغییرات آمادگی جسمانی در پنل هوشمند لومی.",
      tag: "پایش پیشرفت",
    },
  ];

  return (
    <section id="philosophy" className="relative border-t border-border/70 px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" className="mb-14 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">متد انحصاری لومی</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            چهار گام علمی تا تندرستی پایدار
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            ما در لومی ورزش را از یک وظیفه خسته‌کننده به یک آیین آرامش‌بخش روزانه تبدیل می‌کنیم.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div>
                  <span className="font-serif text-3xl font-light text-primary/40 transition-colors group-hover:text-primary">
                    {step.num}
                  </span>
                  <p className="mt-4 text-xs font-medium text-blush">{step.tag}</p>
                  <h3 className="mt-1 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2.5 text-xs leading-6 text-muted-foreground">{step.desc}</p>
                </div>
                <div className="mt-6 h-0.5 w-8 rounded-full bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                        STUDIO CLASSES & DISCIPLINES                        */
/* -------------------------------------------------------------------------- */

function StudioClassesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const classes = [
    {
      id: "reformer",
      title: "ریفرمر پیلاتس (Reformer Pilates)",
      category: "تخصصی و اصلاحی",
      desc: "تمرین بر روی دستگاه پیشرفته ریفرمر با فنرهای مقاومتی قابل تنظیم؛ ایجاد کشیدگی عمیق، تقویت عضلات عمقی شکم و لگن، و اصلاح انحرافات ستون فقرات بدون فشار به مفاصل.",
      duration: "۵۰ دقیقه",
      intensity: "متوسط تا بالا",
      capacity: "حداکثر ۴ نفر در استودیو",
      focus: ["تقویت میان‌تنه", "انعطاف‌پذیری ستون فقرات", "فرم‌دهی پاها"],
      equipment: "دستگاه ریفرمر Allegro، جامپ‌بورد، استرپ‌های چرمی",
    },
    {
      id: "barre",
      title: "باروسل و بار فیتنس (Barre & Tone)",
      category: "قدرت و ریتمیک",
      desc: "الهام‌گرفته از اصول باله کلاسیک و پیلاتس؛ تمرینات ایزومتریک با تکرار بالا که فرمی کشیده، شانه‌های متقارن و پایین‌تنه‌ای قوی و خوش‌تراش پدید می‌آورد.",
      duration: "۴۵ دقیقه",
      intensity: "بالا (چربی‌سوز)",
      capacity: "حداکثر ۸ نفر",
      focus: ["فرم‌دهی باسن و ران", "اصلاح وضعیت شانه و گردن", "استقامت عضلانی"],
      equipment: "میله بار دیواری، توپ پیلاتس، دمبل‌های سبک",
    },
    {
      id: "functional",
      title: "قدرت عملکردی بانوان (Functional Strength)",
      category: "قدرتی و متابولیک",
      desc: "تمرینات متناسب با فیزیولوژی بدن بانوان برای افزایش تراکم استخوان، تسریع متابولیسم و افزایش توان روزمره با حرکات طبیعی بدن مانند اسکات، ددلیفت سبک و کشش‌های تعادلی.",
      duration: "۵۰ دقیقه",
      intensity: "بالا",
      capacity: "حداکثر ۶ نفر",
      focus: ["تراکم استخوان", "تقویت زنجیره خلفی", "بالا بردن انرژی روزانه"],
      equipment: "کتل‌بل‌های ارگونومیک، تراباند، بندهای معلق TRX",
    },
    {
      id: "mobility",
      title: "موبیلیتی و رهاسازی عضلانی (Mobility & Flow)",
      category: "ریکاوری و آرامش",
      desc: "کلاس ترمیمی ویژه رفع گرفتگی‌های عضلانی ناشی از پشت میز نشستن و استرس؛ تمرکز بر تنفس دیافراگمی، رولینگ فوم و باز کردن مفاصل لگن و قفسه سینه.",
      duration: "۴۰ دقیقه",
      intensity: "آرام و آرامش‌بخش",
      capacity: "حداکثر ۸ نفر",
      focus: ["کاهش دردهای مزمن کمر", "آرامش سیستم عصبی", "بهبود کیفیت خواب"],
      equipment: "فوم رولر تخصصی، مت ضخیم، کش‌های موبیلیتی",
    },
  ];

  const currentClass = classes[activeTab];

  return (
    <section id="classes" className="relative border-t border-border/70 px-4 py-20 lg:py-28 bg-card/30">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" className="mb-12 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">رشته‌ها و امکانات استودیو</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            تمرین‌هایی متناسب با ریتم بدنی شما
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            هر کلاس با رویکردی مهندسی‌شده و متمرکز بر سلامت مفاصل، کشش اصولی و تقویت قدرت بدنی هدایت می‌شود.
          </p>
        </Reveal>

        {/* Segmented Class Selector */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-sm">
          {classes.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                activeTab === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {c.title.split("(")[0].trim()}
            </button>
          ))}
        </div>

        {/* Active Class Highlight Panel */}
        <Reveal key={currentClass.id} direction="up" duration={0.4}>
          <div className="overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-xl sm:p-10 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
            <div className="text-right">
              <span className="text-xs font-semibold text-blush">{currentClass.category}</span>
              <h3 className="mt-2 font-serif text-2xl font-normal text-foreground sm:text-3xl">
                {currentClass.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{currentClass.desc}</p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border/70 py-6 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] text-muted-foreground">مدت جلسه</p>
                  <p className="mt-1 font-semibold text-foreground">{currentClass.duration}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">شدت تمرین</p>
                  <p className="mt-1 font-semibold text-foreground">{currentClass.intensity}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-muted-foreground">ظرفیت کلاس</p>
                  <p className="mt-1 font-semibold text-foreground">{currentClass.capacity}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold text-foreground">تجهیزات و ابزار مورد استفاده:</p>
                <p className="mt-1 text-xs text-muted-foreground">{currentClass.equipment}</p>
              </div>
            </div>

            {/* Focus bullet card */}
            <div className="mt-8 flex flex-col justify-between rounded-2xl border border-border/70 bg-secondary/30 p-6 lg:mt-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">اهداف کلیدی این رشته</p>
                <div className="mt-4 space-y-3">
                  {currentClass.focus.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-right">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <span className="text-xs font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-border bg-card p-4 text-right">
                <p className="text-[11px] font-medium text-muted-foreground">نیاز به مشاوره تعیین سطح داری؟</p>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  پیش از ثبت‌نام، با مربی ارشد استودیو گفت‌وگو کن.
                </p>
                <Link
                  href="/auth/register"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>رزرو وقت معارفه و مشاوره</span>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         WEEKLY SCHEDULE COMPONENT                          */
/* -------------------------------------------------------------------------- */

function WeeklyScheduleSection() {
  const [selectedDay, setSelectedDay] = useState("شنبه");

  const scheduleData: Record<
    string,
    Array<{
      time: string;
      title: string;
      coach: string;
      studio: string;
      level: string;
      spots: string;
    }>
  > = {
    شنبه: [
      {
        time: "۰۹:۰۰ - ۰۹:۵۰",
        title: "پیلاتس ریفرمر سطح ۱ و اصلاحی",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        level: "مقدماتی تا متوسط",
        spots: "۱ جای خالی",
      },
      {
        time: "۱۱:۰۰ - ۱۱:۴۵",
        title: "باروسل و فرم‌دهی کششی",
        coach: "سارا رضایی",
        studio: "استودیو آینه و بار",
        level: "عمومی بانوان",
        spots: "۳ جای خالی",
      },
      {
        time: "۱۶:۳۰ - ۱۷:۲۰",
        title: "فانکشنال استرنگث و میان‌تنه",
        coach: "نیلوفر کاظمی",
        studio: "استودیو ۲",
        level: "پیشرفته",
        spots: "تکمیل ظرفیت",
      },
      {
        time: "۱۸:۰۰ - ۱۸:۵۰",
        title: "ریفرمر اختصاصی تقویت ستون فقرات",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        level: "همه سطوح",
        spots: "۲ جای خالی",
      },
    ],
    یکشنبه: [
      {
        time: "۰۹:۳۰ - ۱۰:۲۰",
        title: "موبیلیتی، تنفس و رفع انقباض عضلانی",
        coach: "سارا رضایی",
        studio: "استودیو آرامش",
        level: "عمومی",
        spots: "۴ جای خالی",
      },
      {
        time: "۱۶:۰۰ - ۱۶:۵۰",
        title: "پیلاتس ریفرمر سطح ۲",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        level: "متوسط به بالا",
        spots: "۲ جای خالی",
      },
      {
        time: "۱۷:۳۰ - ۱۸:۱۵",
        title: "بار فیتنس و چربی‌سوزی ریتمیک",
        coach: "نیلوفر کاظمی",
        studio: "استودیو آینه",
        level: "متوسط",
        spots: "۳ جای خالی",
      },
    ],
    دوشنبه: [
      {
        time: "۰۹:۰۰ - ۰۹:۵۰",
        title: "پیلاتس ریفرمر قدرت و تعادل",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        level: "متوسط",
        spots: "۲ جای خالی",
      },
      {
        time: "۱۱:۰۰ - ۱۱:۵۰",
        title: "قدرت عملکردی و تراباند",
        coach: "نیلوفر کاظمی",
        studio: "استودیو ۲",
        level: "عمومی",
        spots: "۱ جای خالی",
      },
      {
        time: "۱۷:۰۰ - ۱۷:۵۰",
        title: "ریفرمر تخصصی لگن و میان‌تنه",
        coach: "سارا رضایی",
        studio: "استودیو ریفرمر ۱",
        level: "همه سطوح",
        spots: "تکمیل ظرفیت",
      },
    ],
    سه‌شنبه: [
      {
        time: "۱۰:۰۰ - ۱۰:۵۰",
        title: "باروسل و تقویت بالاتنه و بازو",
        coach: "سارا رضایی",
        studio: "استودیو آینه",
        level: "عمومی",
        spots: "۳ جای خالی",
      },
      {
        time: "۱۶:۳۰ - ۱۷:۲۰",
        title: "پیلاتس ریفرمر پیشرفته",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        level: "پیشرفته",
        spots: "۲ جای خالی",
      },
      {
        time: "۱۸:۰۰ - ۱۸:۴۵",
        title: "کشش عمیق و ریکاوری فوم رولر",
        coach: "نیلوفر کاظمی",
        studio: "استودیو آرامش",
        level: "عمومی",
        spots: "۵ جای خالی",
      },
    ],
    چهارشنبه: [
      {
        time: "۰۹:۰۰ - ۰۹:۵۰",
        title: "پیلاتس ریفرمر ترکیبی فول‌بادی",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        level: "متوسط",
        spots: "۱ جای خالی",
      },
      {
        time: "۱۱:۰۰ - ۱۱:۵۰",
        title: "فانکشنال و استقامت عضلانی",
        coach: "نیلوفر کاظمی",
        studio: "استودیو ۲",
        level: "عمومی",
        spots: "۲ جای خالی",
      },
      {
        time: "۱۷:۰۰ - ۱۷:۵۰",
        title: "باروسل و انقباضات ایزومتریک",
        coach: "سارا رضایی",
        studio: "استودیو آینه",
        level: "همه سطوح",
        spots: "۳ جای خالی",
      },
    ],
    پنج‌شنبه: [
      {
        time: "۱۰:۰۰ - ۱۰:۵۰",
        title: "پیلاتس ریفرمر آخر هفته و رهاسازی تنش",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        level: "عمومی بانوان",
        spots: "تکمیل ظرفیت",
      },
      {
        time: "۱۱:۳۰ - ۱۲:۲۰",
        title: "موبیلیتی مفاصل و کشش کامل",
        coach: "سارا رضایی",
        studio: "استودیو آرامش",
        level: "همه سطوح",
        spots: "۳ جای خالی",
      },
    ],
  };

  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"];
  const currentSlots = scheduleData[selectedDay] || [];

  return (
    <section id="schedule" className="relative border-t border-border/70 px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" className="mb-12 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">برنامه هفتگی کلاس‌ها</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            نظم هفتگی متناسب با ساعات زندگی شما
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            سانس‌ها در گروه‌های کوچک و با رزرو قبلی برگزار می‌شوند تا کیفیت نظارت مربی حفظ شود.
          </p>
        </Reveal>

        {/* Days Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                selectedDay === day
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          {currentSlots.map((slot, i) => (
            <Reveal key={slot.time + slot.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 text-right transition-all duration-200 hover:border-primary/40 hover:shadow-md">
                <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-3.5">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{slot.title}</h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>مربی: {slot.coach}</span>
                      <span aria-hidden="true">·</span>
                      <span>{slot.studio}</span>
                    </div>
                  </div>
                  <span
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${
                      slot.spots.includes("تکمیل")
                        ? "bg-destructive/10 text-destructive"
                        : "bg-blush/10 text-blush"
                    }`}
                  >
                    {slot.spots}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span dir="ltr">{slot.time}</span>
                  </div>
                  <span className="text-muted-foreground">سطح: {slot.level}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               COACHES SECTION                              */
/* -------------------------------------------------------------------------- */

function CoachesSection() {
  const coaches = [
    {
      name: "مهسا احمدی",
      title: "مربی ارشد پیلاتس ریفرمر و بیومکانیک",
      experience: "۸ سال سابقه مربیگری",
      badge: "گواهینامه بین‌المللی STOTT Pilates",
      rating: "۴.۹۵",
      athletes: "+۱۴۰ شاگرد",
      bio: "کارشناس ارشد فیزیولوژی ورزشی از دانشگاه تهران، متخصص حرکات اصلاحی و توانبخشی دیسک کمر با دستگاه ریفرمر.",
      initials: "م‌ا",
    },
    {
      name: "سارا رضایی",
      title: "مربی تخصصی باروسل و وضعیت بدنی",
      experience: "۶ سال سابقه حرفه‌ای",
      badge: "گواهی رسمی فدراسیون و متد بار فرانسه",
      rating: "۴.۹۰",
      athletes: "+۱۱۰ شاگرد",
      bio: "مربی باله فیتنس و باروسل، متخصص در تقویت عضلات شانه، مفاصل لگن و ایجاد تقارن اندام ویژه بانوان.",
      initials: "س‌ر",
    },
    {
      name: "نیلوفر کاظمی",
      title: "مربی بدنسازی عملکردی و تغذیه ورزشی",
      experience: "۷ سال سابقه تدریس",
      badge: "مربی رسمی فدراسیون پرورش اندام",
      rating: "۴.۸۸",
      athletes: "+۹۵ شاگرد",
      bio: "کارشناس ارشد تغذیه ورزشی، طراح برنامه‌های تغییر ترکیب بدنی، افزایش متابولیسم و تراکم استخوان بانوان.",
      initials: "ن‌ک",
    },
  ];

  return (
    <section id="coaches" className="relative border-t border-border/70 px-4 py-20 lg:py-28 bg-card/20">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" className="mb-14 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">تیم مربیان ارشد لومی</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            همراهان متعهد در مسیر تندرستی شما
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            مربیان لومی فقط برنامه نمی‌دهند؛ آن‌ها فرم حرکات را کنترل کرده و متناسب با انرژی هر روز شما جلسه را پیش می‌برند.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {coaches.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl text-right">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-secondary font-serif text-sm font-semibold text-primary">
                      {c.initials}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">{c.name}</h3>
                      <p className="text-xs font-medium text-blush">{c.title}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-muted-foreground">{c.bio}</p>

                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/40 p-2.5 text-[11px] text-muted-foreground">
                    <Award className="h-4 w-4 shrink-0 text-primary" />
                    <span>{c.badge}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="font-semibold text-foreground">{c.rating}</span>
                    <span>رضایت</span>
                  </div>
                  <span>{c.athletes}</span>
                  <span>{c.experience}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           TRANSPARENT MEMBERSHIPS                          */
/* -------------------------------------------------------------------------- */

function MembershipsSection({ onRegister }: { onRegister: () => void }) {
  const tiers = [
    {
      name: "اشتراک استودیو پایه",
      subtitle: "کلاس‌های گروهی فانکشنال و باروسل",
      price: "۱,۸۵۰,۰۰۰",
      period: "ماهانه",
      popular: false,
      features: [
        "۱۲ جلسه کلاس گروهی در ماه",
        "دسترسی به استودیوهای فانکشنال و باروسل",
        "کمد اختصاصی و حوله استودیو",
        "پایش حضور در وب‌اپلیکیشن لومی",
        "امکان ۱ بار انجماد اشتراک (تا ۷ روز)",
      ],
      cta: "انتخاب این پکیج",
    },
    {
      name: "عضویت ویژه ریفرمر و پیلاتس",
      subtitle: "نیمه‌خصوصی با تمرکز بر اصلاح فرم",
      price: "۳,۴۰۰,۰۰۰",
      period: "ماهانه",
      popular: true,
      features: [
        "۱۲ جلسه نیمه‌خصوصی ریفرمر (حداکثر ۴ نفر)",
        "برنامه تمرینی شخصی‌سازی شده ماهانه",
        "آنالیز ترکیبات بدنی ماهانه (InBody)",
        "دسترسی کامل به وب‌اپلیکیشن و چت با مربی",
        "امکان ۲ بار انجماد اشتراک (تا ۱۴ روز)",
        "نوشیدنی دتاکس و بار سلامت رایگان",
      ],
      cta: "رزرو عضویت پیشنهادی",
    },
    {
      name: "عضویت طلایی خصوصی (VIP)",
      subtitle: "مربیگری اختصاصی ۱-به-۱",
      price: "۵,۹۰۰,۰۰۰",
      period: "ماهانه",
      popular: false,
      features: [
        "۱۲ جلسه کاملاً خصوصی ۱-به-۱ با مربی ارشد",
        "طراحی رژیم و برنامه تغذیه ورزشی اختصاصی",
        "ساعت‌های انعطاف‌پذیر با اولویت رزرو اختصاصی",
        "کمد دائم و رختکن اختصاصی VIP",
        "امکان انجماد نامحدود اشتراک با هماهنگی",
        "پشتیبانی آنلاین پیوسته و آنالیز هفتگی پیشرفت",
      ],
      cta: "درخواست مشاوره VIP",
    },
  ];

  return (
    <section id="memberships" className="relative border-t border-border/70 px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" className="mb-14 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">تعرفه و بسته‌های عضویت</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            سرمایه‌گذاری روی تندرستی و انرژی روزمره
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            شفافیت در هزینه‌ها، بدون هزینه‌های پنهان؛ با امکان انتقال یا انجماد قانونی جلسات در صورت سفر یا مشغله.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col justify-between rounded-3xl border p-7 text-right transition-all duration-300 ${
                  tier.popular
                    ? "border-primary bg-card shadow-2xl shadow-primary/10 ring-1 ring-primary/40"
                    : "border-border/80 bg-card shadow-sm hover:border-primary/40"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-l from-primary to-blush px-3.5 py-1 text-[11px] font-bold text-white shadow-md">
                    پیشنهاد ویژه اعضا
                  </span>
                )}

                <div>
                  <h3 className="font-serif text-xl font-normal text-foreground">{tier.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{tier.subtitle}</p>

                  <div className="my-6 border-y border-border/60 py-5">
                    <span className="font-serif text-3xl font-bold text-foreground">{tier.price}</span>
                    <span className="mr-2 text-xs text-muted-foreground">تومان / {tier.period}</span>
                  </div>

                  <ul className="space-y-3 text-xs leading-5 text-muted-foreground">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={onRegister}
                    className={`w-full cursor-pointer rounded-2xl py-3.5 text-xs font-bold transition-all duration-300 ${
                      tier.popular
                        ? "bg-gradient-to-l from-primary via-[#967347] to-blush text-white shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98]"
                        : "border border-border bg-secondary/50 text-foreground hover:bg-secondary active:scale-[0.98]"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         AMENITIES & STUDIO DETAILS                         */
/* -------------------------------------------------------------------------- */

function AmenitiesSection() {
  const amenities = [
    {
      title: "دستگاه‌های مدرن ریفرمر Allegro",
      desc: "تجهیزات ارگونومیک با فنرهای کالیبره‌شده جهت تمرین ایمن و کشش بهینه مفاصل.",
      icon: Dumbbell,
    },
    {
      title: "رختکن لوکس و لاکرهای هوشمند",
      desc: "فضای رختکن با سیستم قفل کارتی، دوش‌های اختصاصی و محصولات بهداشتی ارگانیک.",
      icon: ShieldCheck,
    },
    {
      title: "بار سلامت و نوشیدنی‌های ارگانیک",
      desc: "سرو انواع دتاکس واتر، اسموتی پروتئینی طبیعی و نوشیدنی‌های احیاکننده انرژی.",
      icon: Activity,
    },
    {
      title: "محیط ۱۰۰٪ اختصاصی و امن بانوان",
      desc: "آرامش کامل، حفظ حریم شخصی و فضایی دلنشین و آکوستیک به دور از هیاهوی شهری.",
      icon: Users,
    },
  ];

  return (
    <section className="relative border-t border-border/70 px-4 py-20 lg:py-24 bg-card/25">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" className="mb-14 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">امکانات رفاهی استودیو</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            فضایی ساخته‌شده برای آرامش و تمرکز
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-border/70 bg-card p-6 text-right transition-all duration-200 hover:-translate-y-1 hover:border-primary/30">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MEMBER REVIEWS                               */
/* -------------------------------------------------------------------------- */

function TestimonialsSection() {
  const reviews = [
    {
      quote:
        "بعد از ماه‌ها کارمندی و پشت میز نشستن، دردهای شدید گردن و کمر داشتم. بعد از ۲ ماه تمرین ریفرمر با مهسا جون، دردهام کاملاً رفع شده و وضعیت بدنم اصلاح شده.",
      author: "دکتر مریم شمس",
      role: "عضو استودیو لومی · ۶ ماه همراهی",
    },
    {
      quote:
        "فضای لومی با تمام باشگاه‌هایی که قبلاً رفتم فرق داره. سکوت، بهداشت عالی و توجه مربی در تک‌تک حرکات باعث شده با شوق و بدون خستگی ورزش کنم.",
      author: "نگین کریمی",
      role: "عضو پکیج ریفرمر نیمه‌خصوصی",
    },
    {
      quote:
        "اپلیکیشن لومی واقعاً عالیه؛ اینکه هر روز برنامه و بازخورد مربی ثبت میشه و تاریخ انقضا و جلساتم رو شفاف می‌بینم خیلی احساس حرفه‌ای بودن میده.",
      author: "پرستو انصاری",
      role: "عضو استودیو · ۸ ماه همراهی",
    },
  ];

  return (
    <section className="relative border-t border-border/70 px-4 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" className="mb-14 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">داستان‌های پیشرفت اعضا</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            تجربه واقعی اعضای خانواده لومی
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((rev, i) => (
            <Reveal key={rev.author} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 text-right shadow-sm">
                <div>
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-6 text-muted-foreground">«{rev.quote}»</p>
                </div>
                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="text-xs font-bold text-foreground">{rev.author}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{rev.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               FAQ ACCORDION                                */
/* -------------------------------------------------------------------------- */

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "آیا تمرینات پیلاتس ریفرمر برای مبتدی‌ها مناسب است؟",
      a: "بله، کاملاً. دستگاه ریفرمر با فنرهای حمایتی خود فشار مستقیم به مفاصل را حذف کرده و حتی برای افرادی که مدت‌ها ورزش نکرده‌اند یا سابقه آسیب دارند، ایمن‌ترین و ایده‌آل‌ترین شروع است.",
    },
    {
      q: "شرایط انجماد (Freeze) جلسات در صورت سفر یا مشغله چگونه است؟",
      a: "شما می‌توانید به راحتی از طریق اپلیکیشن یا پشتیبانی استودیو، اشتراک خود را بین ۷ تا ۱۴ روز (بسته به نوع پکیج) متوقف کرده و پس از بازگشت بدون از دست رفتن هیچ جلسه‌ای ادامه دهید.",
    },
    {
      q: "آیا پیش از ثبت‌نام امکان مشاوره حضوری یا تعیین سطح وجود دارد؟",
      a: "بله، پیش از شروع می‌توانید با مربیان ارشد استودیو جلسه معارفه و ارزیابی بیومکانیک رزرو کنید تا مناسب‌ترین پکیج و برنامه برای شما تنظیم شود.",
    },
    {
      q: "کلاس‌های نیمه‌خصوصی حداکثر چند نفره هستند؟",
      a: "کلاس‌های ریفرمر حداکثر با ۴ نفر برگزار می‌شوند تا مربی در تمام طول جلسه امکان نظارت دقیق بر فرم حرکتی تک‌تک افراد را داشته باشد.",
    },
  ];

  return (
    <section id="faq" className="relative border-t border-border/70 px-4 py-20 lg:py-24 bg-card/20">
      <div className="mx-auto max-w-4xl">
        <Reveal direction="none" className="mb-12 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">پاسخ به سوالات متداول</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            پرسش‌های متداول شما
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-border/80 bg-card transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-right font-medium text-foreground hover:bg-secondary/40"
              >
                <span className="text-sm font-semibold">{faq.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {openIndex === idx && (
                <div className="border-t border-border/60 p-5 pt-3 text-xs leading-6 text-muted-foreground text-right">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             CLOSING CTA BANNER                             */
/* -------------------------------------------------------------------------- */

function ClosingCtaBanner({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="relative px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-primary/30 bg-gradient-to-br from-card via-secondary/60 to-card p-8 shadow-2xl sm:p-12 text-right">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">آغاز تجربه لومی</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-foreground md:text-4xl">
            آماده‌ای سبک جدیدی از تمرین و تندرستی را تجربه کنی؟
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            همین امروز عضو خانواده لومی شو و اولین قدم را برای سلامتی، تناسب اندام و آرامش پایدار بردار.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onRegister}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary via-[#967347] to-blush px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98] cursor-pointer"
            >
              <span>ثبت‌نام و عضویت باشگاه</span>
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </button>
            <a
              href="tel:02122000000"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/80 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary cursor-pointer"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>تماس و مشاوره حضوری</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-right">
          <div className="sm:col-span-2 lg:col-span-1">
            <LumiLogo size="sm" variant="auto" showSubtitle={true} />
            <p className="mt-4 max-w-[28ch] text-xs leading-6 text-muted-foreground">
              استودیو تخصصی تندرستی و ریفرمر پیلاتس بانوان — طراحی هماهنگ بدن، آرامش ذهن و قدرت پیوسته.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/gymapp.ir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام لومی"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://t.me/gymapp_ir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="کانال تلگرام"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 5 4 12l5 2 8-7-5 8 2 4 3-13z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground">دسترسی و بخش‌ها</h3>
            <ul className="mt-3.5 space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a href="#philosophy" className="hover:text-foreground">
                  فلسفه تمرین
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-foreground">
                  رشته‌ها و امکانات
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-foreground">
                  برنامه هفتگی
                </a>
              </li>
              <li>
                <a href="#coaches" className="hover:text-foreground">
                  مربیان ارشد
                </a>
              </li>
              <li>
                <a href="#memberships" className="hover:text-foreground">
                  تعرفه اشتراک‌ها
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground">ساعات کاری و آدرس</h3>
            <div className="mt-3.5 space-y-2 text-xs text-muted-foreground leading-6">
              <p>شنبه تا چهارشنبه: ۰۸:۰۰ الی ۲۱:۰۰</p>
              <p>پنج‌شنبه‌ها: ۰۹:۰۰ الی ۱۸:۰۰</p>
              <p className="mt-2 text-foreground font-medium flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>تهران، زعفرانیه، مجتمع تندرستی لومی</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground">ورود اعضا و نسخه وب‌اپ</h3>
            <ul className="mt-3.5 space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/auth/login" className="hover:text-foreground">
                  ورود به پنل اعضا و مربیان
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-foreground">
                  ثبت‌نام آنلاین
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  قوانین و حریم خصوصی
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-primary">
                  ● وب‌اپلیکیشن نصب‌پذیر (PWA)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© ۱۴۰۴ Lumi Wellness — تمامی حقوق برای استودیو تندرستی لومی محفوظ است.</p>
          <MicroLabel>BESPOKE WOMEN'S WELLNESS STUDIO</MicroLabel>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN HOME PAGE                               */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      switch (user.role) {
        case "admin":
          router.replace("/admin");
          break;
        case "coach":
          router.replace("/coach");
          break;
        case "athlete":
          router.replace("/athlete");
          break;
        default:
          router.replace("/auth/login");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isAuthenticated && user) {
    const panelHref =
      user.role === "admin"
        ? "/admin"
        : user.role === "coach"
        ? "/coach"
        : user.role === "athlete"
        ? "/athlete"
        : "/auth/login";
    const roleLabel =
      user.role === "admin" ? "پنل ادمین" : user.role === "coach" ? "پنل مربی" : "پنل ورزشکار";

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground">
        <GymBackdrop className="absolute inset-0" />
        <div className="relative z-10 w-full max-w-md rounded-[32px] border border-border bg-popover p-8 text-center shadow-2xl shadow-scrim/50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-secondary text-primary">
            <CheckCircle2 className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h1 className="mt-4 font-serif text-2xl font-medium text-foreground">
            خوش آمدی، {user.firstName || user.email}!
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            حساب کاربری شما فعال است. می‌توانی مستقیم به پنل بروی یا با حساب دیگری وارد شوی.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <CtaButton onClick={() => router.push(panelHref)} className="text-sm">
              ورود به {roleLabel}
            </CtaButton>
            <CtaButton
              variant="ghost"
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="text-sm"
            >
              خروج و ورود با حساب دیگر
            </CtaButton>
            <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-foreground">
              رفتن به صفحه ورود
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">اگر این حساب شما نیست، گزینه خروج را بزن.</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <LandingNavigation
        onLogin={() => router.push("/auth/login")}
        onRegister={() => router.push("/auth/register")}
      />
      <HeroSection
        onLogin={() => router.push("/auth/login")}
        onRegister={() => router.push("/auth/register")}
      />
      <PhilosophySection />
      <StudioClassesSection />
      <WeeklyScheduleSection />
      <CoachesSection />
      <MembershipsSection onRegister={() => router.push("/auth/register")} />
      <AmenitiesSection />
      <TestimonialsSection />
      <FaqSection />
      <ClosingCtaBanner onRegister={() => router.push("/auth/register")} />
      <Footer />
    </main>
  );
}
