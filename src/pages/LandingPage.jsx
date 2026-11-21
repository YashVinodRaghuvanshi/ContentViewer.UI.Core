
import React from "react";
import { Link } from "react-router-dom";
import imgPAth from '/images/exploreexcel-workspace.PNG'
const Icon = ({ children, className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const features = [
  {
    title: "Explore with ease",
    desc: "Turn your Excel workbook into a clean, interactive data workspace.",
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18M15 3v18"/></>,
  },
  {
    title: "Find anything faster",
    desc: "Search records, sort columns and filter the information you need.",
    icon: <><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></>,
  },
  {
    title: "Your own workspace",
    desc: "Rearrange columns, select records and customize your data view.",
    icon: <><path d="M4 5h16M4 12h16M4 19h16"/><path d="M9 3v4M15 10v4M7 17v4"/></>,
  },
  {
    title: "Multiple worksheets",
    desc: "Move between the different worksheets inside your workbook.",
    icon: <><rect x="3" y="5" width="13" height="15" rx="2"/><path d="M8 5V3h11a2 2 0 0 1 2 2v12h-5"/></>,
  },
  {
    title: "Detailed records",
    desc: "Select rows and inspect individual records whenever you need.",
    icon: <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></>,
  },
  {
    title: "Export your workspace",
    desc: "Keep a copy of your customized workspace for future use.",
    icon: <><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 17v3h14v-3"/></>,
  },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-[#FAFCF9] text-[#17251B]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-green-900/10 bg-[#FAFCF9]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532D] text-white">
              <Icon className="w-6 h-6">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M3 9h18M9 9v12M15 9v12"/>
              </Icon>
            </div>

            <span className="text-lg font-extrabold tracking-tight">
              Explore<span className="text-[#15803D]">ExcelSheet</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-[#66736A] hover:text-[#15803D]">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-[#66736A] hover:text-[#15803D]">
              How it works
            </a>
            <a href="#privacy" className="text-sm text-[#66736A] hover:text-[#15803D]">
              Privacy
            </a>
          </div>

          <Link
            to="/upload"
            className="rounded-lg bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#14532D]"
          >
            Get Started <span className="ml-1">↗</span>
          </Link>

        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">

        <div className="pointer-events-none absolute -right-48 -top-40 h-[550px] w-[550px] rounded-full bg-[#DCFCE7]/80 blur-[100px]"/>
        <div className="pointer-events-none absolute -left-48 top-64 h-[400px] w-[400px] rounded-full bg-[#ECFDF3] blur-[100px]"/>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

          {/* HERO TEXT */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-semibold text-[#15803D] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#16A34A]"/>
              A better way to work with Excel
            </div>

            <h1 className="mt-8 max-w-2xl text-5xl font-extrabold leading-[1.12] tracking-tight text-[#17351F] sm:text-6xl lg:text-[68px]">
              Make your data
              <br/>
              <span className="text-[#16A34A]">work for you.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#718078] sm:text-lg">
              Your Excel workbook deserves more than rows and columns.
              Discover a simpler way to search, organize and explore your data.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">

              <Link
                to="/upload"
                className="rounded-xl bg-[#15803D] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-1 hover:bg-[#14532D]"
              >
                Explore Your Data <span className="ml-2">→</span>
              </Link>

              <a
                href="#features"
                className="px-4 py-4 text-sm font-semibold text-[#355540] transition hover:text-[#16A34A]"
              >
                Discover features
              </a>

            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#718078]">

              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-[#16A34A]">
                  <path d="m5 12 4 4L19 6"/>
                </Icon>
                Excel workbook support
              </span>

              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-[#16A34A]">
                  <path d="m5 12 4 4L19 6"/>
                </Icon>
                Browser-based
              </span>

            </div>
          </div>

          {/* REAL APPLICATION SCREENSHOT */}
          <div className="relative mx-auto w-full max-w-[750px]">

            <div className="absolute -inset-6 rounded-[2rem] bg-[#DCFCE7]/70 blur-3xl"/>

            <div className="relative rounded-2xl border border-green-900/10 bg-white p-2 shadow-2xl shadow-green-950/10 sm:p-3">

              <img
                src={imgPAth}
                alt="ExploreExcelSheet data exploration workspace"
                className="block h-auto w-full rounded-xl"
              />

            </div>

            {/* FLOATING CARD */}
            <div className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-green-900/10 bg-white p-4 shadow-xl sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#15803D]">
                  <Icon>
                    <path d="m5 12 4 4L19 6"/>
                  </Icon>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#294832]">
                    Simple. Organized.
                  </p>
                  <p className="mt-1 text-[10px] text-[#94A39A]">
                    Your data, your way.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-y border-green-900/10 bg-[#F0F8F0] px-5 py-9 sm:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

          <p className="text-sm font-semibold text-[#355540]">
            Everything you need to explore your Excel workbook.
          </p>

          <span className="rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-semibold text-[#15803D]">
            Built for spreadsheet exploration
          </span>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-5 py-24 sm:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A34A]">
                Made for everyday work
              </p>

              <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#17351F] sm:text-5xl">
                Everything in
                <br/>
                its right place.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#718078]">
                The tools you need to make spreadsheet exploration feel
                natural, organized and effortless.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-green-900/10 bg-white p-6 transition hover:border-[#86C99B] hover:bg-[#F5FBF5]"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7EC] text-[#15803D] transition group-hover:bg-[#15803D] group-hover:text-white">
                      <Icon>{feature.icon}</Icon>
                    </div>

                    <span className="text-xs font-bold text-[#C3D6C7]">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mt-6 font-bold text-[#294832]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-[#84948A]">
                    {feature.desc}
                  </p>

                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#F0F8F0] px-5 py-24 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-xl text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A34A]">
              A simple journey
            </p>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[#17351F] sm:text-5xl">
              Three steps. That's all.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#718078]">
              No complicated setup. Just bring your workbook and start exploring.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            {[
              ["01", "Upload", "Choose an Excel workbook from your device."],
              ["02", "Explore", "Search, filter, sort and customize your records."],
              ["03", "Organize", "Manage your workspace and export your work."],
            ].map(([num, title, desc]) => (

              <div
                key={num}
                className="rounded-2xl border border-green-900/10 bg-white p-8"
              >

                <span className="text-4xl font-black text-[#D7ECDD]">
                  {num}
                </span>

                <h3 className="mt-5 text-xl font-bold text-[#294832]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#84948A]">
                  {desc}
                </p>

              </div>

            ))}

          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="px-5 py-24 sm:px-8">

        <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-[28px] bg-[#173F26] p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16">

          <div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A7E3B5]">
              Privacy matters
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
              Your files stay close to you.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-8 text-green-100/70">
              Excel spreadsheet contents are processed in your browser.
              Workspace information can be stored locally in your browser
              so you can continue your work.
            </p>

            <Link
              to="/upload"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#B7EAC2] hover:text-white"
            >
              Explore your workspace <span>→</span>
            </Link>

          </div>

          <div className="space-y-4">

            {[
              ["Browser-side processing", "Your spreadsheet contents are handled in your browser."],
              ["Local workspace storage", "Workspace information can persist using browser storage."],
              ["Workspace export", "Export a copy of your customized workspace."],
            ].map(([title, desc], index) => (

              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5"
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#287A43] text-white">

                  <Icon>
                    {index === 0 ? (
                      <>
                        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </>
                    ) : index === 1 ? (
                      <>
                        <ellipse cx="12" cy="5" rx="8" ry="3"/>
                        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/>
                      </>
                    ) : (
                      <>
                        <path d="M12 3v12m-5-5 5 5 5-5"/>
                        <path d="M5 17v3h14v-3"/>
                      </>
                    )}
                  </Icon>

                </div>

                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-green-100/60">
                    {desc}
                  </p>
                </div>

              </div>

            ))}

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-24 sm:px-8">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#DCFCE7] px-7 py-16 text-center sm:px-12">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#15803D]">
            Ready when you are
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-[#17351F] sm:text-5xl">
            Give your spreadsheets a fresh perspective.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#56725D]">
            Upload your Excel workbook and discover a better way to explore your data.
          </p>

          <Link
            to="/upload"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-1 hover:bg-[#14532D]"
          >
            Start Exploring <span>→</span>
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-green-900/10 bg-white px-5 py-9 sm:px-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">

          <div>
            <Link
              to="/"
              className="text-lg font-extrabold tracking-tight text-[#17351F]"
            >
              Explore<span className="text-[#15803D]">ExcelSheet</span>
            </Link>

            <p className="mt-2 text-xs text-[#84948A]">
              Make your data work for you.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-[#718078]">
            <a href="#features" className="hover:text-[#15803D]">Features</a>
            <a href="#how-it-works" className="hover:text-[#15803D]">How it works</a>
            <a href="#privacy" className="hover:text-[#15803D]">Privacy</a>
            <Link to="/upload" className="hover:text-[#15803D]">Get started</Link>
          </div>

        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-green-900/10 pt-6 text-xs text-[#A0ACA3]">
          © {new Date().getFullYear()} ExploreExcelSheet. All rights reserved.
        </div>

      </footer>

    </main>
  );
};

export default LandingPage;
