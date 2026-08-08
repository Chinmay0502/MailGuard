import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ChartNoAxesCombined,
  CheckCircle2,
  Clock3,
  Cpu,
  Mail,
  ScanSearch,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "GRU Intelligence",
      text: "A trained GRU neural network analyzes the language and patterns inside every submitted email.",
    },
    {
      icon: Zap,
      title: "Instant Detection",
      text: "Get a spam or legitimate prediction with model confidence within seconds.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Detailed Analytics",
      text: "Review historical classifications and understand how your email activity changes over time.",
    },
    {
      icon: ShieldCheck,
      title: "Threat Detection",
      text: "Identify suspicious language patterns commonly associated with unwanted messages.",
    },
    {
      icon: Clock3,
      title: "History Tracking",
      text: "Every classification can be stored and reviewed through your analytics dashboard.",
    },
    {
      icon: ScanSearch,
      title: "Simple Analysis",
      text: "Paste an email, start the scan and let the machine learning model analyze it.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: Mail,
      title: "Paste your email",
      text: "Copy the suspicious message and place it inside the email checker.",
    },
    {
      number: "02",
      icon: Cpu,
      title: "AI analyzes it",
      text: "The backend sends the email to the trained GRU model for classification.",
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Get your result",
      text: "Receive the prediction, confidence score and store the result in your history.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative flex min-h-screen items-center">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-32 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
              <Sparkles size={15} />

              <span>AI-Powered Email Security</span>

              <span className="ml-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Detect
              <span className="text-cyan-400"> Spam.</span>
              <br />
              Protect Your
              <span className="text-cyan-400"> Inbox.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              Analyze suspicious emails using an intelligent GRU-based
              machine learning model and instantly determine whether an
              email is legitimate or spam.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/checker"
                className="group flex items-center gap-3 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Analyze an Email

                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/history"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                View Analytics
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-7 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                GRU powered
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Instant analysis
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                History tracking
              </div>
            </div>
          </motion.div>

          {/* AI Visualization */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-cyan-500/20 blur-3xl" />

            <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/10 bg-slate-900/80 p-7 shadow-2xl backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    AI Analysis
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Email Scanner
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <Brain />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  ["Email Content", "Analyzed"],
                  ["Threat Patterns", "Detected"],
                  ["ML Confidence", "98.4%"],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.5 + index * 0.15,
                    }}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <span className="text-sm text-slate-400">
                      {label}
                    </span>

                    <span className="text-sm font-semibold text-cyan-400">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-cyan-400/10 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-cyan-400" />

                  <div>
                    <p className="font-semibold">
                      Protection Active
                    </p>

                    <p className="text-xs text-slate-500">
                      GRU model successfully analyzed the message
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Machine learning service online
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          TRUST / STATS STRIP
      ========================================================== */}

      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-white/5 px-6 md:grid-cols-4 md:divide-x">
          {[
            ["98%+", "Model accuracy"],
            ["GRU", "Deep learning model"],
            ["Real-time", "Email classification"],
            ["MongoDB", "Prediction history"],
          ].map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="px-6 py-8 text-center"
            >
              <p className="text-2xl font-black text-cyan-400">
                {value}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Simple workflow
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              From suspicious email to answer
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              The entire process is designed to make email classification
              quick, understandable and easy to use.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  whileHover={{ y: -7 }}
                  className="relative rounded-3xl border border-white/10 bg-white/[0.025] p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                      <Icon size={23} />
                    </div>

                    <span className="text-sm font-black text-slate-700">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {step.text}
                  </p>

                  {index !== steps.length - 1 && (
                    <div className="absolute -right-3 top-12 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-slate-950 text-cyan-400 md:flex">
                      <ArrowRight size={13} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================== */}

      <section className="border-y border-white/5 bg-slate-900/40 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Intelligent Protection
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Built for smarter email security
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              A complete system combining machine learning, an API
              backend and a modern analytics dashboard.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          AI / GRU SECTION
      ========================================================== */}

      <section className="relative py-28">
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[130px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
              <Brain size={28} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Behind the detection
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Machine learning that understands email patterns.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Your trained GRU model processes the text of an email and
              produces a classification probability. The application then
              turns that prediction into a clear result that users can
              understand.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Text preprocessing",
                "Sequence-based neural network analysis",
                "Spam probability estimation",
                "Prediction history storage",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-cyan-400"
                  />

                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-600">
                    Neural analysis
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    Prediction confidence
                  </h3>
                </div>

                <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400">
                  <TrendingUp size={21} />
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-black">
                    98.4%
                  </span>

                  <span className="text-sm text-emerald-400">
                    High confidence
                  </span>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "98.4%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="h-full rounded-full bg-cyan-400"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-5">
                  <p className="text-xs text-slate-600">
                    Classification
                  </p>

                  <p className="mt-2 text-xl font-bold text-red-400">
                    Spam
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-5">
                  <p className="text-xs text-slate-600">
                    Model
                  </p>

                  <p className="mt-2 text-xl font-bold text-cyan-400">
                    GRU
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          ANALYTICS PREVIEW
      ========================================================== */}

      <section className="bg-slate-900/40 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Your security dashboard
              </p>

              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                Turn predictions into useful insights.
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                Don't just classify emails. Understand your classification
                history through statistics, detection distribution,
                confidence scores and recent activity.
              </p>

              <Link
                to="/history"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                Explore Analytics

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Total Scans", "1,284"],
                  ["Spam", "342"],
                  ["Ham", "942"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                  >
                    <p className="text-xs text-slate-600">
                      {label}
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      Detection activity
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Recent classification trend
                    </p>
                  </div>

                  <ChartNoAxesCombined
                    size={20}
                    className="text-cyan-400"
                  />
                </div>

                <div className="mt-8 flex h-36 items-end gap-2">
                  {[35, 52, 42, 72, 55, 85, 63, 94, 70, 80, 58, 90].map(
                    (height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.04,
                        }}
                        className="flex-1 rounded-t-lg bg-cyan-400/60"
                      />
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECURITY CTA
      ========================================================== */}

      <section className="relative py-28">
        <div className="absolute inset-x-0 top-1/2 mx-auto h-[350px] max-w-4xl -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl px-6"
        >
          <div className="rounded-[2rem] border border-cyan-400/10 bg-cyan-400/[0.035] p-10 text-center sm:p-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
              <Shield size={30} />
            </div>

            <h2 className="mt-7 text-4xl font-black sm:text-5xl">
              Think an email is suspicious?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
              Don't guess. Let the trained machine learning model analyze
              the message and give you a confidence-based prediction.
            </p>

            <Link
              to="/checker"
              className="group mx-auto mt-9 inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              Check an Email

              <ArrowRight
                size={19}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="border-t border-white/5 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <ShieldCheck size={22} />
                </div>

                <span className="text-xl font-black tracking-tight">
                  Mail<span className="text-cyan-400">Guard</span>
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
                An AI-powered email classification platform built around
                a trained GRU machine learning model.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                ML service operational
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Product
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-500">
                <Link
                  to="/checker"
                  className="block transition hover:text-cyan-400"
                >
                  Email Checker
                </Link>

                <Link
                  to="/history"
                  className="block transition hover:text-cyan-400"
                >
                  Analytics
                </Link>

                <Link
                  to="/history"
                  className="block transition hover:text-cyan-400"
                >
                  History
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Technology
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-500">
                <span className="block">GRU Neural Network</span>
                <span className="block">FastAPI ML Service</span>
                <span className="block">Node.js Backend</span>
                <span className="block">MongoDB Database</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Platform
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-500">
                <Link
                  to="/"
                  className="block transition hover:text-cyan-400"
                >
                  Home
                </Link>

                <Link
                  to="/checker"
                  className="block transition hover:text-cyan-400"
                >
                  Scan Email
                </Link>

                <Link
                  to="/history"
                  className="block transition hover:text-cyan-400"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/5 py-7 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} MailGuard. All rights reserved.
            </p>

            <div className="flex gap-6">
              <span>AI Email Security</span>
              <span>GRU Classification</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}