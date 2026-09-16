import { ArrowUpRight } from "lucide-react";
import { siInstagram, siFacebook, siX } from "simple-icons";
import Container from "../ui/Container";

function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black tracking-tight">
              Kicks<span className="text-purple-500">Hub</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-neutral-400">
              Premium sneakers and streetwear for people who move different.
              Discover your next pair and make every step count.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition hover:border-white hover:text-white"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d={siInstagram.path} />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition hover:border-white hover:text-white"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d={siX.path} />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition hover:border-white hover:text-white"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d={siFacebook.path} />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Shop</h3>

            <ul className="mt-5 space-y-3 text-sm text-neutral-400">
              <li>
                <a href="/products" className="transition hover:text-white">
                  Sneakers
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Help</h3>

            <ul className="mt-5 space-y-3 text-sm text-neutral-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-neutral-800 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 KicksHub. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>

            <a href="#" className="transition hover:text-white">
              Terms
            </a>

            <a
              href="#"
              className="flex items-center gap-1 transition hover:text-white"
            >
              Back to top
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
