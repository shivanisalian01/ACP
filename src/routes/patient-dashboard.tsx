import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bell,
  ClipboardList,
  FileText,
  ChevronRight,
  Sparkles,
  FilePlus2,
  Circle,
  CheckCircle2,
  Mic,
  Send,
  Menu,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { MotionCard } from "@/components/motion-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  patientUser,
  patientSummary,
  acpSections,
  patientTimeline,
  chatMessages,
  type SummaryStat,
} from "@/lib/mock/patient";

export const Route = createFileRoute("/patient-dashboard")({
  head: () => ({
    meta: [
      { title: "Patient Dashboard — ACP Care" },
      {
        name: "description",
        content:
          "Track your Advance Care Planning progress, generate documents, and chat with the ACP assistant.",
      },
    ],
  }),
  component: PatientDashboard,
});

function PatientDashboard() {
  return (
    <div className="flex min-h-screen w-full bg-surface">
      <AppSidebar role="patient" user={patientUser} />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-5 py-6 lg:px-8 lg:py-8">
          <PageHeader />

          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {patientSummary.map((s, i) => (
              <SummaryCard key={s.title} {...s} delay={i * 0.04} />
            ))}
          </section>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="flex flex-col gap-6">
              <ProgressTracker />
              <ChatCard />
            </div>
            <aside className="flex flex-col gap-6">
              <DocumentsCard />
              <TimelineCard />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileHeader() {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white/80 px-5 py-3 backdrop-blur lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0">
          <AppSidebar role="patient" user={patientUser} />
        </SheetContent>
      </Sheet>
      <div className="text-sm font-semibold">ACP Care</div>
      <Button variant="ghost" size="icon" className="rounded-xl">
        <Bell className="h-5 w-5" />
      </Button>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome, {patientUser.greetingName} <span className="inline-block"></span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Start your Advance Care Planning journey whenever you're ready.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge
          variant="outline"
          className="hidden rounded-full border-border bg-white px-3 py-1 text-[11px] font-medium text-muted-foreground sm:inline-flex"
        >
          No recent updates
        </Badge>
        <Button variant="outline" size="icon" className="hidden rounded-xl lg:inline-flex">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

function SummaryCard({
  title,
  value,
  caption,
  icon: Icon,
  progress,
  delay = 0,
}: SummaryStat & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_16px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)]"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </div>
          <div className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</div>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {progress !== undefined && (
        <div className="mt-3">
          <Progress value={progress} className="h-1.5" />
        </div>
      )}
      <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{caption}</p>
    </motion.div>
  );
}

function ProgressTracker() {
  const totalQuestions = acpSections.reduce((sum, s) => sum + s.questions, 0);
  return (
    <MotionCard className="p-0">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-6">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-foreground">ACP Progress Tracker</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {acpSections.length} sections • {totalQuestions} questions total
          </p>
        </div>
        <Button className="h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Sparkles className="mr-2 h-4 w-4" /> Start ACP
        </Button>
      </div>
      <div className="divide-y divide-border">
        {acpSections.map((s, i) => (
          <motion.button
            key={s.n}
            type="button"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
            whileHover={{ backgroundColor: "rgba(15,157,154,0.04)" }}
            className="group flex w-full items-center gap-4 px-6 py-4 text-left"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface text-sm font-semibold text-muted-foreground">
              {s.n}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-foreground">{s.title}</span>
                <Badge className="rounded-full border border-warning/25 bg-warning/10 px-2 py-0 text-[10px] font-semibold text-warning">
                  Pending
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={0} className="h-1.5 w-40" />
                <span className="text-[11px] text-muted-foreground">{s.questions} questions</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        ))}
      </div>
    </MotionCard>
  );
}

function DocumentsCard() {
  return (
    <MotionCard>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">ACP Documents</h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Living Will & directives</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 rounded-lg border-primary/30 text-xs font-medium text-primary hover:bg-primary/5"
        >
          <FilePlus2 className="mr-1 h-3.5 w-3.5" /> Generate
        </Button>
      </div>
      <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-4 py-8 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <FileText className="h-6 w-6" />
        </div>
        <div className="mt-4 text-sm font-semibold text-foreground">No documents yet</div>
        <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
          Complete ACP sections to generate your Living Will.
        </p>
      </div>
    </MotionCard>
  );
}

function TimelineCard() {
  return (
    <MotionCard>
      <h3 className="text-sm font-bold text-foreground">Activity Timeline</h3>
      <p className="mt-0.5 text-[11px] text-muted-foreground">Recent ACP activity</p>
      {patientTimeline.length === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-4 py-8 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="mt-3 text-sm font-semibold text-foreground">No activity yet</div>
          <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
            Your recent ACP actions will appear here.
          </p>
        </div>
      ) : (
        <ol className="mt-5 space-y-4">
          {patientTimeline.map((t, i) => (
            <li key={i} className="relative flex gap-3 pl-1">
              <div className="flex flex-col items-center">
                {t.state === "done" ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : t.state === "active" ? (
                  <div className="grid h-5 w-5 place-items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
                  </div>
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground/40" />
                )}
                {i < patientTimeline.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
              </div>
              <div className="pb-1">
                <div className="text-sm font-medium text-foreground">{t.title}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{t.meta}</div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </MotionCard>
  );
}

function ChatCard() {
  const [messages] = useState(chatMessages);
  const [draft, setDraft] = useState("");

  return (
    <MotionCard className="p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">ACP Assistant</div>
            <div className="text-[11px] text-muted-foreground">
              Current Section · <span className="text-primary">Not started</span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="rounded-full border-primary/25 bg-primary/5 text-[10px] font-semibold text-primary">
          Ready
        </Badge>
      </div>

      <div className="max-h-[360px] space-y-4 overflow-y-auto px-5 py-6">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[78%] rounded-[20px] px-4 py-3 text-sm leading-relaxed shadow-sm",
                m.from === "user"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-surface text-foreground",
              )}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDraft("");
          }}
          className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2"
        >
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-white hover:text-foreground"
            aria-label="Voice input"
          >
            <Mic className="h-4 w-4" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your response or use the microphone..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:scale-105 hover:bg-primary/90"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Responses are securely stored and encrypted end-to-end.
        </p>
      </div>
    </MotionCard>
  );
}

// Keep Link import used
void Link;
