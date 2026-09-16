import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import Container from '../ui/Container'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sneakers', path: '/products' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container>
        <nav className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter"
          >
            Kicks<span className="text-neutral-500">Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-black'
                      : 'text-neutral-500 hover:text-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2.5 hover:bg-neutral-100"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Account"
              className="rounded-full p-2.5 hover:bg-neutral-100"
            >
              <User size={20} strokeWidth={1.8} />
            </Link>

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="rounded-full p-2.5 hover:bg-neutral-100"
            >
              <Heart size={20} strokeWidth={1.8} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative rounded-full p-2.5 hover:bg-neutral-100"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />

              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </Link>

          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2.5 hover:bg-neutral-100"
            >
              <Search size={19} strokeWidth={1.8} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative rounded-full p-2.5 hover:bg-neutral-100"
            >
              <ShoppingBag size={19} strokeWidth={1.8} />

              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </Link>

            {/* Menu */}
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2.5 hover:bg-neutral-100"
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={1.8} />
              ) : (
                <Menu size={20} strokeWidth={1.8} />
              )}
            </button>

          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-neutral-200 py-6 md:hidden">
            <div className="flex flex-col gap-5">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive
                        ? 'text-black'
                        : 'text-neutral-500'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-base font-medium text-neutral-500"
              >
                <User size={18} />
                Account
              </Link>

              <button
                type="button"
                className="flex items-center gap-3 text-base font-medium text-neutral-500"
              >
                <Heart size={18} />
                Wishlist
              </button>

            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Navbar
