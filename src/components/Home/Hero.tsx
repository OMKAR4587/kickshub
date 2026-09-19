import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import firstImg from '../../assets/products/air-runner.png';
import secondImg from '../../assets/products/street-one.png';
import ThirdImg from '../../assets/products/flux-01.png';
import FourthImg from '../../assets/products/motion-x.png';

import gsap from "gsap";

type HeroShoe = {
  id: number;
  name: string;
  image: string;
  label: string;
  price: string;
};

const heroShoes: HeroShoe[] = [
  {
    id: 1,
    name: "Air Runner",
    image:firstImg,
    label: "New Drop",
    price: "$180",
  },
  {
    id: 2,
    name: "Street One",
    image:secondImg,
    label: "Streetwear",
    price: "$165",
  },
  {
    id: 3,
    name: "Flux 01",
    image: ThirdImg,
    label: "Trending",
    price: "$195",
  },
  {
    id: 4,
    name: "Motion X",
    image: FourthImg,
    label: "Limited",
    price: "$210",
  },
];

function Hero() {
  const [currentShoe, setCurrentShoe] = useState(0);

  const heroRef = useRef<HTMLElement | null>(null);
  const sneakerRef = useRef<HTMLImageElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const activeShoe = heroShoes[currentShoe];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .from(".hero-background", {
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".hero-eyebrow",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            yPercent: 100,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.2",
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.4",
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".hero-sneaker",
          {
            opacity: 0,
            scale: 0.75,
            rotation: -8,
            x: 50,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.7",
        )
        .from(
          ".hero-decoration",
          {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.06,
          },
          "-=0.5",
        );

      // Floating sneaker animation
      gsap.to(sneakerRef.current, {
        y: -10,
        rotation: 2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Rotating ring
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Automatically switch sneakers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShoe((prev) => (prev + 1) % heroShoes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate sneaker whenever currentShoe changes
  useEffect(() => {
    const image = sneakerRef.current;

    if (!image) return;

    gsap.killTweensOf(image);

    gsap.fromTo(
      image,
      {
        opacity: 0,
        scale: 0.88,
        x: 35,
        rotation: -5,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );

    // Continue floating after entrance
    gsap.to(image, {
      y: -10,
      rotation: 2,
      duration: 2.8,
      delay: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [currentShoe]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#f8fafc]"
    >
      {/* =========================
          BACKGROUND
      ========================== */}
      <div
        className="hero-background pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Blue glow */}
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-400/15 blur-[90px] sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

        {/* Purple glow */}
        <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-purple-400/15 blur-[100px] sm:h-96 sm:w-96 lg:h-[30rem] lg:w-[30rem]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-10rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[90px] sm:h-96 sm:w-96" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#111827 1px, transparent 1px),
              linear-gradient(90deg, #111827 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* =========================
          MAIN CONTAINER
      ========================== */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid
            items-center
            gap-8
            py-10
            sm:gap-10
            sm:py-10
            md:py-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-4
            lg:py-0
          "
        >
          {/* =========================
              CONTENT
          ========================== */}
          <div className="relative z-20">
            {/* Eyebrow */}
            <div className="hero-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md sm:mb-6 sm:px-4 sm:py-2">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />

                <span className="relative inline-flex h-full w-full rounded-full bg-blue-500" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px] sm:tracking-[0.25em]">
                New Drop · 2026
              </span>

              <Sparkles size={12} className="text-purple-500" />
            </div>

            {/* Heading */}
            <h1
              className="
                text-[4rem]
                font-black
                uppercase
                leading-[0.82]
                tracking-[-0.07em]
                text-neutral-950
                min-[400px]:text-[4.5rem]
                sm:text-7xl
                md:text-8xl
                lg:text-[6.5rem]
                xl:text-[7.5rem]
              "
            >
              <span className="block overflow-hidden">
                <span className="hero-title-line block">
                  Move
                </span>
              </span>

              <span className="block overflow-hidden">
                <span className="hero-title-line block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Different.
                </span>
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                hero-description
                mt-6
                max-w-md
                text-sm
                leading-6
                text-neutral-500
                sm:mt-7
                sm:text-base
                sm:leading-7
              "
            >
              Curated sneakers and streetwear for people who create their own
              lane. Discover the pairs built to stand out.
            </p>

            {/* Actions */}
            <div
              className="
                hero-actions
                mt-7
                flex
                flex-col
                gap-3
                min-[400px]:flex-row
                sm:mt-8
              "
            >
              <Link
                to="/products"
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-neutral-950
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-blue-600
                  min-[400px]:w-auto
                  sm:px-7
                  sm:py-4
                "
              >
                Shop the drop

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform duration-300 group-hover:rotate-45 sm:h-7 sm:w-7">
                  <ArrowUpRight size={14} />
                </span>
              </Link>

              <Link
                to="/products"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-neutral-200
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-neutral-800
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-purple-300
                  hover:shadow-lg
                  min-[400px]:w-auto
                  sm:px-7
                  sm:py-4
                "
              >
                Explore collection
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 flex items-center gap-6 sm:mt-10 sm:gap-8">
              <div>
                <p className="text-xl font-black text-neutral-950 sm:text-2xl">
                  24K+
                </p>

                <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:text-[9px]">
                  Sneakerheads
                </p>
              </div>

              <div className="h-7 w-px bg-neutral-200 sm:h-8" />

              <div>
                <p className="text-xl font-black text-neutral-950 sm:text-2xl">
                  120+
                </p>

                <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:text-[9px]">
                  Curated pairs
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              VISUAL
          ========================== */}
          <div
            className="
              relative
              flex
              min-h-80
              items-center
              justify-center
              sm:min-h-100
              md:min-h-120
              lg:min-h-140
            "
          >
            {/* Background text */}
            <div
              className="
                hero-decoration
                pointer-events-none
                absolute
                select-none
                text-[6rem]
                font-black
                uppercase
                leading-none
                tracking-[-0.08em]
                text-neutral-900/[0.035]
                min-[400px]:text-[7rem]
                sm:text-[10rem]
                md:text-[12rem]
                lg:text-[14rem]
              "
              aria-hidden="true"
            >
              KICKS
            </div>

            {/* Rotating ring */}
            <div
              ref={ringRef}
              className="
                hero-decoration
                absolute
                h-68
                w-68
                rounded-full
                border
                border-dashed
                border-neutral-300
                min-[400px]:h-76
                min-[400px]:w-76
                sm:h-100
                sm:w-100
                md:h-116
                md:w-116
                lg:h-130
                lg:w-130
              "
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40 sm:h-3 sm:w-3" />

              <span className="absolute bottom-[8%] right-[8%] h-1.5 w-1.5 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40 sm:h-2 sm:w-2" />
            </div>

            {/* Glow */}
            <div
              className="
                absolute
                h-52
                w-52
                rounded-full
                bg-gradient-to-br
                from-blue-400
                via-indigo-400
                to-purple-500
                opacity-25
                blur-3xl
                sm:h-72
                sm:w-72
                md:h-80
                md:w-80
              "
              aria-hidden="true"
            />

            {/* =========================
                ACTIVE SNEAKER
            ========================== */}
            <div
              className="
                hero-sneaker
                relative
                z-10
                w-[95%]
                max-w-[500px]
                sm:w-[90%]
                md:max-w-[560px]
                lg:max-w-[620px]
              "
            >
              <div className="relative">
                {/* Shadow */}
                <div
                  className="
                    absolute
                    bottom-[-4%]
                    left-1/2
                    h-8
                    w-[65%]
                    -translate-x-1/2
                    rounded-[50%]
                    bg-neutral-900/15
                    blur-xl
                    sm:h-12
                    sm:blur-2xl
                  "
                  aria-hidden="true"
                />

                <img
                  ref={sneakerRef}
                  src={activeShoe.image}
                  alt={activeShoe.name}
                  className="
                    relative
                    z-10
                    w-full
                    object-contain
                    drop-shadow-[0_25px_30px_rgba(15,23,42,0.18)]
                    sm:drop-shadow-[0_30px_35px_rgba(15,23,42,0.22)]
                  "
                />
              </div>
            </div>

            {/* =========================
                PRODUCT CARD
            ========================== */}
            <div
              className="hero-decoration absolute top-100 -left-44 max-h-fit  z-30  rounded-xl  border   border-white   bg-white/85  p-3  shadow-xl  shadow-neutral-900/10  backdrop-blur-xl  min-[400px]:w-48  sm:bottom-3  sm:w-52  sm:rounded-2xl  sm:p-4
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400 sm:text-[9px]">
                  Featured
                </span>

                <span className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-bold text-blue-600 sm:text-[9px]">
                  {activeShoe.label}
                </span>
              </div>

              <h3 className="mt-2 text-xs font-bold text-neutral-950 sm:mt-3 sm:text-sm">
                {activeShoe.name}
              </h3>

              <div className="mt-1.5 flex items-center justify-between sm:mt-2">
                <span className="text-[9px] text-neutral-400 sm:text-xs">
                  Limited drop
                </span>

                <span className="text-xs font-black text-neutral-950 sm:text-sm">
                  {activeShoe.price}
                </span>
              </div>
            </div>

            {/* Drop number */}
            <div className="hero-decoration absolute right-0 top-2 z-20 text-right sm:top-8">
              <span className="block text-3xl font-black tracking-[-0.08em] text-neutral-200 sm:text-5xl">
                {String(currentShoe + 1).padStart(2, "0")}
              </span>

              <span className="hidden text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 sm:block">
                Drop / {String(heroShoes.length).padStart(2, "0")}
              </span>
            </div>

            {/* Star */}
            <div
              className="hero-decoration absolute left-1 top-5 text-2xl text-blue-500 sm:left-8 sm:top-12 sm:text-4xl"
              aria-hidden="true"
            >
              ✦
            </div>

            {/* Plus */}
            <div
              className="hero-decoration absolute bottom-12 right-2 text-2xl font-light text-purple-500 sm:bottom-20 sm:right-8 sm:text-3xl"
              aria-hidden="true"
            >
              +
            </div>

            {/* SVG arrow */}
            <svg
              className="hero-decoration absolute -left-25 bottom-40 -rotate-12 hidden w-24 text-purple-400 sm:block md:w-34"
              viewBox="0 0 120 60"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 45C35 5 70 5 115 25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M100 15L115 25L103 36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-decoration absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 sm:flex">
        <ArrowDown size={13} className="animate-bounce" />
        Scroll to explore
      </div>

      {/* Vertical branding */}
      <div className="absolute bottom-8 right-4 hidden rotate-90 text-[9px] font-bold uppercase tracking-[0.5em] text-neutral-300 xl:block">
        KicksHub · Street Culture
      </div>
    </section>
  );
}

export default Hero;