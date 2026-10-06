import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ArrowRight, BarChart3, BookOpen, BrainCircuit, Bookmark, Camera, CheckCircle2, Flame, GraduationCap, Home, Moon, NotebookPen, PencilRuler, Search, Sparkles, Sun, Target, Trophy, Users, Zap } from 'lucide-react';
import { badges, concepts, leaderboard, learningGaps, progressData, resources, student } from './data/mockData';

const studentNav = [
  { to: '/student', label: 'Overview', icon: Home },
  { to: '/student/assessment', label: 'Assessments', icon: NotebookPen },
  { to: '/student/gaps', label: 'Learning Gaps', icon: Target },
  { to: '/student/resources', label: 'Study Zone', icon: BookOpen },
  { to: '/student/practice', label: 'Practice', icon: PencilRuler },
  { to: '/student/progress', label: 'Progress', icon: BarChart3 },
  { to: '/student/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/student/bookmarks', label: 'Bookmarks', icon: Bookmark }
];

const teacherNav = [
  { to: '/teacher', label: 'Overview', icon: Home },
  { to: '/teacher/class', label: 'Class', icon: Users },
  { to: '/teacher/gaps', label: 'Learning Gaps', icon: Target },
  { to: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/teacher/insights', label: 'AI Insights', icon: Sparkles }
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const apply = (next: boolean) => {
    setDark(next);
    document.body.classList.toggle('dark', next);
    localStorage.setItem('learnlens-theme', next ? 'dark' : 'light');
  };

  return (
    <button type="button" onClick={() => apply(!dark)} className="button-secondary gap-2">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}

function AppShell({ title, navItems, children }: { title: string; navItems: typeof studentNav; children: React.ReactNode }) {
  return (
    <div className="app-shell flex min-h-screen">
      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg font-bold text-white">L</div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">LearnLens</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">AI learning gap detector</div>
          </div>
        </div>

        <div className="mb-5 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-500 text-sm font-bold text-white">RS</div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Rahul Sharma</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Student</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="rounded-xl bg-white p-2 dark:bg-slate-900"><div className="font-bold text-slate-900 dark:text-white">1240</div><div>XP</div></div>
            <div className="rounded-xl bg-white p-2 dark:bg-slate-900"><div className="font-bold text-slate-900 dark:text-white">🔥 7</div><div>Streak</div></div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <div className="mb-2 flex items-center gap-2 font-semibold text-slate-800 dark:text-white"><Zap size={16} className="text-violet-500" /> Daily Quest</div>
          Complete 2 concept checks for +40 XP.
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">{title}</div>
              <h1 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">LearnLens</h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button type="button" className="button-secondary">Logout</button>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: 'blue' | 'green' | 'amber' | 'purple' | 'red' }) {
  const palette = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200',
    green: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-200',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200',
    purple: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-200',
    red: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200'
  };

  return (
    <div className="card p-4">
      <div className={`inline-flex rounded-xl p-2 ${palette[accent || 'blue']}`}><Target size={16} /></div>
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="app-shell min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg font-bold text-white">L</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">LearnLens</div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="button-secondary">Login</Link>
            <Link to="/role" className="button-primary">Start Learning</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-200">
              <BrainCircuit size={14} /> AI-powered learning gap detector
            </div>
            <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-6xl dark:text-white">
              See what you know.<br />
              <span className="text-blue-600">Discover what you don’t.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">LearnLens identifies why a student missed a concept, maps the root misconception, and creates a personalized learning path to improve.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/role" className="button-primary gap-2">Start Learning <ArrowRight size={16} /></Link>
              <a href="#features" className="button-secondary">Explore Features</a>
            </div>
          </div>

          <div className="card p-5">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Concept mastery</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">82%</div>
                </div>
                <div className="rounded-xl bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">Strong</div>
              </div>
              {concepts.map((item) => (
                <div key={item.name} className="mb-3">
                  <div className="mb-1 flex justify-between text-xs text-slate-600 dark:text-slate-300"><span>{item.name}</span><span>{item.mastery}%</span></div>
                  <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${item.mastery}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {['AI Learning Gap Detection', 'Evidence-Based Analysis', 'Personalized Resources', 'AI-Generated Practice', 'Theory Answer Analysis', 'Progress & Reassessment', 'Teacher Analytics', 'Gamification'].map((title, index) => (
            <div key={title} className="card p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-200">{index + 1}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Evidence-first insight built to guide the next learning action.</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-6">
      <div className="card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white">L</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
        </div>
        <div className="space-y-4">
          <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" placeholder="Email" />
          <input type="password" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" placeholder="Password" />
        </div>
        <Link to="/role" className="button-primary mt-6 w-full">Login</Link>
        <div className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">No account? <Link to="/register" className="font-semibold text-blue-600">Create one</Link></div>
      </div>
    </div>
  );
}

function RegisterPage() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-6">
      <div className="card w-full max-w-lg p-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Create your account</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" placeholder="First name" />
          <input className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" placeholder="Last name" />
          <input className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" placeholder="Email" />
          <input type="password" className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" placeholder="Password" />
        </div>
        <Link to="/role" className="button-primary mt-6 w-full">Continue</Link>
      </div>
    </div>
  );
}

function RoleSelectionPage() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-6">
      <div className="card w-full max-w-3xl p-8">
        <div className="mb-8 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Choose a role</div>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Who are you?</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Link to="/subjects" className="card flex min-h-48 flex-col items-center justify-center p-8 text-center transition hover:-translate-y-1">
            <GraduationCap size={36} className="mb-4 text-blue-600" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Student</div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Assess, diagnose, and improve with a personalized path.</p>
          </Link>
          <Link to="/teacher" className="card flex min-h-48 flex-col items-center justify-center p-8 text-center transition hover:-translate-y-1">
            <Users size={36} className="mb-4 text-violet-600" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Teacher</div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Track class performance and intervention needs.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubjectSelectionPage() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-6">
      <div className="card w-full max-w-5xl p-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Select path</div>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Choose your subject and topic</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Subject</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>Data Structures</option></select></div>
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Sub-topic</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>Recursion</option></select></div>
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Topic</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>Recursion Base Cases</option></select></div>
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Difficulty</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>Medium</option></select></div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Link to="/student" className="button-secondary">Back</Link>
          <Link to="/student/assessment" className="button-primary">Continue</Link>
        </div>
      </div>
    </div>
  );
}

function StudentDashboardPage() {
  return (
    <AppShell title="Overview" navItems={studentNav}>
      <div className="space-y-8">
        <section className="card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Good morning</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Rahul 👋</h2>
            </div>
            <div className="flex gap-3">
              <Link to="/student/assessment" className="button-primary">Take assessment</Link>
              <Link to="/student/resources" className="button-secondary">View resources</Link>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Current accuracy" value="82%" accent="blue" />
            <StatCard label="XP" value="1,240" accent="purple" />
            <StatCard label="Daily streak" value="🔥 7 days" accent="amber" />
            <StatCard label="Questions solved" value="248" accent="green" />
            <StatCard label="Assessments" value="14" accent="red" />
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Concept mastery</h2>
            <Link to="/student/gaps" className="button-secondary">View Learning Gaps</Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {concepts.map((item) => (
              <div key={item.name} className="card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.mastery >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-200' : item.mastery >= 60 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200' : 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200'}`}>
                    {item.mastery}% {item.mastery >= 80 ? '🟢' : item.mastery >= 60 ? '🟡' : '🔴'}
                  </span>
                </div>
                <div className="mb-3 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className={`h-full rounded-full ${item.mastery >= 80 ? 'bg-green-500' : item.mastery >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${item.mastery}%` }} /></div>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div><span className="font-medium">Severity</span><div className="mt-1 text-slate-900 dark:text-white">{item.severity}</div></div>
                  <div><span className="font-medium">Confidence</span><div className="mt-1 text-slate-900 dark:text-white">{item.confidence}%</div></div>
                  <div><span className="font-medium">Questions attempted</span><div className="mt-1 text-slate-900 dark:text-white">{item.questionsAttempted}</div></div>
                  <div><span className="font-medium">Improvement</span><div className="mt-1 text-slate-900 dark:text-white">{item.improvement > 0 ? '+' : ''}{item.improvement}%</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function LearningGapsPage() {
  return (
    <AppShell title="Learning Gaps" navItems={studentNav}>
      <div className="space-y-6">
        {learningGaps.map((gap) => (
          <div key={gap.id} className="card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Learning Gap Detected</div>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{gap.subConcept}</h2>
              </div>
              <div className="rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/50 dark:text-red-200">{gap.severity}</div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <div><div className="text-sm text-slate-500 dark:text-slate-400">Mastery</div><div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{gap.mastery}%</div></div>
              <div><div className="text-sm text-slate-500 dark:text-slate-400">Confidence</div><div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{gap.confidence}%</div></div>
              <div><div className="text-sm text-slate-500 dark:text-slate-400">Questions analyzed</div><div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{gap.questionsAnalyzed}</div></div>
              <div><div className="text-sm text-slate-500 dark:text-slate-400">Incorrect</div><div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{gap.incorrect}</div></div>
            </div>
            <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <div><div className="text-sm font-semibold text-slate-700 dark:text-slate-200">What went wrong?</div><p className="mt-1 text-slate-600 dark:text-slate-300">{gap.whatWentWrong}</p></div>
              <div><div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Why did it happen?</div><p className="mt-1 text-slate-600 dark:text-slate-300">{gap.whyItHappened}</p></div>
              <div><div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Which concept is affected?</div><p className="mt-1 text-slate-600 dark:text-slate-300">{gap.affectedConcept}</p></div>
              <div><div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Evidence</div><p className="mt-1 text-slate-600 dark:text-slate-300">{gap.evidence}</p></div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link to="/student/gaps/recursion-base-cases" className="button-primary">View Detail</Link>
              <button type="button" className="button-secondary">Why did LearnLens identify this gap?</button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function GapDetailsPage() {
  return (
    <AppShell title="Gap Details" navItems={studentNav}>
      <div className="card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Concept</div>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Recursion Base Cases</h2>
          </div>
          <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/50 dark:text-red-200">RED • Critical</div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Mastery</div><div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">38%</div></div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Severity</div><div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">High</div></div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Confidence</div><div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">91%</div></div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Evidence</div><div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">5 questions</div></div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Evidence</div>
            <p className="text-slate-600 dark:text-slate-300">You answered 3 recursion questions incorrectly. In 2 answers, the base condition was missing or incorrect. This indicates difficulty understanding recursion termination.</p>
            <div className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Common mistake</div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Forgetting to add a stopping condition or checking the wrong termination condition.</p>
            <div className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Likely misconception</div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">The student understands recursive calls but does not correctly identify termination conditions.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Recommended action</div>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-slate-600 dark:text-slate-300">
              <li>Review recursion fundamentals</li>
              <li>Complete beginner DPP</li>
              <li>Attempt concept-check questions</li>
              <li>Take reassessment</li>
            </ol>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="button" className="button-primary">Start Learning Path</button>
          <button type="button" className="button-secondary">Open resources</button>
        </div>
      </div>
    </AppShell>
  );
}

function AssessmentSetupPage() {
  return (
    <AppShell title="Assessment" navItems={studentNav}>
      <div className="card mx-auto max-w-5xl p-6">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Assessment setup</div>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Set up your evaluation</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Assessment Type</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>MCQ</option><option>Theory</option></select></div>
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Subject</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>Data Structures</option></select></div>
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Topic</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>Recursion Base Cases</option></select></div>
          <div className="space-y-2"><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Difficulty</label><select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"><option>Medium</option></select></div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Number of questions</div><div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">10</div></div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Timer</div><div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">12 min</div></div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Concepts covered</div><div className="mt-2 text-base font-bold text-slate-900 dark:text-white">Base case, termination, recursive tree</div></div>
        </div>
        <div className="mt-8 flex gap-3">
          <Link to="/student/revision" className="button-secondary">Quick Revision</Link>
          <Link to="/student/assessment/1" className="button-primary">Start Assessment</Link>
        </div>
      </div>
    </AppShell>
  );
}

function RevisionPage() {
  return (
    <AppShell title="Quick Revision" navItems={studentNav}>
      <div className="mx-auto max-w-5xl card p-6">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Revision</div>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Recursion Base Cases</h2>
        </div>
        <div className="space-y-4">
          {[
            ['Important formulas', 'n! = n * (n-1)!; base case when n === 1'],
            ['Key concepts', 'A recursive function must reduce the problem toward a terminating condition.'],
            ['Common mistakes', 'Removing the base case or confusing recursive progression with termination.']
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</div>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Link to="/student/assessment/1" className="button-primary">I’m Ready</Link>
          <Link to="/student/assessment" className="button-secondary">Skip Revision</Link>
        </div>
      </div>
    </AppShell>
  );
}

function AssessmentPage() {
  return (
    <AppShell title="Assessment" navItems={studentNav}>
      <div className="mx-auto max-w-5xl card p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Question 4 / 10</div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Which of the following is the base condition in recursion?</h2>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 text-lg font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">08:42</div>
        </div>
        <div className="mb-6 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full w-40 rounded-full bg-blue-600" /></div>
        <div className="grid gap-4 md:grid-cols-2">
          {['A. n === 0', 'B. n < 0', 'C. n * factorial(n - 1)', 'D. recursion()'].map((option) => (
            <button key={option} type="button" className="card flex items-center justify-between p-4 text-left hover:-translate-y-0.5">
              <span className="text-slate-700 dark:text-slate-200">{option}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <div className="flex gap-3">
            <button type="button" className="button-secondary">Previous</button>
            <button type="button" className="button-secondary">Mark for Review</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">Questions attempted: 4</span>
            <Link to="/student/result" className="button-primary">Submit Assessment</Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function TheoryScannerPage() {
  return (
    <AppShell title="Theory Scanner" navItems={studentNav}>
      <div className="mx-auto max-w-5xl card p-6">
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Theory upload</div>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">AI evaluation for handwritten answers</h2>
        </div>
        <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800">
          <Camera size={32} className="mx-auto mb-4 text-blue-600" />
          <div className="text-lg font-semibold text-slate-900 dark:text-white">Upload pages or scan answer sheets</div>
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">Supports images, PDFs, camera scanning, multi-page uploads</div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" className="button-primary">Add Page</button>
            <button type="button" className="button-secondary">Remove</button>
            <button type="button" className="button-secondary">Rescan</button>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Page 1 of 3</div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[1,2,3].map((page) => (
              <div key={page} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-3 h-28 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800" />
                <div className="text-sm text-slate-600 dark:text-slate-300">Page {page}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Link to="/student/result" className="button-primary">Submit for AI Evaluation</Link>
        </div>
      </div>
    </AppShell>
  );
}

function AssessmentResultPage() {
  return (
    <AppShell title="Assessment Result" navItems={studentNav}>
      <div className="space-y-8">
        <div className="card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Assessment complete</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Score: 72%</h2>
            </div>
            <div className="rounded-2xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">Overall performance is improving</div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <StatCard label="Correct" value="72%" accent="green" />
            <StatCard label="Incorrect" value="18%" accent="red" />
            <StatCard label="Partial" value="7%" accent="amber" />
            <StatCard label="Skipped" value="3%" accent="blue" />
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-4 text-xl font-bold text-slate-900 dark:text-white">AI Learning Analysis</div>
          <p className="text-slate-600 dark:text-slate-300">Recursion base cases were repeatedly missed. Your responses show the same termination bug across multiple attempts, indicating a concept-level issue rather than a random error.</p>
          <div className="mt-5 flex gap-3">
            <Link to="/student/gaps" className="button-primary">View My Learning Gaps</Link>
            <Link to="/student/resources" className="button-secondary">Open recommended resources</Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StudyResourcesPage() {
  return (
    <AppShell title="Study Zone" navItems={studentNav}>
      <div className="space-y-6">
        <div className="card p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Resource library</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Study Zone</h2>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
              <input placeholder="Search resources..." className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 md:w-64" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => (
            <div key={resource.id} className="card p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">{resource.type}</span>
                <Bookmark size={16} className={resource.bookmarked ? 'text-violet-500' : 'text-slate-400'} />
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{resource.title}</div>
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{resource.topic} • {resource.difficulty}</div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"><span>{resource.duration}</span><span>{resource.relevance}% match</span></div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{resource.reason}</p>
              <button type="button" className="button-primary mt-5 w-full">Read Now</button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function PracticePage() {
  return (
    <AppShell title="Practice" navItems={studentNav}>
      <div className="mx-auto max-w-5xl card p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-violet-600">Targeted practice</div>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Weak Concept: Recursion</h2>
          </div>
          <div className="rounded-xl bg-violet-100 px-3 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-200">Difficulty adjusted based on your performance</div>
        </div>
        <div className="mb-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <div className="text-sm text-slate-500 dark:text-slate-400">Question</div>
          <div className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">What is the purpose of a base case in recursion?</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {['It stops recursion', 'It starts recursion', 'It loops forever', 'It sorts the data'].map((option) => (
            <button key={option} type="button" className="card p-4 text-left text-slate-700 dark:text-slate-200">{option}</button>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <button type="button" className="button-primary">Check answer</button>
          <Link to="/student/reassessment" className="button-secondary">Next question</Link>
        </div>
      </div>
    </AppShell>
  );
}

function ReassessmentPage() {
  return (
    <AppShell title="Reassessment" navItems={studentNav}>
      <div className="card mx-auto max-w-5xl p-6">
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-blue-600">Ready to test improvement?</div>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Recursion mastery improvement</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">Before</div><div className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">35%</div></div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="text-sm text-slate-500 dark:text-slate-400">After</div><div className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">78%</div></div>
          <div className="rounded-2xl bg-emerald-100 p-4 dark:bg-emerald-950/50"><div className="text-sm text-emerald-700 dark:text-emerald-200">Improvement</div><div className="mt-1 text-3xl font-bold text-emerald-700 dark:text-emerald-200">+43% 📈</div></div>
        </div>
        <div className="mt-8 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="month" />
              <YAxis />
              <Area type="monotone" dataKey="accuracy" stroke="#2563eb" fill="#93c5fd" fillOpacity={0.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="button" className="button-primary">Take Reassessment</button>
          <button type="button" className="button-secondary">View Next Concepts</button>
        </div>
      </div>
    </AppShell>
  );
}

function ProgressPage() {
  return (
    <AppShell title="Progress" navItems={studentNav}>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Overall accuracy" value="82%" accent="blue" />
          <StatCard label="Questions solved" value="248" accent="green" />
          <StatCard label="Tests completed" value="14" accent="purple" />
          <StatCard label="Consistency" value="7 days" accent="amber" />
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="card p-5">
            <div className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Accuracy over time</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area type="monotone" dataKey="accuracy" stroke="#7c3aed" fill="#ddd6fe" fillOpacity={0.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card p-5">
            <div className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Subject comparison</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ subject: 'DS', score: 82 }, { subject: 'Algo', score: 68 }, { subject: 'Math', score: 80 }, { subject: 'DB', score: 74 }]}> 
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Bar dataKey="score" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function LeaderboardPage() {
  return (
    <AppShell title="Leaderboard" navItems={studentNav}>
      <div className="card p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-blue-600">This week's leaderboard</div>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Top performers</h2>
          </div>
          <button type="button" className="button-secondary">Overall leaderboard</button>
        </div>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div key={entry.name} className={`flex items-center justify-between rounded-2xl border p-4 ${entry.currentUser ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">#{entry.rank}</div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{entry.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy {entry.accuracy}% • Streak {entry.streak}</div>
                </div>
              </div>
              <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-300">
                <span>Improvement: {entry.improvement}%</span>
                <span>XP: {entry.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function BookmarksPage() {
  return (
    <AppShell title="Bookmarks" navItems={studentNav}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.filter((r) => r.bookmarked).map((resource) => (
          <div key={resource.id} className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-200">{resource.type}</span>
              <button type="button" className="text-xs text-red-500">Remove</button>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{resource.title}</div>
            <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{resource.topic}</div>
            <button type="button" className="button-secondary mt-5 w-full">Open resource</button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function TeacherDashboardPage() {
  return (
    <AppShell title="Overview" navItems={teacherNav}>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Average class accuracy" value="76%" accent="blue" />
          <StatCard label="Average score" value="74%" accent="green" />
          <StatCard label="Questions solved" value="1,248" accent="purple" />
          <StatCard label="Improvement" value="+18%" accent="amber" />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Most common learning gaps</h2>
            {['Recursion', 'Linked Lists', 'Sorting', 'Searching'].map((label, index) => (
              <div key={label} className="mb-4">
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>{label}</span><span>{[62,48,31,12][index]}% students</span></div>
                <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500" style={{ width: `${[62,48,31,12][index]}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Students needing attention</h2>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">Rahul • Recursion • HIGH • 3 repeated errors</div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">Aanya • Linked Lists • MEDIUM • declining performance</div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">Ravi • Sorting • HIGH • inactivity</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/role" element={<RoleSelectionPage />} />
      <Route path="/subjects" element={<SubjectSelectionPage />} />
      <Route path="/student" element={<StudentDashboardPage />} />
      <Route path="/student/assessment" element={<AssessmentSetupPage />} />
      <Route path="/student/revision" element={<RevisionPage />} />
      <Route path="/student/assessment/:id" element={<AssessmentPage />} />
      <Route path="/student/result" element={<AssessmentResultPage />} />
      <Route path="/student/gaps" element={<LearningGapsPage />} />
      <Route path="/student/gaps/:id" element={<GapDetailsPage />} />
      <Route path="/student/resources" element={<StudyResourcesPage />} />
      <Route path="/student/practice" element={<PracticePage />} />
      <Route path="/student/reassessment" element={<ReassessmentPage />} />
      <Route path="/student/progress" element={<ProgressPage />} />
      <Route path="/student/leaderboard" element={<LeaderboardPage />} />
      <Route path="/student/bookmarks" element={<BookmarksPage />} />
      <Route path="/teacher" element={<TeacherDashboardPage />} />
      <Route path="/teacher/class" element={<TeacherDashboardPage />} />
      <Route path="/teacher/gaps" element={<TeacherDashboardPage />} />
      <Route path="/teacher/analytics" element={<TeacherDashboardPage />} />
      <Route path="/teacher/insights" element={<TeacherDashboardPage />} />
    </Routes>
  );
}

export default App;
