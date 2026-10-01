import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useProductGridReveal(products: unknown[]) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid || products.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ".product-reveal-card",
        grid,
      );

      if (cards.length === 0) {
        return;
      }

      // Group cards into their actual responsive rows
      const rows: HTMLElement[][] = [];

      cards.forEach((card) => {
        const existingRow = rows.find(
          (row) => Math.abs(row[0].offsetTop - card.offsetTop) < 5,
        );

        if (existingRow) {
          existingRow.push(card);
        } else {
          rows.push([card]);
        }
      });

      rows.forEach((row, rowIndex) => {
        /*
         * First row is already visible when the page opens.
         * Don't hide it behind the scrub animation.
         */
        if (rowIndex === 0) {
          gsap.set(row, {
            opacity: 1,
            y: 0,
            scale: 1,
          });

          return;
        }

        gsap.set(row, {
          opacity: 0,
          y: 50,
          scale: 0.98,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row[0],
            start: "top 85%",
            end: "top 55%",
            scrub: 0.8,
          },
        });

        timeline.to(row, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.35,
          ease: "power2.out",
        });
      });
    }, grid);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [products]);

  return gridRef;
}

export default useProductGridReveal;