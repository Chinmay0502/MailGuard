import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  // --------------------------------------------------
  // FETCH HISTORY
  // --------------------------------------------------

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/history`);

      if (!response.ok) {
        throw new Error(`History request failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch history");
      }

      setHistoryData(result.data || []);
      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      console.error("History fetch error:", err);
      setError("Unable to load history from the backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  // --------------------------------------------------
  // INITIAL LOAD + REAL-TIME POLLING
  // --------------------------------------------------

  useEffect(() => {
    fetchHistory();

    // Refresh every 3 seconds
    const interval = setInterval(() => {
      fetchHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchHistory]);

  // --------------------------------------------------
  // STATISTICS
  // --------------------------------------------------

  const statistics = useMemo(() => {
    const total = historyData.length;

    const spam = historyData.filter(
      (item) => item.prediction === "Spam"
    ).length;

    const ham = historyData.filter(
      (item) => item.prediction === "Ham"
    ).length;

    const avgConfidence =
      total > 0
        ? historyData.reduce(
            (sum, item) => sum + Number(item.probability || 0),
            0
          ) / total
        : 0;

    return {
      total,
      spam,
      ham,
      avgConfidence,
    };
  }, [historyData]);

  const spamPercentage =
    statistics.total > 0
      ? (statistics.spam / statistics.total) * 100
      : 0;

  const hamPercentage =
    statistics.total > 0
      ? (statistics.ham / statistics.total) * 100
      : 0;

  // --------------------------------------------------
  // DATE FORMATTER
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "";
    }

    return value.toLocaleString();
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Security Overview
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                History & Analytics
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                Monitor your email classification activity,
                understand detection patterns and review previous
                predictions.
              </p>
            </div>

            {/* LIVE STATUS */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                <span className="text-xs font-semibold text-emerald-400">
                  LIVE
                </span>
              </div>

              <button
                onClick={fetchHistory}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.07] disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>

          {lastUpdated && (
            <p className="mt-3 text-xs text-slate-600">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && historyData.length === 0 && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-slate-400">
            Loading classification history...
          </div>
        )}

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={Mail}
            title="Total Scans"
            value={statistics.total}
            description="Emails analyzed"
          />

          <StatCard
            icon={AlertTriangle}
            title="Spam Detected"
            value={statistics.spam}
            description={`${spamPercentage.toFixed(1)}% of scans`}
            danger
          />

          <StatCard
            icon={CheckCircle2}
            title="Ham Detected"
            value={statistics.ham}
            description={`${hamPercentage.toFixed(1)}% of scans`}
            success
          />

          <StatCard
            icon={TrendingUp}
            title="Avg. Confidence"
            value={`${statistics.avgConfidence.toFixed(1)}%`}
            description="Model confidence"
          />

        </div>

        {/* ANALYTICS */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">

          {/* DISTRIBUTION */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Detection Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Classification distribution
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="mt-10">

              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Email classification
                </span>

                <span className="text-slate-500">
                  {statistics.total} total
                </span>
              </div>

              {/* REAL DATA BAR */}
              <div className="flex h-8 overflow-hidden rounded-xl bg-white/5">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${hamPercentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="bg-emerald-400"
                />

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${spamPercentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="bg-red-400"
                />

              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                    <span className="text-sm text-slate-400">
                      Ham
                    </span>
                  </div>

                  <p className="mt-3 text-3xl font-black">
                    {statistics.ham}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Legitimate messages
                  </p>
                </div>

                <div className="rounded-2xl border border-red-400/10 bg-red-400/5 p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />

                    <span className="text-sm text-slate-400">
                      Spam
                    </span>
                  </div>

                  <p className="mt-3 text-3xl font-black">
                    {statistics.spam}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Suspicious messages
                  </p>
                </div>

              </div>
            </div>
          </motion.section>

          {/* MODEL */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <ShieldCheck />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Model Performance
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Current classification system based on your trained
              GRU model.
            </p>

            <div className="mt-7 space-y-4">

              <Metric label="Model" value="GRU" />

              <Metric label="Test Accuracy" value="98.43%" />

              <Metric label="Spam Precision" value="99%" />

              <Metric label="Spam Recall" value="98%" />

              <Metric label="Spam F1 Score" value="99%" />

            </div>
          </motion.section>

        </div>

        {/* RECENT SCANS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <div className="mb-7 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold">
                Recent Scans
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest email classification activity
              </p>
            </div>

            <Clock3
              size={20}
              className="text-slate-600"
            />

          </div>

          {historyData.length === 0 && !loading ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
              <Mail className="mx-auto text-slate-600" size={32} />

              <p className="mt-4 text-slate-400">
                No emails have been analyzed yet.
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Your classification history will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">

              {historyData.map((item, index) => {
                const spam = item.prediction === "Spam";

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.03,
                    }}
                    className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 sm:flex-row sm:items-center"
                  >

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        spam
                          ? "bg-red-400/10 text-red-400"
                          : "bg-emerald-400/10 text-emerald-400"
                      }`}
                    >
                      {spam ? (
                        <AlertTriangle size={20} />
                      ) : (
                        <CheckCircle2 size={20} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-medium text-slate-300">
                        {item.email}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {formatDate(item.createdAt)}
                      </p>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="text-right">
                        <p className="text-xs text-slate-600">
                          Confidence
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {Number(item.probability).toFixed(2)}%
                        </p>
                      </div>

                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                          spam
                            ? "bg-red-400/10 text-red-400"
                            : "bg-emerald-400/10 text-emerald-400"
                        }`}
                      >
                        {item.prediction}
                      </span>

                    </div>

                  </motion.div>
                );
              })}

            </div>
          )}
        </motion.section>

        {/* ANALYSIS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <TrendingUp size={22} />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Automated Analysis
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-400">
                Your current scan history contains{" "}
                <span className="font-semibold text-white">
                  {statistics.spam} spam
                </span>{" "}
                and{" "}
                <span className="font-semibold text-white">
                  {statistics.ham} legitimate
                </span>{" "}
                messages. The model is currently showing an
                average confidence of{" "}
                <span className="font-semibold text-cyan-400">
                  {statistics.avgConfidence.toFixed(1)}%
                </span>
                .
              </p>

            </div>

          </div>
        </motion.section>

      </div>
    </main>
  );
}

// --------------------------------------------------
// STAT CARD
// --------------------------------------------------

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  danger,
  success,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="flex items-center justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            danger
              ? "bg-red-400/10 text-red-400"
              : success
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-cyan-400/10 text-cyan-400"
          }`}
        >
          <Icon size={21} />
        </div>

      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-600">
        {description}
      </p>

    </motion.div>
  );
}

// --------------------------------------------------
// METRIC
// --------------------------------------------------

function Metric({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-bold text-slate-200">
        {value}
      </span>
    </div>
  );
}