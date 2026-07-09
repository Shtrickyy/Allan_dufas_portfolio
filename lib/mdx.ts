import "server-only";

import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { Experiment, ExperimentStage } from "@/types/experiment";
import { toExperimentSummary } from "@/types/experiment";
import type { Principle, PrinciplesDocument } from "@/types/principle";
import type { System } from "@/types/system";
import { toSystemIndexCard, toSystemSummary } from "@/types/system";
import type { ThinkingArticle } from "@/types/thinking";
import { toThinkingSummary } from "@/types/thinking";

import { resolveCoverImage } from "@/lib/public-image";

const CONTENT_DIR = path.join(process.cwd(), "content");
const SYSTEMS_DIR = path.join(CONTENT_DIR, "systems");
const EXPERIMENTS_DIR = path.join(CONTENT_DIR, "experiments");
const THINKING_DIR = path.join(CONTENT_DIR, "thinking");
const PRINCIPLES_PATH = path.join(CONTENT_DIR, "principles.json");

const EXPERIMENT_STAGES: ExperimentStage[] = [
  "Concept",
  "Prototype",
  "Planned",
];

function readMdxFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
}

function parseRequiredString(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
): string {
  const value = data[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing or invalid "${key}" in ${filePath}`);
  }

  return value;
}

function parseOptionalString(
  data: Record<string, unknown>,
  key: string,
): string | null {
  const value = data[key];

  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== "string") {
    throw new Error(`Invalid "${key}": expected string or null`);
  }

  return value;
}

function parseStringArray(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
): string[] {
  const value = data[key];

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Missing or invalid "${key}" array in ${filePath}`);
  }

  return value;
}

function parseNumber(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
): number {
  const value = data[key];

  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Missing or invalid "${key}" in ${filePath}`);
  }

  return value;
}

function parseProofChips(
  data: Record<string, unknown>,
  filePath: string,
): System["previewProofChips"] {
  const value = data.previewProofChips;

  if (!Array.isArray(value)) {
    throw new Error(`Missing or invalid "previewProofChips" in ${filePath}`);
  }

  return value.map((chip, index) => {
    if (
      typeof chip !== "object" ||
      chip === null ||
      typeof (chip as { label?: unknown }).label !== "string"
    ) {
      throw new Error(
        `Invalid previewProofChips[${index}] in ${filePath}: expected { label: string }`,
      );
    }

    return { label: (chip as { label: string }).label };
  });
}

function parseGallery(
  data: Record<string, unknown>,
  filePath: string,
): System["gallery"] {
  const value = data.gallery;

  if (!Array.isArray(value)) {
    throw new Error(`Missing or invalid "gallery" in ${filePath}`);
  }

  return value.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid gallery[${index}] in ${filePath}`);
    }

    const image = item as Record<string, unknown>;
    const src = image.src;
    const alt = image.alt;
    const caption = image.caption;
    const width = image.width;
    const height = image.height;

    if (typeof src !== "string" || typeof alt !== "string") {
      throw new Error(
        `Invalid gallery[${index}] in ${filePath}: src and alt are required strings`,
      );
    }

    if (typeof width !== "number" || typeof height !== "number") {
      throw new Error(
        `Invalid gallery[${index}] in ${filePath}: width and height are required numbers`,
      );
    }

    return {
      src,
      alt,
      caption: typeof caption === "string" ? caption : "",
      width,
      height,
    };
  });
}

