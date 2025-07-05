import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-gray-900 text-gray-200 py-6 px-4 flex flex-col items-center border-t border-gray-800 mt-auto">
    <div className="flex items-center gap-3 mb-2">
      <a
        href="https://github.com/your-github"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="hover:text-blue-400 transition-colors"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
      </a>
      <a
        href="https://linkedin.com/in/your-linkedin"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="hover:text-blue-400 transition-colors"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
        </svg>
      </a>
      <a
        href="mailto:your.email@example.com"
        aria-label="Email"
        className="hover:text-blue-400 transition-colors"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 13.065l-11.99-7.065v14h24v-14l-12.01 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z" />
        </svg>
      </a>
    </div>
    <div className="text-sm mb-1">
      &copy; {new Date().getFullYear()} DINUKA ASHAN WICKRAMARATHNA. All rights
      reserved.
    </div>
    <div className="text-xs text-gray-400">
      &quot;Building dreams, one line of code at a time.&quot;
    </div>
  </footer>
);

export default Footer;
