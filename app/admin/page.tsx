import Link from 'next/link'
import {
  FolderGit2,
  Briefcase,
  Layers,
  Flame,
  User,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Sparkles,
} from 'lucide-react'
import {
  getPublishedProjects,
  getSkillCategoriesWithSkills,
  getExperiences,
  getCurrentWork,
  getPortfolioProfile,
} from '@/lib/db/data-adapter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default async function AdminDashboardPage() {
  // Fetch live portfolio data concurrently (avoiding waterfalls)
  const [projects, skillCategories, experiences, currentWork, profile] =
    await Promise.all([
      getPublishedProjects(),
      getSkillCategoriesWithSkills(),
      getExperiences(),
      getCurrentWork(),
      getPortfolioProfile(),
    ])

  const totalSkillsCount = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  )

  const flagshipProject = projects.find((p) => p.featured) || projects[0]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 dark:border-white/[0.12]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>AUTHENTICATED OWNER // ABDULHAMMED MUSTAPHA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Portfolio CMS Control Center
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
            Manage your case studies, professional track record, technical capabilities, and live site settings in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="default" variant="default" href="/admin/projects/new">
            <Plus className="h-4 w-4" />
            <span>New Case Study</span>
          </Button>
          <Button size="default" variant="outline" href="/" external>
            <span>Live Site</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Projects */}
        <Link href="/admin/projects" className="group block">
          <Card className="p-6 transition-[border-color,box-shadow,transform] duration-150 hover:border-primary/40 group-hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <Badge variant="mono" className="text-[10px]">
                {projects.length} LIVE
              </Badge>
            </div>
            <p className="text-xs font-mono text-muted-foreground uppercase">
              Case Studies
            </p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">
              {projects.length}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span>Flagship:</span>
              <span className="text-foreground font-medium truncate">
                {flagshipProject ? flagshipProject.title.split('—')[0] : 'None'}
              </span>
            </p>
          </Card>
        </Link>

        {/* Metric 2: Skills */}
        <Link href="/admin/skills" className="group block">
          <Card className="p-6 transition-[border-color,box-shadow,transform] duration-150 hover:border-primary/40 group-hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Layers className="h-5 w-5" />
              </div>
              <Badge variant="mono" className="text-[10px]">
                {skillCategories.length} DOMAINS
              </Badge>
            </div>
            <p className="text-xs font-mono text-muted-foreground uppercase">
              Skills Matrix
            </p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">
              {totalSkillsCount}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Across {skillCategories.length} domain categories
            </p>
          </Card>
        </Link>

        {/* Metric 3: Experience */}
        <Link href="/admin/experience" className="group block">
          <Card className="p-6 transition-[border-color,box-shadow,transform] duration-150 hover:border-primary/40 group-hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <Briefcase className="h-5 w-5" />
              </div>
              <Badge variant="mono" className="text-[10px]">
                HISTORY
              </Badge>
            </div>
            <p className="text-xs font-mono text-muted-foreground uppercase">
              Experience Entries
            </p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">
              {experiences.length}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1 truncate">
              Latest: {experiences[0] ? experiences[0].company : 'N/A'}
            </p>
          </Card>
        </Link>

        {/* Metric 4: Active Sprint */}
        <Link href="/admin/current-work" className="group block">
          <Card className="p-6 transition-[border-color,box-shadow,transform] duration-150 hover:border-primary/40 group-hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                <Flame className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {currentWork.progress}% DONE
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground uppercase">
              Current Sprint
            </p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">
              {currentWork.status}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1 truncate">
              {currentWork.title}
            </p>
          </Card>
        </Link>
      </div>

      {/* Quick Actions & Recent Content Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Published Case Studies Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground font-mono">
                Published Case Studies
              </h2>
              <p className="text-xs text-muted-foreground">
                Active projects displayed on the public portfolio and case study routes.
              </p>
            </div>

            <Link
              href="/admin/projects"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="glass-card rounded-2xl border border-border overflow-hidden dark:border-white/[0.1]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-muted/60 border-b border-border text-muted-foreground dark:bg-white/[0.03]">
                  <tr>
                    <th className="p-3.5 pl-5 font-semibold">PROJECT / SLUG</th>
                    <th className="p-3.5 font-semibold">ROLE</th>
                    <th className="p-3.5 font-semibold">TECH</th>
                    <th className="p-3.5 font-semibold">STATUS</th>
                    <th className="p-3.5 pr-5 text-right font-semibold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {projects.map((project, idx) => (
                    <tr
                      key={project.slug}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      <td className="p-3.5 pl-5">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">0{idx + 1}.</span>
                          <span className="font-semibold text-foreground truncate max-w-[200px]">
                            {project.title.split('—')[0].trim()}
                          </span>
                          {project.featured && (
                            <Badge variant="accent" className="text-[9px] py-0 px-1.5">
                              FLAGSHIP
                            </Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground block truncate max-w-[200px]">
                          /projects/{project.slug}
                        </span>
                      </td>

                      <td className="p-3.5 text-muted-foreground truncate max-w-[120px]">
                        {project.role}
                      </td>

                      <td className="p-3.5 text-muted-foreground">
                        <span className="px-2 py-0.5 rounded bg-muted text-[10px]">
                          {project.tech.length} Tools
                        </span>
                      </td>

                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Live</span>
                        </span>
                      </td>

                      <td className="p-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            title="Preview live case study"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions & System Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Management Shortlinks */}
          <div className="glass-card p-6 rounded-2xl border border-border space-y-4 dark:border-white/[0.1]">
            <h3 className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider">
              Quick Management
            </h3>

            <div className="space-y-2">
              <Link
                href="/admin/projects/new"
                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/80 border border-border text-xs font-mono font-medium text-foreground transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-primary" />
                  <span>Add Case Study</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/admin/skills"
                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/80 border border-border text-xs font-mono font-medium text-foreground transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-blue-500" />
                  <span>Edit Skills Matrix</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
              </Link>

              <Link
                href="/admin/current-work"
                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/80 border border-border text-xs font-mono font-medium text-foreground transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span>Update Current Sprint</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-orange-500 transition-colors" />
              </Link>

              <Link
                href="/admin/profile"
                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/80 border border-border text-xs font-mono font-medium text-foreground transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-purple-500" />
                  <span>Bio & Contact Details</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-purple-500 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Infrastructure Health Card */}
          <div className="glass-card p-6 rounded-2xl border border-border space-y-3 dark:border-white/[0.1] text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-muted-foreground font-bold">SYSTEM LEDGER</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                HEALTHY
              </span>
            </div>

            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Database Engine:</span>
                <span className="text-foreground font-medium">PostgreSQL (Supabase)</span>
              </div>
              <div className="flex justify-between">
                <span>Security Policies:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Single-Owner RLS</span>
              </div>
              <div className="flex justify-between">
                <span>Rendering Mode:</span>
                <span className="text-foreground font-medium">App Router (ISR)</span>
              </div>
              <div className="flex justify-between">
                <span>Work Availability:</span>
                <span className="text-emerald-500 font-medium">
                  {profile.availableForWork ? 'Active / Open' : 'Busy'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
