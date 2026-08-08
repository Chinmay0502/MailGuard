import { Link, NavLink } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              MailGuard
            </h1>
            <p className="text-xs text-slate-500">
              AI Spam Detection
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/checker"
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`
            }
          >
            Spam Checker
          </NavLink>

          {/* <NavLink
            to="/history"
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`
            }
          >
            History
          </NavLink> */}
        </div>

        <Link
          to="/checker"
          className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Check Email
        </Link>
      </div>
    </nav>
  );
}