import { ArrowUpRight } from "lucide-react"
import Container from "../ui/Container"
import { categories } from "../../data/categories"
import useScrollReveal from "../../hooks/useScrollReveal"

function Categories() {
    const sectionRef = useScrollReveal();

  return (
    <section className="bg-[#f8fafc] py-4 sm:py-8">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600">
            Explore
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by Category
          </h2>

          <p className="mt-3 max-w-xl text-neutral-500">
            Find the right pair for your style, movement, and everyday rotation.
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.id}
              className="group relative min-h-70 overflow-hidden rounded-3xl bg-neutral-200"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />

              <div className="relative flex h-full min-h-70 flex-col justify-end p-6 text-white sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold sm:text-3xl">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-sm text-white/80">
                      {category.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Explore ${category.name}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45"
                  >
                    <ArrowUpRight size={19} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Categories