import {
  ClipboardList,
  FileText,
  ListChecks,
  ShieldCheck,
  Clock3,
  type LucideIcon,
} from "lucide-react";

export type PatientUser = {
  name: string;
  email: string;
  initial: string;
  greetingName: string;
};

export const patientUser: PatientUser = {
  name: "Guest User",
  email: "guest@acpcare.app",
  initial: "G",
  greetingName: "there",
};

export type SummaryStat = {
  title: string;
  value: string;
  caption: string;
  icon: LucideIcon;
  progress?: number;
};

export const patientSummary: SummaryStat[] = [
  {
    title: "ACP Completion",
    value: "0%",
    caption: "Start your ACP journey",
    icon: ClipboardList,
    progress: 0,
  },
  {
    title: "Documents Generated",
    value: "0",
    caption: "Complete ACP to generate",
    icon: FileText,
  },
  {
    title: "Sections Remaining",
    value: "6",
    caption: "All sections pending",
    icon: ListChecks,
  },
  {
    title: "Doctor Access",
    value: "Not Assigned",
    caption: "No doctor assigned yet",
    icon: ShieldCheck,
  },
  {
    title: "Last Activity",
    value: "—",
    caption: "No activity yet",
    icon: Clock3,
  },
];

export type AcpSection = { n: number; title: string; questions: number };

export const acpSections: AcpSection[] = [
  { n: 1, title: "Personal Information", questions: 5 },
  { n: 2, title: "Medical Treatment Preferences", questions: 6 },
  { n: 3, title: "End-of-Life Preferences", questions: 4 },
  { n: 4, title: "Proxy Decision Maker", questions: 4 },
  { n: 5, title: "Organ Donation", questions: 4 },
  { n: 6, title: "Confirmation & Review", questions: 4 },
];

export type TimelineEntry = {
  title: string;
  meta: string;
  state: "done" | "active" | "pending";
};

export const patientTimeline: TimelineEntry[] = [];

export type ChatMessage = { from: "bot" | "user"; text: string };

export const chatMessages: ChatMessage[] = [
  {
    from: "bot",
    text: "Welcome to ACP Care. When you're ready, we'll begin with your personal information to help draft your Advance Care Plan.",
  },
];
