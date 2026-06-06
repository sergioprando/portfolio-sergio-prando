"use client";

import { useLang } from "@/lib/i18n";

const nextStepsLinks = [
  { icon: "/icon-ux.svg",          labelPt: "Consultoria em UX",      labelEn: "UX Consulting",       href: "#contato" },
  { icon: "/icon-mentorship.svg",  labelPt: "UX Design Mentorship",   labelEn: "UX Design Mentorship",href: "#contato" },
];

const socialLinks = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/sergioprando/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "https://www.behance.net/sergioprando",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.65.673 1.43.673 2.36 0 .75-.13 1.4-.41 1.96-.28.55-.67 1.01-1.16 1.36-.49.36-1.065.62-1.72.79-.655.17-1.345.25-2.07.25H0V4.51l6.938-.007zm-.41 5.93c.57 0 1.03-.13 1.39-.39.36-.26.53-.67.53-1.22 0-.3-.05-.55-.15-.76-.1-.2-.25-.37-.43-.49-.18-.12-.4-.21-.64-.26-.24-.05-.5-.07-.79-.07H3.24v3.19H6.53zm.19 6.19c.31 0 .6-.03.87-.09.27-.06.51-.16.71-.3.2-.14.36-.34.48-.59.12-.25.17-.56.17-.93 0-.74-.2-1.27-.6-1.58-.4-.31-.93-.46-1.6-.46H3.24v3.95h3.48zm9.122-9.91c1.29 0 2.38.26 3.26.79.88.53 1.54 1.35 1.97 2.48H17.5c-.1-.4-.3-.7-.6-.88-.29-.18-.65-.27-1.09-.27-.64 0-1.13.2-1.47.6-.35.4-.53 1.07-.56 2.02h6.27c.03 1.7-.34 2.97-1.1 3.82-.76.85-1.87 1.28-3.32 1.28-.77 0-1.46-.13-2.08-.38-.62-.25-1.14-.6-1.57-1.07-.43-.47-.76-1.03-.98-1.68-.23-.65-.34-1.37-.34-2.17 0-.78.12-1.5.34-2.16.23-.65.56-1.21.99-1.67.43-.46.95-.82 1.56-1.07.6-.25 1.28-.38 2.03-.38l-.01.01zm3.02 5.31c-.05-.91-.28-1.57-.7-1.99-.41-.41-.97-.62-1.68-.62-.47 0-.87.08-1.19.25-.33.17-.6.38-.81.63-.22.25-.38.53-.47.84-.1.3-.15.6-.15.89h5zm-9.19-8.83H14.4v1.52H9.65V3.22z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/sergioprando",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="w-full bg-[#646361]">
      <div className="mx-auto max-w-[1440px] px-8 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-12">

          {/* Próximos passos */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">
              {lang === "pt" ? "Próximos passos" : "Next steps"}
            </h3>
            <ul className="flex flex-col gap-5">
              {nextStepsLinks.map((link) => (
                <li key={link.href + link.labelPt}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-white/80 hover:text-white hover:underline transition-colors duration-200 group"
                  >
                    <img
                      src={link.icon}
                      alt=""
                      aria-hidden="true"
                      className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    <span className="text-base">
                      {lang === "pt" ? link.labelPt : link.labelEn}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Onde você me encontra */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">
              {lang === "pt" ? "Onde você me encontra" : "Where to find me"}
            </h3>
            <ul className="flex flex-col gap-5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-white hover:underline transition-colors duration-200"
                  >
                    <span className="opacity-80 hover:opacity-100">{link.icon}</span>
                    <span className="text-base">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-sm text-white/50">
            Built with React &amp; Styled Components&nbsp;|&nbsp;Design Tokens Driven&nbsp;|&nbsp;2026 Sergio Prando
          </p>
        </div>
      </div>
    </footer>
  );
}
