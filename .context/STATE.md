<!--schema:2.0.0-->
<!--agent:antigravity-->
<!--timestamp:2026-11-02T22:45:00+03:30-->

# 🎯 هدف جاری
توسعه و نگهداری سامانه مدیریت باشگاه و ورزشکاران (Lumi Wellness) — معماری یکپارچه Monorepo (وب Next.js 16 + بک‌اند FastAPI + بسته‌های اشتراکی Turbo). در این سشن، تمامی گپ‌های عملکردی سه فاز نقشه راه (پنل مربیان، پنل مدیریت و لایه داده/پایداری بک‌اند) به صورت کامل پیاده‌سازی، تست و راستی‌آزمایی شدند.

## ✅ کارهای انجام‌شده
- یکپارچه‌سازی کدبیس‌های همگرا در ساختار منوریپو تحت برنچ `main`
- استقرار فریمورک هماهنگی چند-ایجنت (Multi-Agent Sync v2.0)
- ایجاد فایل‌های قرارداد `AGENTS.md`، `CLAUDE.md` و گیت‌هوک‌های محافظتی
- ممیزی و رفع شکاف‌های استقرار Vercel/Next.js و بازطراحی `CapsuleChart`
- **فاز ۱ — فعال‌سازی کامل پنل مربیان (Coach Portal):**
  - جایگزینی تمامی شبیه‌سازی‌های `setTimeout` در صفحات `/coach/exercises`، `/coach/exercises/new`، `/coach/exercises/[id]`، `/coach/programs/new` و `/coach/templates` با هوک‌های واقعی React Query (`useCreateExercise`، `useUpdateExercise`، `useDeleteExercise`، `useCreateTrainingProgram`، `useAddProgramExercise`)
  - اتصال کامل کامپوننت‌های `ProgramDetailsSheet`، `ProgramExerciseSheet`، `ProgramExerciseRow`، `CloneProgramSheet` و `ConfirmDialog` در صفحه `/coach/programs/[id]` و `/coach/templates` همراه با نمایش نام ورزشکار اختصاص‌یافته
  - اصلاح مجوز RBAC در `POST /api/v1/users` (`backend/app/routers/users.py`) جهت امکان ثبت ورزشکار (`athlete`) توسط مربی (`coach`)، تکمیل فرم `/coach/athletes/new` و اتصال داده‌های برنامه فعال، درصد پیشرفت و آخرین حضور در `/coach/athletes`
- **فاز ۲ — تکمیل پنل مدیریت (Admin Portal):**
  - جایگزینی جدول‌های ساده `/admin/members` و `/admin/coaches` با کامپوننت کامل `UserDirectory.tsx` (جستجو، فیلتر وضعیت، صفحه‌بندی، ویرایش، تغییر رمز عبور، تغییر وضعیت و حذف کاربر)
  - اتصال شیت‌های عملیاتی (`UserEditSheet`، `UserPasswordSheet`، `ConfirmDialog`، `MembershipFormSheet`، `FreezeSheet` و رفع انجماد) در صفحات جزئیات `/admin/members/[id]` و `/admin/coaches/[id]` و محدودسازی مقدار `Progress` به بازه `[0, 100]`
  - اتصال `window.print()` به دکمه‌های چاپ رسید و دانلود PDF در `/admin/payments/[id]`
- **فاز ۳ — توسعه مدل‌ها و پایداری داده (Backend & Data Layer):**
  - افزودن مدل و جدول `ClubSettings` (`club_settings`) در بک‌اند FastAPI (`models.py`، `schemas.py`، `routers/settings.py`) و اتصال صفحه `/admin/settings` به هوک‌های `useClubSettings` و `useUpdateClubSettings`
  - افزودن مدل و جدول `BroadcastLog` (`broadcast_logs`) در بک‌اند FastAPI و ثبت خودکار تاریخچه اعلانات همگانی در `POST /api/v1/notifications/broadcast` + مسیر `GET /api/v1/notifications/broadcast-logs` و حذف وابستگی به `localStorage` در `/admin/notifications`
  - افزودن تست‌های واحد و یکپارچگی در `apps/web/src/hooks/api-source.test.ts` و `backend/tests/test_contract_v2.py`

