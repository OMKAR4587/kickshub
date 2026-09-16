import { ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react"
import Container from "../ui/Container"

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $100.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic Products",
    description: "Every pair is carefully verified.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Simple 30-day return policy.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here whenever you need us.",
  },
]

function Benefits() {
  return (
    <section className="border-y border-neutral-100 py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <div
                key={benefit.title}
                className="group flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f3f4ff] text-purple-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Benefits