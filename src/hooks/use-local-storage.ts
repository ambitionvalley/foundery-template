"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function notify(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribe(key: string) {
  return (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    let set = listeners.get(key);
    if (!set) {
      set = new Set();
      listeners.set(key, set);
    }
    set.add(onChange);
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) onChange();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      set!.delete(onChange);
      window.removeEventListener("storage", onStorage);
    };
  };
}

function readSnapshot<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? initialValue : (JSON.parse(raw) as T);
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore(
    subscribe(key),
    () => readSnapshot(key, initialValue),
    () => initialValue,
  );

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(readSnapshot(key, initialValue))
          : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Quota or privacy mode — drop silently.
      }
      notify(key);
    },
    [key, initialValue],
  );

  return [value, setValue];
}
