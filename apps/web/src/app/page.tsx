"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
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
  ShieldCheck,
  Award,
  Star,
  Phone,
} from "lucide-react";

/* Helper for reliable smooth in-page scrolling */
function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = `#${id}`;
  }
}

/* -------------------------------------------------------------------------- */
/*                                 NAVIGATION                                 */
/* -------------------------------------------------------------------------- */

function LandingNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "رشته‌ها و متد", id: "disciplines" },
    { label: "برنامه هفتگی", id: "schedule" },
    { label: "مربیان ارشد", id: "coaches" },
    { label: "تعرفه اشتراک‌ها", id: "memberships" },
    { label: "پرسش‌های متداول", id: "faq" },
  ];

  const handleNavClick = (id: string) => {
    scrollToId(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky inset-x-0 top-0 z-40 px-3 py-2.5 sm:px-4 sm:py-3">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-border/80 bg-background/90 px-4 py-2.5 shadow-md shadow-scrim/5 backdrop-blur-xl sm:px-6"
        aria-label="ناوبری اصلی استودیو لومی"
      >
        <Link
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          className="flex items-center gap-2"
          aria-label="صفحه اصلی لومی ولنس"
        >
          <LumiLogo size="sm" variant="auto" showSubtitle={true} />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 text-xs font-medium text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="cursor-pointer transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="hidden cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-secondary sm:inline-flex"
          >
            ورود به پنل
          </Link>
          <Link
            href="/auth/register"
            className="group relative inline-flex cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-l from-primary via-[#967347] to-blush px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:shadow-md hover:shadow-primary/30 active:scale-[0.98]"
          >
            <span>شروع عضویت</span>
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-foreground lg:hidden"
            aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-3 top-16 z-50 rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-3 text-right">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className="cursor-pointer border-b border-border/50 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2">
              <Link
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-primary-foreground shadow-sm"
              >
                ثبت‌نام و عضویت باشگاه
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl border border-border bg-secondary/50 py-2.5 text-center text-xs font-bold text-foreground"
              >
                ورود اعضا و مربیان
              </Link>
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

function HeroSection() {
  return (
    <section id="top" className="relative scroll-mt-20 overflow-hidden px-4 py-8 sm:py-12 lg:py-14">
      {/* Ambient background atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <GymBackdrop className="absolute inset-0 opacity-25 transition-opacity dark:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background dark:from-background/85 dark:via-background/55 dark:to-background" />
        <div className="absolute top-1/4 -right-20 h-72 w-72 rounded-full bg-blush-fixed/15 blur-[100px] dark:bg-blush-solid/10" />
        <div className="absolute -bottom-10 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
        <div className="text-right">
          {/* Quiet editorial kicker */}
          <div className="mb-3.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-blush animate-pulse" aria-hidden="true" />
            <span>استودیو تخصصی تندرستی و پیلاتس بانوان</span>
            <span aria-hidden="true">·</span>
            <span>محیط اختصاصی و امن</span>
          </div>

          <h1 className="mb-4 font-serif text-3xl font-normal leading-[1.3] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="block font-light">طراحی هماهنگ بدن،</span>
            <span className="block bg-gradient-to-l from-blush via-blush-solid to-primary bg-clip-text font-medium text-transparent">
              آرامش و قدرت پیوسته
            </span>
          </h1>

          <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            فضایی اختصاصی ویژه بانوان؛ ترکیب متد علمی ریفرمر پیلاتس با تمرینات قدرتی عملکردی، مربیان ارشد همراه و ثبت و پایش هوشمند تندرستی در هر جلسه.
          </p>

          {/* Action CTAs: Direct Working Links */}
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
            <Link
              href="/auth/register"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-primary via-[#967347] to-blush px-6 py-3 font-sans text-sm font-semibold tracking-normal text-white shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] w-full sm:w-auto text-center"
            >
              <span>ثبت‌نام و عضویت باشگاه</span>
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/auth/login"
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card/80 px-6 py-3 font-sans text-sm font-medium tracking-normal text-foreground backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/70 hover:shadow-sm active:scale-[0.98] w-full sm:w-auto text-center"
            >
              <span>ورود اعضا و مربیان</span>
            </Link>
          </div>

          {/* Social proof indicators */}
          <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-border/70 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5 space-x-reverse">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-blush/20 text-[9px] font-bold text-blush">
                  م‌ا
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-primary/20 text-[9px] font-bold text-primary">
                  س‌ر
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-secondary text-[9px] font-bold text-foreground">
                  ن‌ک
                </span>
              </div>
              <span className="font-medium text-foreground">+۴۵۰ ورزشکار فعال</span>
            </div>
            <div className="h-3.5 w-px bg-border" />
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" strokeWidth={1.5} />
              <span className="font-semibold text-foreground">۴.۹</span>
              <span>رضایت اعضا</span>
            </div>
            <div className="h-3.5 w-px bg-border" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
              <span>مدرک بین‌المللی STOTT</span>
            </div>
          </div>
        </div>

        {/* Hero showcase card */}
        <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-[28rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-blush/20 via-primary/10 to-transparent blur-xl"
          />

          <div className="relative overflow-hidden rounded-[24px] border border-border/80 bg-card/90 p-5 shadow-xl backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-4 text-right">
              <div>
                <span className="text-[11px] font-semibold text-primary">امروز · برنامه اختصاصی شما</span>
                <h3 className="mt-0.5 font-serif text-lg font-normal text-foreground">
                  پیلاتس ریفرمر و میان‌تنه
                </h3>
                <p className="text-xs text-muted-foreground">با مربی مهسا احمدی · استودیو ۱</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blush/30 bg-blush/10 text-blush">
                <Activity className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </div>

            {/* Daily progress */}
            <div className="my-4 rounded-xl border border-border/60 bg-secondary/40 p-3 text-right">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-muted-foreground">میزان پیشرفت هفتگی</span>
                <span className="font-serif text-base font-semibold text-blush" dir="ltr">
                  78%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-blush-solid to-blush transition-all duration-500"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-2 text-right">
              {[
                { label: "کالری فعال", value: "۳۸۰", unit: "کالری", color: "bg-blush" },
                { label: "مدت تمرین", value: "۴۵", unit: "دقیقه", color: "bg-primary" },
                { label: "تداوم زنجیره", value: "۵", unit: "روز", color: "bg-emerald-500" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border/60 bg-card/60 p-2.5 backdrop-blur-sm"
                >
                  <span className={`mb-1.5 block h-1 w-4 rounded-full ${item.color}`} />
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="mt-0.5 font-serif text-xs font-semibold text-foreground">
                    {item.value} <span className="text-[9px] font-normal text-muted-foreground">{item.unit}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Coach quote badge */}
            <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-border/60 bg-secondary/30 p-2.5 text-right">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                م
              </span>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                «تمرکز امروز بر تنفس عمیق دیافراگمی و کنترل مفاصل روی دستگاه ریفرمر است.»
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                     STUDIO DISCIPLINES & METHODOLOGY                       */
/* -------------------------------------------------------------------------- */

function DisciplinesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const classes = [
    {
      id: "reformer",
      title: "ریفرمر پیلاتس (Reformer)",
      category: "تخصصی و اصلاحی",
      desc: "تمرین بر روی دستگاه ریفرمر با فنرهای مقاومتی کالیبره‌شده؛ کشیدگی عمیق، تقویت عضلات عمقی شکم و لگن، و اصلاح انحرافات ستون فقرات بدون ضربه و فشار به مفاصل.",
      duration: "۵۰ دقیقه",
      intensity: "متوسط تا بالا",
      capacity: "حداکثر ۴ نفر در استودیو",
      focus: ["تقویت میان‌تنه", "انعطاف‌پذیری ستون فقرات", "فرم‌دهی پاها"],
    },
    {
      id: "barre",
      title: "باروسل و بار (Barre)",
      category: "قدرت و ریتمیک",
      desc: "الهام‌گرفته از باله کلاسیک و پیلاتس؛ تمرینات ایزومتریک با تکرار بالا که فرمی کشیده، شانه‌های متقارن و پایین‌تنه‌ای قوی پدید می‌آورد.",
      duration: "۴۵ دقیقه",
      intensity: "بالا (چربی‌سوز)",
      capacity: "حداکثر ۸ نفر",
      focus: ["فرم‌دهی باسن و ران", "اصلاح وضعیت شانه و گردن", "استقامت عضلانی"],
    },
    {
      id: "functional",
      title: "قدرت عملکردی بانوان",
      category: "قدرتی و متابولیک",
      desc: "تمرینات متناسب با فیزیولوژی بانوان برای افزایش تراکم استخوان، تسریع متابولیسم و افزایش توان روزمره با حرکات اصولی اسکات، کتل‌بل و کشش.",
      duration: "۵۰ دقیقه",
      intensity: "بالا",
      capacity: "حداکثر ۶ نفر",
      focus: ["تراکم استخوان", "تقویت زنجیره خلفی", "انرژی روزمره"],
    },
    {
      id: "mobility",
      title: "موبیلیتی و رهاسازی تنش",
      category: "ریکاوری و آرامش",
      desc: "ویژه رفع گرفتگی‌های عضلانی پشت میز نشستن و استرس؛ تمرکز بر تنفس دیافراگمی، رولینگ فوم و باز کردن مفاصل لگن و قفسه سینه.",
      duration: "۴۰ دقیقه",
      intensity: "آرام و ترمیمی",
      capacity: "حداکثر ۸ نفر",
      focus: ["کاهش دردهای کمر", "آرامش سیستم عصبی", "کیفیت خواب"],
    },
  ];

  const currentClass = classes[activeTab];

  return (
    <section id="disciplines" className="relative scroll-mt-20 border-t border-border/70 px-4 py-10 sm:py-14 bg-card/25">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">رشته‌ها و متد تمرین</p>
          <h2 className="mt-1.5 font-serif text-2xl font-normal text-foreground md:text-3xl">
            رشته‌های تخصصی استودیو لومی
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
            کلاس‌های کم‌جمعیت با تمرکز بر اجرای بی‌نقص حرکات تحت نظارت مستقیم مربی ارشد.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="mx-auto mb-6 flex max-w-2xl flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-border bg-card p-1">
          {classes.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
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
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-7 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:gap-8">
          <div className="text-right">
            <span className="text-xs font-semibold text-blush">{currentClass.category}</span>
            <h3 className="mt-1 font-serif text-xl font-normal text-foreground sm:text-2xl">
              {currentClass.title}
            </h3>
            <p className="mt-2.5 text-xs leading-6 text-muted-foreground sm:text-sm">{currentClass.desc}</p>

            <div className="mt-5 grid grid-cols-3 gap-3 border-y border-border/70 py-4 text-xs">
              <div>
                <p className="text-[11px] text-muted-foreground">مدت جلسه</p>
                <p className="mt-0.5 font-semibold text-foreground">{currentClass.duration}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">شدت تمرین</p>
                <p className="mt-0.5 font-semibold text-foreground">{currentClass.intensity}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">ظرفیت</p>
                <p className="mt-0.5 font-semibold text-foreground">{currentClass.capacity}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-between rounded-xl border border-border/70 bg-secondary/30 p-4 lg:mt-0 text-right">
            <div>
              <p className="text-xs font-semibold text-primary">اهداف کلیدی این رشته</p>
              <div className="mt-3 space-y-2">
                {currentClass.focus.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="text-xs font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/auth/register"
              className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>رزرو این کلاس و مشاوره</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
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
      spots: string;
    }>
  > = {
    شنبه: [
      {
        time: "۰۹:۰۰ - ۰۹:۵۰",
        title: "پیلاتس ریفرمر سطح ۱ و اصلاحی",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        spots: "۱ جای خالی",
      },
      {
        time: "۱۱:۰۰ - ۱۱:۴۵",
        title: "باروسل و فرم‌دهی کششی",
        coach: "سارا رضایی",
        studio: "استودیو آینه و بار",
        spots: "۳ جای خالی",
      },
      {
        time: "۱۶:۳۰ - ۱۷:۲۰",
        title: "فانکشنال استرنگث و میان‌تنه",
        coach: "نیلوفر کاظمی",
        studio: "استودیو ۲",
        spots: "تکمیل",
      },
      {
        time: "۱۸:۰۰ - ۱۸:۵۰",
        title: "ریفرمر تخصصی ستون فقرات",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        spots: "۲ جای خالی",
      },
    ],
    یکشنبه: [
      {
        time: "۰۹:۳۰ - ۱۰:۲۰",
        title: "موبیلیتی و رفع انقباض عضلانی",
        coach: "سارا رضایی",
        studio: "استودیو آرامش",
        spots: "۴ جای خالی",
      },
      {
        time: "۱۶:۰۰ - ۱۶:۵۰",
        title: "پیلاتس ریفرمر سطح ۲",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        spots: "۲ جای خالی",
      },
    ],
    دوشنبه: [
      {
        time: "۰۹:۰۰ - ۰۹:۵۰",
        title: "پیلاتس ریفرمر قدرت و تعادل",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        spots: "۲ جای خالی",
      },
      {
        time: "۱۱:۰۰ - ۱۱:۵۰",
        title: "قدرت عملکردی و تراباند",
        coach: "نیلوفر کاظمی",
        studio: "استودیو ۲",
        spots: "۱ جای خالی",
      },
    ],
    سه‌شنبه: [
      {
        time: "۱۰:۰۰ - ۱۰:۵۰",
        title: "باروسل و تقویت بالاتنه",
        coach: "سارا رضایی",
        studio: "استودیو آینه",
        spots: "۳ جای خالی",
      },
      {
        time: "۱۶:۳۰ - ۱۷:۲۰",
        title: "پیلاتس ریفرمر پیشرفته",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        spots: "۲ جای خالی",
      },
    ],
    چهارشنبه: [
      {
        time: "۰۹:۰۰ - ۰۹:۵۰",
        title: "پیلاتس ریفرمر فول‌بادی",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        spots: "۱ جای خالی",
      },
      {
        time: "۱۷:۰۰ - ۱۷:۵۰",
        title: "باروسل و انقباضات ایزومتریک",
        coach: "سارا رضایی",
        studio: "استودیو آینه",
        spots: "۳ جای خالی",
      },
    ],
    پنج‌شنبه: [
      {
        time: "۱۰:۰۰ - ۱۰:۵۰",
        title: "پیلاتس ریفرمر آخر هفته",
        coach: "مهسا احمدی",
        studio: "استودیو ریفرمر ۱",
        spots: "تکمیل",
      },
      {
        time: "۱۱:۳۰ - ۱۲:۲۰",
        title: "موبیلیتی مفاصل و کشش کامل",
        coach: "سارا رضایی",
        studio: "استودیو آرامش",
        spots: "۳ جای خالی",
      },
    ],
  };

  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"];
  const currentSlots = scheduleData[selectedDay] || [];

  return (
    <section id="schedule" className="relative scroll-mt-20 border-t border-border/70 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">برنامه هفتگی کلاس‌ها</p>
          <h2 className="mt-1.5 font-serif text-2xl font-normal text-foreground md:text-3xl">
            سانس‌های فعال این هفته
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
            سانس‌ها در گروه‌های کوچک و با رزرو قبلی برگزار می‌شوند.
          </p>
        </div>

        {/* Days Filter */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                selectedDay === day
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="grid gap-3 sm:grid-cols-2">
          {currentSlots.map((slot) => (
            <div
              key={slot.time + slot.title}
              className="flex items-center justify-between rounded-xl border border-border/80 bg-card p-4 text-right transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-foreground text-xs sm:text-sm">{slot.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>مربی: {slot.coach}</span>
                  <span aria-hidden="true">·</span>
                  <span>{slot.studio}</span>
                </div>
              </div>
              <div className="text-left flex flex-col items-end gap-1.5">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                    slot.spots.includes("تکمیل")
                      ? "bg-destructive/10 text-destructive"
                      : "bg-blush/10 text-blush"
                  }`}
                >
                  {slot.spots}
                </span>
                <span className="text-[11px] text-muted-foreground" dir="ltr">
                  {slot.time}
                </span>
              </div>
            </div>
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
      title: "مربی ارشد پیلاتس ریفرمر",
      badge: "گواهینامه STOTT Pilates",
      rating: "۴.۹۵",
      experience: "۸ سال سابقه",
      initials: "م‌ا",
    },
    {
      name: "سارا رضایی",
      title: "مربی تخصصی باروسل و وضعیت بدنی",
      badge: "گواهی متد بار فرانسه",
      rating: "۴.۹۰",
      experience: "۶ سال سابقه",
      initials: "س‌ر",
    },
    {
      name: "نیلوفر کاظمی",
      title: "مربی بدنسازی عملکردی و تغذیه",
      badge: "کارشناس ارشد فیزیولوژی",
      rating: "۴.۸۸",
      experience: "۷ سال سابقه",
      initials: "ن‌ک",
    },
  ];

  return (
    <section id="coaches" className="relative scroll-mt-20 border-t border-border/70 px-4 py-10 sm:py-14 bg-card/20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">تیم مربیان ارشد</p>
          <h2 className="mt-1.5 font-serif text-2xl font-normal text-foreground md:text-3xl">
            مربیان همراه و متخصص
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {coaches.map((c) => (
            <div
              key={c.name}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 text-right transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-secondary font-serif text-xs font-bold text-primary">
                    {c.initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-foreground">{c.name}</h3>
                    <p className="text-[11px] font-medium text-blush">{c.title}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-secondary/40 p-2 text-[11px] text-muted-foreground">
                  <Award className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{c.badge}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">{c.rating}</span>
                </div>
                <span>{c.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           TRANSPARENT MEMBERSHIPS                          */
/* -------------------------------------------------------------------------- */

function MembershipsSection() {
  const tiers = [
    {
      name: "اشتراک استودیو پایه",
      subtitle: "کلاس‌های گروهی فانکشنال و باروسل",
      price: "۱,۸۵۰,۰۰۰",
      popular: false,
      features: [
        "۱۲ جلسه کلاس گروهی در ماه",
        "کمد اختصاصی و حوله استودیو",
        "پایش حضور در وب‌اپلیکیشن",
        "امکان ۱ بار انجماد اشتراک",
      ],
      cta: "انتخاب این پکیج",
    },
    {
      name: "عضویت ویژه ریفرمر و پیلاتس",
      subtitle: "نیمه‌خصوصی (حداکثر ۴ نفر)",
      price: "۳,۴۰۰,۰۰۰",
      popular: true,
      features: [
        "۱۲ جلسه نیمه‌خصوصی ریفرمر",
        "برنامه تمرینی شخصی‌سازی شده",
        "آنالیز ماهانه ترکیبات بدنی (InBody)",
        "امکان ۲ بار انجماد اشتراک",
        "نوشیدنی دتاکس و بار سلامت",
      ],
      cta: "رزرو عضویت پیشنهادی",
    },
    {
      name: "عضویت طلایی خصوصی (VIP)",
      subtitle: "مربیگری اختصاصی ۱-به-۱",
      price: "۵,۹۰۰,۰۰۰",
      popular: false,
      features: [
        "۱۲ جلسه کاملاً خصوصی با مربی ارشد",
        "برنامه اختصاصی تغذیه ورزشی",
        "ساعت‌های شناور با اولویت رزرو",
        "کمد دائم و رختکن اختصاصی VIP",
      ],
      cta: "درخواست مشاوره VIP",
    },
  ];

  return (
    <section id="memberships" className="relative scroll-mt-20 border-t border-border/70 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">تعرفه و بسته‌های عضویت</p>
          <h2 className="mt-1.5 font-serif text-2xl font-normal text-foreground md:text-3xl">
            اشتراک شفاف، بدون هزینه‌های پنهان
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
            امکان انتقال یا انجماد قانونی جلسات در صورت سفر یا مشغله کاری.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex h-full flex-col justify-between rounded-2xl border p-5 text-right transition-all duration-200 ${
                tier.popular
                  ? "border-primary bg-card shadow-xl ring-1 ring-primary/40"
                  : "border-border/80 bg-card shadow-sm hover:border-primary/40"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 right-5 rounded-full bg-gradient-to-l from-primary to-blush px-3 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  پیشنهاد ویژه اعضا
                </span>
              )}

              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{tier.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{tier.subtitle}</p>

                <div className="my-4 border-y border-border/60 py-3">
                  <span className="font-serif text-2xl font-bold text-foreground">{tier.price}</span>
                  <span className="mr-1.5 text-xs text-muted-foreground">تومان / ماهانه</span>
                </div>

                <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link
                  href="/auth/register"
                  className={`block w-full text-center rounded-xl py-2.5 text-xs font-bold transition-all duration-200 ${
                    tier.popular
                      ? "bg-gradient-to-l from-primary via-[#967347] to-blush text-white shadow-md shadow-primary/20 hover:brightness-110 active:scale-[0.98]"
                      : "border border-border bg-secondary/50 text-foreground hover:bg-secondary active:scale-[0.98]"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
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
      a: "بله، دستگاه ریفرمر با فنرهای حمایتی خود فشار مستقیم به مفاصل را حذف کرده و حتی برای افرادی که مدت‌ها ورزش نکرده‌اند ایمن‌ترین شروع است.",
    },
    {
      q: "شرایط انجماد (Freeze) جلسات چگونه است؟",
      a: "شما می‌توانید از طریق اپلیکیشن یا پشتیبانی استودیو، اشتراک خود را بین ۷ تا ۱۴ روز متوقف کرده و پس از بازگشت بدون سوخت شدن جلسات ادامه دهید.",
    },
    {
      q: "آیا پیش از ثبت‌نام امکان مشاوره حضوری وجود دارد؟",
      a: "بله، می‌توانید پیش از ثبت‌نام، با مربیان ارشد جلسه معارفه و ارزیابی بیومکانیک رزرو نمایید.",
    },
  ];

  return (
    <section id="faq" className="relative scroll-mt-20 border-t border-border/70 px-4 py-10 sm:py-14 bg-card/20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-right md:text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">پرسش‌های متداول</p>
          <h2 className="mt-1 font-serif text-2xl font-normal text-foreground md:text-3xl">
            پاسخ به سوالات پرتکرار
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-xl border border-border/80 bg-card transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-right font-medium text-foreground hover:bg-secondary/40 cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-semibold">{faq.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {openIndex === idx && (
                <div className="border-t border-border/60 p-4 pt-2.5 text-xs leading-6 text-muted-foreground text-right">
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
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-border bg-background py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 text-right">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
          <div>
            <LumiLogo size="xs" variant="auto" showSubtitle={true} />
            <p className="mt-2 text-xs text-muted-foreground">
              استودیو تخصصی تندرستی و ریفرمر پیلاتس بانوان · تهران، زعفرانیه
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <Link href="/auth/login" className="hover:text-foreground">
              ورود اعضا
            </Link>
            <Link href="/auth/register" className="hover:text-foreground">
              عضویت آنلاین
            </Link>
            <a
              href="tel:02122000000"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <Phone className="h-3 w-3 text-primary" />
              <span dir="ltr">۰۲۱-۲۲۰۰۰۰۰۰</span>
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-[11px] text-muted-foreground sm:flex-row">
          <p>© ۱۴۰۴ Lumi Wellness — تمامی حقوق محفوظ است.</p>
          <MicroLabel>BESPOKE WOMEN'S WELLNESS</MicroLabel>
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
      <main className="relative flex min-h-screen items-center justify-center overflow-x-clip bg-background px-4 py-10 text-foreground">
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
            <Link
              href={panelHref}
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/95"
            >
              ورود به {roleLabel}
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="rounded-xl border border-border bg-secondary/50 py-3 text-sm font-semibold text-foreground hover:bg-secondary cursor-pointer"
            >
              خروج و ورود با حساب دیگر
            </button>
            <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-foreground">
              رفتن به صفحه ورود
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <LandingNavigation />
      <HeroSection />
      <DisciplinesSection />
      <WeeklyScheduleSection />
      <CoachesSection />
      <MembershipsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
