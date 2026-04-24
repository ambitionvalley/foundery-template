"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Suspense, useMemo, useState } from "react";
import { Button } from "@/components/base/button";

type Country = { code: string; name: string; dial: string; flag: string };

// Template-friendly sample list. Fork-owners swap in a full ISO set
// (e.g. from `country-telephone-data` or their own curated file).
const COUNTRIES: Country[] = [
  { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", dial: "+994", flag: "🇦🇿" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "BO", name: "Bolivia", dial: "+591", flag: "🇧🇴" },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { code: "BF", name: "Burkina Faso", dial: "+226", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", dial: "+257", flag: "🇧🇮" },
  { code: "BG", name: "Bulgaria", dial: "+359", flag: "🇧🇬" },
  { code: "BM", name: "Bermuda", dial: "+1-441", flag: "🇧🇲" },
  { code: "BB", name: "Barbados", dial: "+1-246", flag: "🇧🇧" },
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
];

export default function SignupCountryPage() {
  return (
    <Suspense fallback={<CountryCardSkeleton />}>
      <CountryCard />
    </Suspense>
  );
}

function CountryCard() {
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get("phone") ?? "";
  const initialCode = params.get("country") ?? "NL";

  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<string>(initialCode);

  // When no search is active, float the selected country to the top so it's
  // always visible without scrolling (mirrors the Figma behaviour). When the
  // user is searching, show the normal filtered order.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.dial.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q),
      );
    }
    const selected = COUNTRIES.find((c) => c.code === selectedCode);
    if (!selected) return COUNTRIES;
    return [selected, ...COUNTRIES.filter((c) => c.code !== selectedCode)];
  }, [query, selectedCode]);

  const selected =
    COUNTRIES.find((c) => c.code === selectedCode) ?? COUNTRIES[0]!;

  function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contact = phone ? `${selected.dial} ${phone}` : selected.dial;
    const query = new URLSearchParams({
      method: "sms",
      contact,
      next: "/signup/password",
    });
    router.push(`/verify?${query.toString()}`);
  }

  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center gap-7 overflow-hidden rounded-[32px] bg-white p-6"
      aria-labelledby="country-heading"
    >
      <header className="flex w-full items-center justify-between">
        <Link
          href={
            phone
              ? `/signup?identifier=${encodeURIComponent(phone)}`
              : "/signup"
          }
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-[16px] bg-black/[0.04] hover:bg-black/[0.08]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M12.5 4L6.5 10L12.5 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1
          id="country-heading"
          className="text-[24px] leading-[32px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Select country
        </h1>
        <Link
          href="/"
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-[16px] hover:bg-black/[0.04]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </header>

      <form
        onSubmit={handleContinue}
        className="flex w-full flex-col items-center gap-7"
      >
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="country-search"
            className="flex items-center gap-2 rounded-[12px] bg-black/[0.04] px-3 py-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden
              className="shrink-0 text-black/40"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
            <input
              id="country-search"
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[14px] leading-[20px] text-black outline-none placeholder:text-black/20"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            />
          </label>

          <ul
            role="listbox"
            aria-label="Countries"
            className="flex max-h-[360px] flex-col overflow-y-auto"
          >
            {filtered.length === 0 && (
              <li className="px-2 py-3 text-[14px] leading-[20px] text-black/40">
                No countries match &ldquo;{query}&rdquo;.
              </li>
            )}
            {filtered.map((country, i) => {
              const isSelected = country.code === selectedCode;
              return (
                <li key={country.code} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => setSelectedCode(country.code)}
                    className={`flex w-full items-center gap-2 rounded-[8px] px-2 py-2 text-left hover:bg-black/[0.02] ${
                      isSelected ? "ring-[0.5px] ring-black/40" : ""
                    }`}
                  >
                    <span
                      className="flex-1 text-[14px] leading-[20px] text-black"
                      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
                    >
                      {country.flag} {country.name} {country.dial}
                    </span>
                    {isSelected && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden
                        className="shrink-0 text-[#16a34a]"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                      </svg>
                    )}
                  </button>
                  {i === 0 && filtered.length > 1 && (
                    <div className="my-1 h-px w-full bg-black/10" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <Button
          type="submit"
          size="large"
          variant="filled"
          radius={16}
          className="w-[313px]"
        >
          Continue
        </Button>
      </form>
    </section>
  );
}

function CountryCardSkeleton() {
  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center gap-7 rounded-[32px] bg-white p-6"
      aria-hidden
    >
      <div className="h-[560px] w-full" />
    </section>
  );
}
