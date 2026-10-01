import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

type ProductFilterPanelProps = {
  isOpen: boolean;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  onClose: () => void;
};

function ProductFilterPanel({
  isOpen,
  maxPrice,
  setMaxPrice,
  onClose,
}: ProductFilterPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) return;

    if (isOpen) {
      gsap.set(panel, {
        display: "block",
        height: 0,
        opacity: 0,
        y: -10,
      });

      gsap.to(panel, {
        height: "auto",
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      className="overflow-hidden"
      style={{ height: 0 }}
    >
      <div className="mt-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              Filters
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Refine your results.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-600 transition hover:bg-neutral-100"
          >
            <X size={17} />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Price */}
          <div>
            <p className="mb-3 text-sm font-semibold text-neutral-900">
              Maximum price
            </p>

            <div className="flex flex-wrap gap-2">
              {[4500, 5000, 6000, 7000, 10000].map((price) => (
                <button
                  key={price}
                  type="button"
                  onClick={() => setMaxPrice(price)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    maxPrice === price
                      ? "bg-purple-600 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {price === 10000
                    ? "All prices"
                    : `Under ₹${price.toLocaleString("en-IN")}`}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <p className="mb-3 text-sm font-semibold text-neutral-900">
              Availability
            </p>

            <label className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-white px-4 py-2.5 text-sm text-neutral-700">
              <input
                type="checkbox"
                className="h-4 w-4 accent-purple-600"
              />

              In stock only
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-neutral-200 pt-5">
          <button
            type="button"
            onClick={() => setMaxPrice(10000)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-white"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterPanel;