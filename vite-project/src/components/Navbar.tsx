import { useEffect, useState } from "react";
import logo from "../assets/logo-newgen-escuro.png";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = ["Início", "Colaboradores", "Folha de Pagamento"];

  return (
    <>
      {/* ESPAÇADOR */}
      <div className="h-28" />

      <nav
        className={`
          fixed top-0 left-0 z-50 w-full
          bg-[#92cca9]
          rounded-b-2xl
          transition-all duration-300
          ${scrolled ? "shadow-lg" : "shadow-none"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex h-28 items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center h-16 overflow-hidden">
              <img
                src={logo}
                alt="Logo New-Gen"
                className="
                  block
                  h-36
                  max-w-[220px]
                  object-contain
                  transition-transform
                  duration-300
                  hover:scale-105
                  hover:opacity-90
                "
              />
            </div>

            {/* MENU DESKTOP CENTRALIZADO */}
            <ul
              className="
                hidden md:flex
                absolute left-1/2 -translate-x-1/2
                gap-12
                text-green-900
                font-medium
                text-lg
              "
            >
              {menuItems.map((item) => (
                <li key={item} className="relative cursor-pointer group">
                  <span>{item}</span>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-700 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>

            {/* USUÁRIO */}
            <div className="hidden md:block text-sm text-green-900">
              Admin
            </div>

            {/* BOTÃO MOBILE */}
            <button
              className="md:hidden p-2 text-green-900"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* MENU MOBILE */}
          {menuOpen && (
            <ul className="md:hidden flex flex-col gap-2 pb-6 text-green-900 font-medium">
              {menuItems.map((item) => (
                <li
                  key={item}
                  className="px-3 py-2 rounded-lg hover:bg-green-200"
                >
                  {item}
                </li>
              ))}

              <hr className="border-green-300 my-3" />

              <li className="px-3 py-2 text-sm">Admin</li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
