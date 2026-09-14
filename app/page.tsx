import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Certificates } from "@/components/sections/certificates"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import {
  getPortfolioProfile,
  getPublishedProjects,
  getSkillCategoriesWithSkills,
  getExperiences,
  getCurrentWork,
  getCertificates,
} from "@/lib/db/data-adapter"

export default async function Home() {
  const [profile, projects, skillCategories, experiences, currentWork, certificates] =
    await Promise.all([
      getPortfolioProfile(),
      getPublishedProjects(),
      getSkillCategoriesWithSkills(),
      getExperiences(),
      getCurrentWork(),
      getCertificates(),
    ])

  return (
    <main className="min-h-screen">
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} currentWork={currentWork} />
      <Projects initialProjects={projects} />
      <Skills initialCategories={skillCategories} />
      <Experience initialExperiences={experiences} />
      <Certificates initialCertificates={certificates} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </main>
  )
}
