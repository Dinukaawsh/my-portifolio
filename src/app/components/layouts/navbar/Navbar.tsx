"use client";

interface NavbarProps {
  active: string;
  setActiveSection: (key: string) => void;
}

const sections = [
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "resume", label: "Resume" },
  { key: "contact", label: "Contact" },
  { key: "blog", label: "Blog" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
];

export default function Navbar({ active, setActiveSection }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-3xl mx-auto flex gap-4 px-4 py-3 text-sm font-medium justify-center">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              active === section.key
                ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white shadow"
                : "hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-blue-300"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
