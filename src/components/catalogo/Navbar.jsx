import Link from 'next/link';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import Image from 'next/image';


const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="fixed top-0 w-full z-[101] bg-white border-b border-gray-100">{/* /80 backdrop-blur-md */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="flex flex-row  gap-5 text-xl font-bold tracking-tight text-slate-900">Botines 2026</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <Link href="/botines" className="hover:text-black transition-colors">Home</Link>
            <Link href="/botines/productos" className="hover:text-black transition-colors">Catalogo</Link>
          </div>

          {/* Icons Actions */}
          <div className="flex items-center space-x-6">
            <Search className="w-5 h-5 text-slate-600 cursor-pointer hover:text-black transition" />
            <User className="w-5 h-5 text-slate-600 cursor-pointer hover:text-black transition" />
            <div 
              className="relative cursor-pointer group"
              onClick={onOpenCart}
            >
              <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:text-black transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <Menu className="w-5 h-5 md:hidden text-slate-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;