function parseSystemFile(fileName: string): System {
  const filePath = path.join(SYSTEMS_DIR, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const slugFromFile = fileName.replace(/\.mdx$/, "");
  const slug = parseRequiredString(data, "slug", filePath);

  if (slug !== slugFromFile) {
    throw new Error(
      `Slug mismatch in ${filePath}: frontmatter slug "${slug}" does not match filename "${slugFromFile}"`,
    );
  }

  return {
    slug,
    title: parseRequiredString(data, "title", filePath),
    subtitle: parseRequiredString(data, "subtitle", filePath),
    tagline: parseRequiredString(data, "tagline", filePath),
    status: parseRequiredString(data, "status", filePath),
    stack: parseStringArray(data, "stack", filePath),
    liveUrl: parseOptionalString(data, "liveUrl"),
    repositoryUrl: parseOptionalString(data, "repositoryUrl"),
    coverImage: parseRequiredString(data, "coverImage", filePath),
    previewProofChips: parseProofChips(data, filePath),
    gallery: parseGallery(data, filePath),
    resultsSummary: parseRequiredString(data, "resultsSummary", filePath),
    order: parseNumber(data, "order", filePath),
    content: content.trim(),
  };
}

function parseExperimentFile(fileName: string): Experiment {
  const filePath = path.join(EXPERIMENTS_DIR, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const slugFromFile = fileName.replace(/\.mdx$/, "");
  const slug = parseRequiredString(data, "slug", filePath);

  if (slug !== slugFromFile) {
    throw new Error(
      `Slug mismatch in ${filePath}: frontmatter slug "${slug}" does not match filename "${slugFromFile}"`,
    );
  }

  const stage = parseRequiredString(data, "stage", filePath);

  if (!EXPERIMENT_STAGES.includes(stage as ExperimentStage)) {
    throw new Error(
      `Invalid stage "${stage}" in ${filePath}. Expected one of: ${EXPERIMENT_STAGES.join(", ")}`,
    );
  }

  return {
    slug,
    title: parseRequiredString(data, "title", filePath),
    tagline: parseRequiredString(data, "tagline", filePath),
    summary: parseRequiredString(data, "summary", filePath),
    description: parseRequiredString(data, "description", filePath),
    stage: stage as ExperimentStage,
    order: parseNumber(data, "order", filePath),
    content: content.trim(),
  };
}

function parseThinkingFile(fileName: string): ThinkingArticle {
  const filePath = path.join(THINKING_DIR, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const slugFromFile = fileName.replace(/\.mdx$/, "");
  const slug = parseRequiredString(data, "slug", filePath);

  if (slug !== slugFromFile) {
    throw new Error(
      `Slug mismatch in ${filePath}: frontmatter slug "${slug}" does not match filename "${slugFromFile}"`,
    );
  }

  return {
    slug,
    title: parseRequiredString(data, "title", filePath),
    date: parseRequiredString(data, "date", filePath),
    excerpt: parseRequiredString(data, "excerpt", filePath),
    content: content.trim(),
  };
}

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function getAllSystems(): System[] {
  return sortByOrder(readMdxFiles(SYSTEMS_DIR).map(parseSystemFile));
}

export function getSystemBySlug(slug: string): System | null {
  const filePath = path.join(SYSTEMS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseSystemFile(`${slug}.mdx`);
}

export function getSystemSummaries() {
  return getAllSystems().map(toSystemSummary);
}

export function getSystemIndexCards() {
  return getAllSystems().map((system) => ({
    ...toSystemIndexCard(system),
    ...resolveCoverImage(system.coverImage),
  }));
}

export function getAllExperiments(): Experiment[] {
  return sortByOrder(readMdxFiles(EXPERIMENTS_DIR).map(parseExperimentFile));
}

export function getExperimentBySlug(slug: string): Experiment | null {
  const filePath = path.join(EXPERIMENTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseExperimentFile(`${slug}.mdx`);
}

export function getExperimentSummaries() {
  return getAllExperiments().map(toExperimentSummary);
}

export function getAllThinking(): ThinkingArticle[] {
  return readMdxFiles(THINKING_DIR)
    .map(parseThinkingFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getThinkingBySlug(slug: string): ThinkingArticle | null {
  const filePath = path.join(THINKING_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseThinkingFile(`${slug}.mdx`);
}

export function getThinkingSlugs(): string[] {
  return getAllThinking().map((article) => article.slug);
}

export function getThinkingSummaries() {
  return getAllThinking().map(toThinkingSummary);
}

export function getPrinciples(): Principle[] {
  const fileContents = fs.readFileSync(PRINCIPLES_PATH, "utf8");
  const parsed = JSON.parse(fileContents) as PrinciplesDocument;

  if (!Array.isArray(parsed.principles)) {
    throw new Error('Invalid principles.json: expected a "principles" array');
  }

  return parsed.principles.map((principle, index) => {
    if (
      typeof principle.number !== "string" ||
      typeof principle.statement !== "string" ||
      typeof principle.support !== "string" ||
      typeof principle.source !== "string"
    ) {
      throw new Error(`Invalid principle at index ${index} in principles.json`);
    }

    return principle;
  });
}
