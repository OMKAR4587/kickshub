
import { useEffect, useRef, useState } from "react";
import { X, RotateCcw } from "lucide-react";
import gsap from "gsap";

type ProductFilterPanelProps = {
  isOpen: boolean;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  onClose: () => void;
};

const PRICE_LIMIT = 20000;

function ProductFilterPanel({
  isOpen,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onClose,
}: ProductFilterPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);

  useEffect(() => {
    if (isOpen) {
      setDraftMinPrice(minPrice);
      setDraftMaxPrice(maxPrice);
    }
  }, [isOpen, minPrice, maxPrice]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    gsap.killTweensOf(panel);

    if (isOpen) {
      gsap.set(panel, {
        display: "block",
        height: 0,
        opacity: 0,
        y: -8,
      });

      gsap.to(panel, {
        height: "auto",
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(panel, { display: "none" });
        },
      });
    }

    return () => {
      gsap.killTweensOf(panel);
    };
  }, [isOpen]);

  const handleApply = () => {
    if (draftMinPrice > draftMaxPrice) return;

    setMinPrice(draftMinPrice);
    setMaxPrice(draftMaxPrice);
    onClose();
  };

  const handleReset = () => {
    setDraftMinPrice(0);
    setDraftMaxPrice(PRICE_LIMIT);
  };

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <div
      ref={panelRef}
      className="overflow-hidden"
      style={{ height: 0, display: "none" }}
      aria-hidden={!isOpen}
    >
      <div className="mt-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Price filters
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              तुझ्या बजेटनुसार sneakers निवड.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-600 hover:bg-neutral-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-neutral-800">
              Minimum price
            </span>

            <input
              type="number"
              min={0}
              max={PRICE_LIMIT}
              step={100}
              value={draftMinPrice}
              onChange={(event) => {
                const value = event.currentTarget.valueAsNumber;
                setDraftMinPrice(
                  Number.isFinite(value)
                    ? Math.min(PRICE_LIMIT, Math.max(0, value))
                    : 0
                );
              }}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white p-3 text-base outline-none focus:border-purple-500"
            />

            <input
              type="range"
              min={0}
              max={PRICE_LIMIT}
              step={100}
              value={draftMinPrice}
              onChange={(event) =>
                setDraftMinPrice(Number(event.target.value))
              }
              aria-label="Minimum price slider"
              className="mt-3 w-full accent-purple-600"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-neutral-800">
              Maximum price
            </span>

            <input
              type="number"
              min={0}
              max={PRICE_LIMIT}
              step={100}
              value={draftMaxPrice}
              onChange={(event) => {
                const value = event.currentTarget.valueAsNumber;
                setDraftMaxPrice(
                  Number.isFinite(value)
                    ? Math.min(PRICE_LIMIT, Math.max(0, value))
                    : 0
                );
              }}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white p-3 text-base outline-none focus:border-purple-500"
            />

            <input
              type="range"
              min={0}
              max={PRICE_LIMIT}
              step={100}
              value={draftMaxPrice}
              onChange={(event) =>
                setDraftMaxPrice(Number(event.target.value))
              }
              aria-label="Maximum price slider"
              className="mt-3 w-full accent-purple-600"
            />
          </label>
        </div>

        <div className="mt-5 rounded-xl bg-white p-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-neutral-500">Selected range</span>
            <span className="font-bold text-purple-700">
              {formatPrice(draftMinPrice)} – {formatPrice(draftMaxPrice)}
            </span>
          </div>
        </div>

        {draftMinPrice > draftMaxPrice && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            Minimum price ही maximum price पेक्षा जास्त असू शकत नाही.
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-white"
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={draftMinPrice > draftMaxPrice}
            className="min-h-11 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterPanel;
