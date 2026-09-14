import { MetadataRoute } from "next"
import { getPublishedProjects } from "@/lib/db/data-adapter"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://abdulhammedmustapha.com"
  const projects = await getPublishedProjects()

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: project.featured ? 0.9 : 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectUrls,
  ]
}
