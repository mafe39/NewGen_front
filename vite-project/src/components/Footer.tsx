import logo from "../assets/logo-newgen-escuro2.png";
import {
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="bg-[#B3DEC1]/90 backdrop-blur rounded-xl border border-green-200/60 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-2 md:px-4 py-5">

        {/* LINHA SUPERIOR */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* LOGO + FRASE */}
          <div className="flex items-center gap-6">
            <img
              src={logo}
              alt="Logo New-Gen"
              className="
                h-20
                object-contain
                drop-shadow-sm
                transition-transform
                hover:scale-105
              "
            />

            <span className="text-green-900/80 text-base leading-relaxed max-w-md">
              O RH que evolui junto com você
            </span>
          </div>

          {/* CONTATO + REDES */}
          <div className="flex flex-col gap-3 md:items-end">

            <p className="text-sm text-green-900 font-medium">
              Entre em contato conosco:
            </p>

            <div className="flex gap-6 text-green-900">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-green-700 transition-colors"
              >
                <LinkedinLogo size={36} weight="bold" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-green-700 transition-colors"
              >
                <InstagramLogo size={36} weight="bold" />
              </a>

              <a
                href="mailto:contato@newgen.com"
                aria-label="Email"
                className="hover:text-green-700 transition-colors"
              >
                <EnvelopeSimple size={36} weight="bold" />
              </a>
            </div>

          </div>
        </div>

        {/* DIVISÓRIA */}
        <hr className="my-8 border-green-300/70" />

        {/* COPYRIGHT */}
        <div className="text-center text-base text-green-900/70">
          © 2024 New-Gen. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
}
