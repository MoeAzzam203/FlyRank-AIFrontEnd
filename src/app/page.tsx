"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const initialValues = {
  displayName: "",
  email: "",
  theme: "system",
};

type FormValues = typeof initialValues;
type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.displayName.trim()) {
    errors.displayName = "Display name is required.";
  } else if (values.displayName.trim().length < 2) {
    errors.displayName =
      "Display name must contain at least 2 non-whitespace characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.theme) {
    errors.theme = "Preferred theme is required.";
  }

  return errors;
}

export default function Home() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const errors = validate(values);

  const updateField = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSuccess(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      setSuccess(true);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
    setSuccess(false);
  };

  const showError = (field: FieldName) =>
    Boolean(errors[field] && (touched[field] || submitted));

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">User settings</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Update your profile preferences.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium" htmlFor="displayName">
              Display name
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-base outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300"
              id="displayName"
              name="displayName"
              type="text"
              value={values.displayName}
              onBlur={() => setTouched((current) => ({ ...current, displayName: true }))}
              onChange={(event) => updateField("displayName", event.target.value)}
              aria-describedby={showError("displayName") ? "displayName-error" : undefined}
              aria-invalid={showError("displayName")}
              required
            />
            {showError("displayName") && (
              <p className="mt-2 text-sm text-red-700" id="displayName-error">
                {errors.displayName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-base outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300"
              id="email"
              name="email"
              type="email"
              value={values.email}
              onBlur={() => setTouched((current) => ({ ...current, email: true }))}
              onChange={(event) => updateField("email", event.target.value)}
              aria-describedby={showError("email") ? "email-error" : undefined}
              aria-invalid={showError("email")}
              required
            />
            {showError("email") && (
              <p className="mt-2 text-sm text-red-700" id="email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="theme">
              Preferred theme
            </label>
            <select
              className="mt-2 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300"
              id="theme"
              name="theme"
              value={values.theme}
              onBlur={() => setTouched((current) => ({ ...current, theme: true }))}
              onChange={(event) => updateField("theme", event.target.value)}
              aria-describedby={showError("theme") ? "theme-error" : undefined}
              aria-invalid={showError("theme")}
              required
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            {showError("theme") && (
              <p className="mt-2 text-sm text-red-700" id="theme-error">
                {errors.theme}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              className="rounded-lg bg-zinc-950 px-4 py-2.5 font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              type="submit"
            >
              Save settings
            </button>
            <button
              className="rounded-lg border border-zinc-300 px-4 py-2.5 font-medium text-zinc-800 transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          {success && (
            <p className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-800" role="status">
              Settings saved successfully.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
