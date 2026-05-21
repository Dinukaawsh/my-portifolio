export type SectionKey =
  | "about"
  | "skills"
  | "projects"
  | "education"
  | "experience"
  | "certificates"
  | "achievements"
  | "references"
  | "blog"
  | "contact"
  | "publications";

export const NAV_SECTIONS: { key: SectionKey; label: string; path: string }[] = [
  { key: "about", label: "About", path: "/about" },
  { key: "projects", label: "Projects", path: "/projects" },
  { key: "skills", label: "Skills", path: "/skills" },
  { key: "education", label: "Education", path: "/education" },
  { key: "experience", label: "Experience", path: "/experience" },
  { key: "certificates", label: "Certificates", path: "/certificates" },
  { key: "achievements", label: "Achievements", path: "/achievements" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "contact", label: "Contact", path: "/contact" },
];

export const ALL_SECTIONS: { key: SectionKey; label: string; path: string }[] = [
  ...NAV_SECTIONS,
  { key: "references", label: "References", path: "/references" },
  { key: "publications", label: "Publications", path: "/publications" },
];

export function sectionPath(key: string): string {
  return ALL_SECTIONS.find((s) => s.key === key)?.path ?? "/about";
}

export function sectionKeyFromPath(pathname: string): SectionKey {
  const match = ALL_SECTIONS.find((s) => s.path === pathname);
  return match?.key ?? "about";
}
