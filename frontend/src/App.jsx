import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home";
import SpamChecker from "./pages/SpamChecker";
import History from "./pages/History";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <AnimatePresence mode="wait">

        <Routes location={location} key={location.pathname}>

          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/checker"
            element={
              <PageTransition>
                <SpamChecker />
              </PageTransition>
            }
          />

          <Route
            path="/history"
            element={
              <PageTransition>
                <History />
              </PageTransition>
            }
          />

        </Routes>

      </AnimatePresence>

    </div>
  );
}