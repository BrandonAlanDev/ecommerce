"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/actions/auth-actions";
import { useSession } from "next-auth/react";
import {
  Shirt,
  Package,
  Tags,
  Truck,
  Ruler,
  LogOut,
  Menu,
  X,
  User,
  History,
  ShoppingCart,
  Search,
  Home,
  Store,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomeTop = pathname === "/" && !scrolled;

  const { data: session } = useSession();

  useEffect(() => {
    console.log("Session in Header:", session);
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = (path: string) => `
    flex items-center gap-2 text-sm font-bold uppercase tracking-tighter transition-all duration-300
    ${
      pathname === path
        ? isHomeTop
          ? "text-blue-800 italic"
          : "text-blue-800 italic"
        : isHomeTop
        ? "text-neutral-800"
        : "text-neutral-800"
    }
  `;

  const actionButtonStyle = `
    p-2 rounded-xl border transition-all duration-300
    ${
      isHomeTop
        ? "border-neutral-800 bg-neutral-300/20 text-white hover:text-white hover:bg-blue-800"
        : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
    }
  `;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[100]
        transition-all duration-500
        border-b
        ${
          isHomeTop
            ? "bg-white/20 border-transparent"
            : "bg-black/80 backdrop-blur-md border-neutral-900"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className={`text-xl font-black uppercase italic tracking-tighter ${
                isHomeTop
                  ? "text-white"
                  : "text-white"
              }`}>
            NewSurfBoard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Button variant={"blanco"}><Link href="/" className={linkStyle("/")}>
            <Home size={16} />
            Home
          </Link></Button>

          <Button variant={"blanco"}><Link href="/productos" className={linkStyle("/productos")}>
            <Store size={16} />
            Catálogo
          </Link></Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className={`${actionButtonStyle} hidden sm:flex`}>
            <Search size={18} />
          </button>
          
          {/* Logged User */}
          {session?.user?.name ? (
            <>
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span
                  className={`
                    text-[10px] font-black uppercase leading-none
                    ${
                      isHomeTop
                        ? "text-blue-800"
                        : "text-blue-800"
                    }
                  `}
                >
                </span>

                <span className="text-xs text-blue-800 font-medium">
                  {"Admin"}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSignOut()}
                className={`
                  rounded-xl transition-all
                  ${
                    isHomeTop
                      ? "border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500"
                      : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500"
                  }
                `}
              >
                <LogOut size={18} />
              </Button>
            </>
          ) : (<Link
              href="/login"
              className={`
                hidden sm:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all duration-300
                ${
                  isHomeTop
                    ? "border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-blue-800 hover:text-white"
                    : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-blue-800 hover:text-white"
                }
              `}
            >
              <User size={16} />
              Iniciar Sesión
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className={`
              md:hidden p-2 rounded-xl transition-all duration-300
              ${
                isHomeTop
                  ? "text-white hover:bg-white/10"
                  : "text-white hover:bg-neutral-900"
              }
            `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-500
          ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-neutral-900">
          <nav className="flex flex-col p-6 gap-6">
            <Button variant={"blanco"}><Link
              onClick={() => setIsMenuOpen(false)}
              href="/"
              className={linkStyle("/")}
            >
              <Home size={20} />
              Home
            </Link></Button>

            <Button variant={"blanco"}><Link
              onClick={() => setIsMenuOpen(false)}
              href="/productos"
              className={linkStyle("/productos")}
            >
              <Store size={20} />
              Catálogo
            </Link></Button>

            {/* Admin Links */}
            {session?.user?.role === "ADMIN" && (
              <>
                <Button variant={"blanco"}><Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/dashboard"
                  className={linkStyle("/dashboard")}
                >
                  <Package size={20} />
                  Productos
                </Link></Button>

                <Button variant={"blanco"}><Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/categories"
                  className={linkStyle("/categories")}
                >
                  <Tags size={20} />
                  Categorías
                </Link></Button>

                <Button variant={"blanco"}><Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/provider"
                  className={linkStyle("/provider")}
                >
                  <Truck size={20} />
                  Proveedores
                </Link></Button>

                <Button variant={"blanco"}><Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/sizes"
                  className={linkStyle("/sizes")}
                >
                  <Ruler size={20} />
                  Talles
                </Link></Button>

                <Button variant={"blanco"}><Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/movements"
                  className={linkStyle("/movements")}
                >
                  <History size={20} />
                  Historial
                </Link></Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}