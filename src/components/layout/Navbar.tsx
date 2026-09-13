import Container from "../ui/container";
function Navbar() {
  return (
    <header className="border-b border-neutral-200 ng-white">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <a href="/" className="text-2xl font-black tracking-tight">KicksHub</a>
          <div className="hidden item-center gap-8 md:flex">
            <a href="/" className="text-sm font-medium hover:text-neutral-500">Home</a>
            <a href="/products" className="text-sm font-medium hover:text-neutral-500">Sneaker</a>
            <a href="/categories" className="text-sm font-medium hover:text-neutral-500">Categories</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 hover:bg-neutral-100" aria-label="search">🔍</button>
            <button className="rounded-full p-2 hover:bg-neutral-100" aria-label="shopping card">🛒</button>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