## 📁 فایل‌های تغییریافته
- `backend/app/models.py`
- `backend/app/schemas.py`
- `backend/app/routers/settings.py` (جدید)
- `backend/app/main.py`
- `backend/app/routers/notifications.py`
- `backend/app/routers/users.py`
- `backend/tests/test_contract_v2.py`
- `apps/web/src/lib/types.ts`
- `apps/web/src/lib/api-client.ts`
- `apps/web/src/lib/mock-service.ts`
- `apps/web/src/hooks/api-source.ts`
- `apps/web/src/hooks/use-api.ts`
- `apps/web/src/hooks/api-source.test.ts`
- `apps/web/src/app/coach/exercises/page.tsx`
- `apps/web/src/app/coach/exercises/new/page.tsx`
- `apps/web/src/app/coach/exercises/[id]/page.tsx`
- `apps/web/src/app/coach/programs/new/page.tsx`
- `apps/web/src/app/coach/programs/[id]/page.tsx`
- `apps/web/src/app/coach/templates/page.tsx`
- `apps/web/src/app/coach/athletes/new/page.tsx`
- `apps/web/src/app/coach/athletes/page.tsx`
- `apps/web/src/app/admin/members/page.tsx`
- `apps/web/src/app/admin/coaches/page.tsx`
- `apps/web/src/app/admin/members/[id]/page.tsx`
- `apps/web/src/app/admin/coaches/[id]/page.tsx`
- `apps/web/src/app/admin/payments/[id]/page.tsx`
- `apps/web/src/app/admin/settings/page.tsx`
- `apps/web/src/app/admin/notifications/page.tsx`
- `.context/STATE.md`
- `.context/SESSION_LOG.md`

## 🎯 تسک دقیق بعدی
۱) اجرای مایگریشن دیتابیس (Alembic / ایجاد جداول `club_settings` و `broadcast_logs`) روی محیط استیجینگ/پروداکشن بک‌اند.
۲) اتصال ریپو به پروژهٔ Vercel با Root Directory = `apps/web` و تنظیم متغیرهای محیطی `NEXT_PUBLIC_API_URL`، `NEXT_PUBLIC_APP_URL` و `NEXT_PUBLIC_USE_MOCKS=false`.

## 🧠 تصمیمات فنی و چرایی
- **حذف کامل `setTimeout` و `localStorage` در عملیات‌های حیاتی:** تمامی فرم‌های مربی و ادمین اکنون از طریق لایه انتزاعی `api-source.ts` و React Query با بک‌اند و سرویس Mock همگام هستند و کش کوئری‌ها به‌صورت خودکار invalidate می‌شود.
- **مدیریت وضعیت فرم بدون `setState` در `useEffect`:** برای رعایت قوانین کامپایلر React (`react-hooks/set-state-in-effect`) در صفحات تنظیمات و برنامه‌های تمرینی، مقادیر اولیه از داده سرور مشتق شده و فقط تغییرات کاربر در state محلی نگه‌داری می‌شوند.
- **محدودسازی مقدار `Progress` در Radix UI:** در صورتی که مقدار فعلی هدف ورزشی از مقدار هدف عبور کند (مثلاً در اهداف کاهش وزن)، مقدار درصد به بازه `[0, 100]` محدود می‌شود تا خطای زمان اجرای کامپوننت Radix Progress رخ ندهد.

## ⚠️ نکات حساس و موانع
- پروژه برای بیلد پروداکشن نیازمند `NODE_ENV=production` است تا باندل‌های React CJS/ESM در زمان پیش‌رندر صفحات استاتیک تداخل پیدا نکنند.
- ۱۵ مسیر dynamic همچنان `"use client"` + `useParams` هستند که مهاجرت آن‌ها به Server Components می‌تواند در فازهای بعدی بهینه‌سازی انجام شود.
