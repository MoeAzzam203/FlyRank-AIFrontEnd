"use client";

import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { useMemo, useState } from "react";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  timezone: string;
  emailNotifications: boolean;
  productUpdates: boolean;
  darkMode: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  timezone: "",
  emailNotifications: true,
  productUpdates: false,
  darkMode: true,
};

const timezoneOptions = [
  "UTC-08:00 Pacific Time",
  "UTC-05:00 Eastern Time",
  "UTC+00:00 Greenwich Mean Time",
  "UTC+01:00 Central European Time",
  "UTC+05:30 India Standard Time",
  "UTC+09:00 Japan Standard Time",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: keyof FormValues, value: string | boolean) {
  switch (name) {
    case "fullName": {
      return typeof value === "string" && value.trim().length >= 2
        ? ""
        : "Please enter your full name.";
    }
    case "email": {
      return typeof value === "string" && emailPattern.test(value.trim())
        ? ""
        : "Please enter a valid email address.";
    }
    case "password": {
      if (typeof value !== "string") {
        return "Password is required.";
      }
      if (value.length < 8) {
        return "Use at least 8 characters.";
      }
      if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
        return "Include upper, lower, and numeric characters.";
      }
      return "";
    }
    case "confirmPassword": {
      return typeof value === "string" && value.length > 0 ? "" : "Please confirm your password.";
    }
    case "timezone": {
      return value ? "" : "Choose a timezone.";
    }
    default:
      return "";
  }
}

export default function Home() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = useMemo<FormErrors>(() => {
    const nextErrors: FormErrors = {};

    (Object.keys(initialValues) as Array<keyof FormValues>).forEach((key) => {
      if (key === "emailNotifications" || key === "productUpdates" || key === "darkMode") {
        return;
      }

      const error = validateField(key, values[key]);
      if (error) {
        nextErrors[key] = error;
      }
    });

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }, [values]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const isCheckbox = type === "checkbox";

    const nextValue = isCheckbox
      ? (event.target as HTMLInputElement).checked
      : value;

    setValues((current) => ({
      ...current,
      [name]: nextValue,
    }));

    if (touched[name]) {
      setTouched((current) => ({ ...current, [name]: true }));
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const isValid = Object.values(errors).every((error) => !error);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      timezone: true,
    });

    if (!isValid) {
      return;
    }

    alert("Settings saved successfully.");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
        <div className="border-b border-slate-200 px-6 py-6 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Account settings
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Personalize your workspace
          </h1>
        </div>

        <form className="space-y-8 px-6 py-8 md:px-10" onSubmit={handleSubmit} noValidate>
          <section className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean((touched.fullName || isSubmitted) && errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-4 ${
                  (touched.fullName || isSubmitted) && errors.fullName
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 bg-slate-50 focus:border-violet-500 focus:ring-violet-100"
                }`}
                placeholder="Jamie Taylor"
              />
              {(touched.fullName || isSubmitted) && errors.fullName ? (
                <p id="fullName-error" className="text-sm text-red-600">
                  {errors.fullName}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean((touched.email || isSubmitted) && errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-4 ${
                  (touched.email || isSubmitted) && errors.email
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 bg-slate-50 focus:border-violet-500 focus:ring-violet-100"
                }`}
                placeholder="jamie@example.com"
              />
              {(touched.email || isSubmitted) && errors.email ? (
                <p id="email-error" className="text-sm text-red-600">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean((touched.password || isSubmitted) && errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-4 ${
                  (touched.password || isSubmitted) && errors.password
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 bg-slate-50 focus:border-violet-500 focus:ring-violet-100"
                }`}
                placeholder="Enter a strong password"
              />
              {(touched.password || isSubmitted) && errors.password ? (
                <p id="password-error" className="text-sm text-red-600">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean((touched.confirmPassword || isSubmitted) && errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-4 ${
                  (touched.confirmPassword || isSubmitted) && errors.confirmPassword
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 bg-slate-50 focus:border-violet-500 focus:ring-violet-100"
                }`}
                placeholder="Repeat password"
              />
              {(touched.confirmPassword || isSubmitted) && errors.confirmPassword ? (
                <p id="confirmPassword-error" className="text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>
          </section>

          <section className="space-y-2">
            <label htmlFor="timezone" className="block text-sm font-medium text-slate-700">
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={values.timezone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean((touched.timezone || isSubmitted) && errors.timezone)}
              aria-describedby={errors.timezone ? "timezone-error" : undefined}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-4 ${
                (touched.timezone || isSubmitted) && errors.timezone
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 bg-slate-50 focus:border-violet-500 focus:ring-violet-100"
              }`}
            >
              <option value="">Select your timezone</option>
              {timezoneOptions.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
            {(touched.timezone || isSubmitted) && errors.timezone ? (
              <p id="timezone-error" className="text-sm text-red-600">
                {errors.timezone}
              </p>
            ) : null}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
            <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
            <div className="mt-4 space-y-4">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                <div>
                  <span className="block text-sm font-medium text-slate-800">Email notifications</span>
                  <span className="block text-xs text-slate-500">Receive project updates and reminders</span>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={values.emailNotifications}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                <div>
                  <span className="block text-sm font-medium text-slate-800">Product updates</span>
                  <span className="block text-xs text-slate-500">News about new features and improvements</span>
                </div>
                <input
                  type="checkbox"
                  name="productUpdates"
                  checked={values.productUpdates}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                <div>
                  <span className="block text-sm font-medium text-slate-800">Dark mode</span>
                  <span className="block text-xs text-slate-500">Use the dark interface by default</span>
                </div>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={values.darkMode}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
              </label>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              onClick={() => {
                setValues(initialValues);
                setTouched({});
                setIsSubmitted(false);
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-violet-300"
              disabled={!isValid && isSubmitted}
            >
              Save settings
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
