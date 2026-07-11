import {
  Users,
  ClipboardCheck,
  Loader2,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

export type DoctorUser = {
  name: string;
  email: string;
  initial: string;
};

export const doctorUser: DoctorUser = {
  name: "Dr. Placeholder",
  email: "doctor@acpcare.app",
  initial: "D",
};

export type DoctorStat = {
  title: string;
  value: string;
  desc: string;
  icon: LucideIcon;
  tone: "primary" | "success" | "info" | "danger";
};

export const doctorStats: DoctorStat[] = [
  { title: "Total Patients", value: "0", desc: "No patients assigned", icon: Users, tone: "primary" },
  { title: "ACPs Complete", value: "0", desc: "Awaiting submissions", icon: ClipboardCheck, tone: "success" },
  { title: "In Progress", value: "0", desc: "Awaiting more input", icon: Loader2, tone: "info" },
  { title: "High Priority", value: "0", desc: "No reviews pending", icon: AlertTriangle, tone: "danger" },
];

export type PatientStatus = "Completed" | "In Progress" | "Pending";
export type PatientPriority = "High" | "Medium" | "Low";

export type PatientRecord = {
  name: string;
  initial: string;
  age: number;
  completion: number;
  status: PatientStatus;
  priority: PatientPriority;
  updated: string;
};

export const patientRecords: PatientRecord[] = [
  { name: "Patient A", initial: "A", age: 68, completion: 0, status: "Pending", priority: "Low", updated: "—" },
  { name: "Patient B", initial: "B", age: 72, completion: 0, status: "Pending", priority: "Low", updated: "—" },
  { name: "Patient C", initial: "C", age: 65, completion: 0, status: "Pending", priority: "Low", updated: "—" },
  { name: "Patient D", initial: "D", age: 74, completion: 0, status: "Pending", priority: "Low", updated: "—" },
];

export const sectionCompletion = [
  { label: "Personal Information", value: 0 },
  { label: "Medical Preferences", value: 0 },
  { label: "End-of-Life", value: 0 },
  { label: "Proxy", value: 0 },
  { label: "Donation", value: 0 },
  { label: "Review", value: 0 },
];

export const priorityDistribution = {
  totalPatients: 0,
  completed: 0,
  pending: 0,
  high: 0,
};
