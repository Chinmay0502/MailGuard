import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { checkEmail } from "../services/api";

const examples = [
  "Hello, how are you? I hope you are doing well.",
  "Congratulations! You have won $1,000,000! Click here immediately to claim your prize!",
  "Hi John, I hope you are doing well. Let's meet tomorrow at 10 AM.",
];

export default function SpamChecker() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!email.trim()) {
      setError("Please enter an email message first.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await checkEmail(email);

      /*
       * Your backend may return slightly different names.
       * These fallbacks make the frontend easier to connect.
       */

      const prediction =
        data.prediction ??
        data.label ??
        data.result ??
        data.classification ??
        "Unknown";

      const probability =
        data.probability ??
        data.spam_probability ??
        data.confidence ??
        0;

      const numericProbability = Number(probability);

      setResult({
        prediction:
          typeof prediction === "string"
            ? prediction
            : String(prediction),
        probability:
          numericProbability <= 1
            ? numericProbability * 100
            : numericProbability,
        raw: data,
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to analyze the email. Make sure the backend and ML service are running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setResult(null);
    setError("");
  };

  const handleExample = (text) => {
    setEmail(text);
    setResult(null);
    setError("");
  };

  const isSpam =
    result &&
    result.prediction.toLowerCase().includes("spam");

  const isHam =
    result &&
    (result.prediction.toLowerCase().includes("ham") ||
      result.prediction.toLowerCase().includes("safe"));

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-20 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
            <ShieldCheck size={30} />
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            AI Spam Checker
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Paste an email below and let our GRU-powered model
            analyze its content for suspicious patterns.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Input card */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <Mail size={20} />
              </div>

              <div>
                <h2 className="font-bold">
                  Email Content
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the message you want to analyze
                </p>
              </div>
            </div>

            <textarea
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Paste your email message here..."
              className="min-h-[330px] w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
            />

            <div className="mt-3 flex justify-between text-xs text-slate-600">
              <span>
                {email.length} characters
              </span>

              <span>
                {email.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            {/* Examples */}

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Try an example
              </p>

              <div className="flex flex-wrap gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExample(example)}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}

            <div className="mt-6 flex gap-3">

              <button
                onClick={handleCheck}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Sparkles size={19} />
                    Analyze Email
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 font-semibold text-slate-300 transition hover:bg-white/[0.07]"
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline">
                  Reset
                </span>
              </button>

            </div>
          </motion.div>

          {/* Result */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative min-h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >

            <AnimatePresence mode="wait">

              {/* Empty */}

              {!loading && !result && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[450px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-400">
                    <ShieldCheck size={38} />
                  </div>

                  <h2 className="text-xl font-bold">
                    Ready to Scan
                  </h2>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                    Your analysis result will appear here after
                    the email has been processed.
                  </p>
                </motion.div>
              )}

              {/* Scanner */}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[450px] flex-col items-center justify-center"
                >

                  <div className="relative mb-10">
                    <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/10" />

                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5">
                      <Loader2
                        size={45}
                        className="animate-spin text-cyan-400"
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold">
                    Analyzing Email
                  </h2>

                  <p className="mt-3 text-sm text-slate-500">
                    GRU model is examining the message...
                  </p>

                  <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-full w-1/2 rounded-full bg-cyan-400"
                    />
                  </div>

                </motion.div>
              )}

              {/* Result */}

              {!loading && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >

                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Analysis Complete
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      Detection Result
                    </h2>
                  </div>

                  <div
                    className={`rounded-2xl border p-6 ${
                      isSpam
                        ? "border-red-400/20 bg-red-400/5"
                        : "border-emerald-400/20 bg-emerald-400/5"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                          isSpam
                            ? "bg-red-400/10 text-red-400"
                            : "bg-emerald-400/10 text-emerald-400"
                        }`}
                      >
                        {isSpam ? (
                          <AlertTriangle size={28} />
                        ) : (
                          <CheckCircle2 size={28} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Prediction
                        </p>

                        <h3
                          className={`text-2xl font-black ${
                            isSpam
                              ? "text-red-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {isSpam
                            ? "SPAM"
                            : isHam
                            ? "HAM"
                            : result.prediction.toUpperCase()}
                        </h3>
                      </div>

                    </div>
                  </div>

                  {/* Probability */}

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">

                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Model Confidence
                      </span>

                      <span className="font-bold text-cyan-400">
                        {result.probability.toFixed(2)}%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            result.probability,
                            100
                          )}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${
                          isSpam
                            ? "bg-red-400"
                            : "bg-emerald-400"
                        }`}
                      />
                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-600">
                      The probability represents the model's
                      confidence in the detected class.
                    </p>

                  </div>

                  {/* Details */}

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-xs text-slate-600">
                        Model
                      </p>

                      <p className="mt-1 font-semibold">
                        GRU
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-xs text-slate-600">
                        Status
                      </p>

                      <p className="mt-1 font-semibold text-cyan-400">
                        Analyzed
                      </p>
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </main>
  );
}