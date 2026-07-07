"use client";

import { useCallback } from "react";

import { HERO_INTRO_STORAGE_KEY } from "@/lib/motion";

export function useHeroIntroSeen() {
  const readIntroSeen = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(HERO_INTRO_STORAGE_KEY) === "true";
    } catch {
      return true;
    }
  }, []);

  const markIntroSeen = useCallback(() => {
    try {
      sessionStorage.setItem(HERO_INTRO_STORAGE_KEY, "true");
    } catch {
      // Ignore storage failures — treat as seen for this session.
    }
  }, []);

  return { readIntroSeen, markIntroSeen };
}
