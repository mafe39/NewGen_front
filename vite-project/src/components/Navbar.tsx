import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo-newgen-escuro2.png";

export function Navbar() {
  const menuItems = [
    { label: "Início", path: "/" },
    { label: "Colaboradores", path: "/colaboradores" },
    { label: "Folha de Pagamento", path: "/folha" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#92cca9] rounded-b-2xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex h-28 items-center justify-between">

          
          <Link to="/" className="flex items-center h-16">
            <img
              src={logo}
              alt="Logo New-Gen"
              className="h-20 object-contain hover:scale-105 transition"
            />
          </Link>

         
          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-12 text-green-900 font-medium text-lg">
            {menuItems.map((item) => (
              <li key={item.path} className="relative group">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `transition ${
                      isActive
                        ? "font-semibold text-green-800"
                        : "hover:text-green-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>

               
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-700 transition-all group-hover:w-full" />
              </li>
            ))}
          </ul>

          <div className="hidden md:block text-sm text-green-900">
            Admin
          </div>
        </div>
      </div>
    </nav>
  );
}
