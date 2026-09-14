import Link from 'next/link'
import Image from 'next/image'
import { Plus, FolderGit2, Sparkles, CheckCircle2, EyeOff, Layers, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { projects as fallbackProjects } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectRowActions } from '@/components/admin/projects/project-row-actions'

export default async function AdminProjectsPage() {
  const supabase = createClient()
  let projectsList: Array<{
    id: string
    title: string
    slug: string
    role: string
    featured: boolean
    is_published: boolean
    display_order: number
    tech: string[]
    image: string
  }> = []

  if (supabase) {
    const { data } = await supabase
      .from('projects')
      .select('id, title, slug, role, featured, is_published, display_order, tech, image')
      .order('display_order', { ascending: true })

    if (data && data.length > 0) {
      projectsList = data
    }
  }

  // Fallback if database is empty or offline
  if (projectsList.length === 0) {
    projectsList = fallbackProjects.map((p, idx) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      role: p.role,
      featured: p.featured,
      is_published: true,
      display_order: idx + 1,
      tech: p.tech,
      image: p.image,
    }))
  }

  return (
    <div className="space-y-8">
      {/* Top Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <FolderGit2 className="h-4 w-4" />
            <span>CASE STUDIES & PRODUCTION ARCHITECTURES</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
            Project Case Studies ({projectsList.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your flagship case studies, technical writeups, tech stack chips, and public visibility.
          </p>
        </div>

        <Button size="default" variant="default" href="/admin/projects/new">
          <Plus className="h-4 w-4" />
          <span>New Case Study</span>
        </Button>
      </div>

      {/* Projects Table */}
      <div className="glass-card rounded-3xl border border-border overflow-hidden shadow-xl dark:border-white/[0.12]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-muted/60 border-b border-border text-muted-foreground dark:bg-white/[0.04]">
              <tr>
                <th className="p-4 pl-6 font-semibold">ORDER</th>
                <th className="p-4 font-semibold">CASE STUDY</th>
                <th className="p-4 font-semibold">ROLE</th>
                <th className="p-4 font-semibold">TECH STACK</th>
                <th className="p-4 font-semibold">STATUS</th>
                <th className="p-4 pr-6 text-right font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projectsList.map((project, idx) => (
                <tr
                  key={project.slug}
                  className="hover:bg-muted/40 transition-colors"
                >
                  {/* Order */}
                  <td className="p-4 pl-6 text-muted-foreground font-bold">
                    #{project.display_order || idx + 1}
                  </td>

                  {/* Thumbnail & Title */}
                  <td className="p-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border bg-muted/40 shrink-0">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <FolderGit2 className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 max-w-sm">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="font-bold text-foreground hover:text-primary transition-colors truncate"
                          >
                            {project.title}
                          </Link>
                          {project.featured && (
                            <Badge variant="accent" className="text-[9px] py-0 px-1.5 shrink-0">
                              <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                              FLAGSHIP
                            </Badge>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground font-mono block truncate">
                          /projects/{project.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="p-4 text-muted-foreground max-w-[140px] truncate">
                    {project.role}
                  </td>

                  {/* Tech Stack */}
                  <td className="p-4 text-muted-foreground">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded bg-muted/60 text-[10px] text-foreground/80 dark:bg-white/[0.05]"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-muted/60 text-[10px] text-muted-foreground">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Published Status */}
                  <td className="p-4">
                    {project.is_published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-zinc-500 font-medium text-[11px]">
                        <EyeOff className="h-3.5 w-3.5" />
                        <span>Draft</span>
                      </span>
                    )}
                  </td>

                  {/* Row Actions */}
                  <td className="p-4 pr-6 text-right">
                    <ProjectRowActions
                      id={project.id}
                      slug={project.slug}
                      title={project.title}
                      featured={project.featured}
                      isPublished={project.is_published}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
