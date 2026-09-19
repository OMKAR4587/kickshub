import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react"

import { useState } from "react"

import { Link, NavLink } from "react-router-dom"

import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"

import Container from "../ui/Container"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { cartCount } = useCart()
  const { wishlist } = useWishlist()

  const wishlistCount = wishlist.length

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sneakers", path: "/products" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container>
        <nav className="flex h-13 items-center justify-between">
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
                      ? "text-black"
                      : "text-neutral-500 hover:text-black"
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
              className="rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              <Search
                size={20}
                strokeWidth={1.8}
              />
            </button>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Account"
              className="rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              <User
                size={20}
                strokeWidth={1.8}
              />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              <Heart
                size={20}
                strokeWidth={1.8}
              />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 max-w-10 items-center justify-center overflow-hidden rounded-full bg-purple-600 px-1 text-[10px] font-bold leading-none text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.8}
              />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 max-w-10 items-center justify-center overflow-hidden rounded-full bg-purple-600 px-1 text-[10px] font-bold leading-none text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              <Search
                size={19}
                strokeWidth={1.8}
              />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              <Heart
                size={19}
                strokeWidth={1.8}
              />

              {wishlistCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 max-w-8 items-center justify-center overflow-hidden rounded-full bg-purple-600 px-1 text-[9px] font-bold leading-none text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.8}
              />

              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 max-w-8 items-center justify-center overflow-hidden rounded-full bg-purple-600 px-1 text-[9px] font-bold leading-none text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Menu */}
            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              onClick={() =>
                setIsMenuOpen((previous) => !previous)
              }
              className="rounded-full p-2.5 transition hover:bg-neutral-100"
            >
              {isMenuOpen ? (
                <X
                  size={20}
                  strokeWidth={1.8}
                />
              ) : (
                <Menu
                  size={20}
                  strokeWidth={1.8}
                />
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
                        ? "text-black"
                        : "text-neutral-500"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-base font-medium text-neutral-500 transition hover:text-black"
              >
                <User size={18} />
                Account
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-base font-medium text-neutral-500 transition hover:text-black"
              >
                <Heart size={18} />
                Wishlist

                {wishlistCount > 0 && (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                    {wishlistCount > 99
                      ? "99+"
                      : wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Navbar