import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import {
  getPortfolioProfile,
  getPublishedProjects,
  getSkillCategoriesWithSkills,
  getExperiences,
  getCurrentWork,
} from "@/lib/db/data-adapter"

export default async function Home() {
  const [profile, projects, skillCategories, experiences, currentWork] =
    await Promise.all([
      getPortfolioProfile(),
      getPublishedProjects(),
      getSkillCategoriesWithSkills(),
      getExperiences(),
      getCurrentWork(),
    ])

  return (
    <main className="min-h-screen">
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} currentWork={currentWork} />
      <Projects initialProjects={projects} />
      <Skills initialCategories={skillCategories} />
      <Experience initialExperiences={experiences} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </main>
  )
}
