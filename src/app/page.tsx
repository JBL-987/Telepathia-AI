"use client";
import { useLayoutEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const containerRef = useRef(null);
  const splineRef = useRef(null);
  const headerRef = useRef(null);

  const handleGetStarted = () => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Wallet Not Connected",
        text: "Please connect your wallet first!",
      });
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for the hero section (Spline and header)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          start: "top top",
          end: "+=1000px",
          pin: headerRef.current,
          pinSpacing: false,
        },
      });

      // Clip-path animation for Spline background
      tl.from(splineRef.current, {
        clipPath: "inset(15%)",
        filter: "brightness(60%)",
        ease: "none",
      })
        .to(splineRef.current, {
          scale: 0.8,
          duration: 0.5,
        }, 0);

      // Animate header text
      gsap.fromTo(
        headerRef.current.querySelector("h1"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Section animations
      gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const SectionCard = ({ id, title, content }: { id: string; title: string; content: string }) => (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center bg-black text-white px-4"
    >
      <Card className="max-w-md w-full shadow-2xl rounded-2xl border-white/10 border backdrop-blur-sm bg-white/5">
        <CardHeader>
          <CardTitle className="text-white text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">{content}</CardContent>
      </Card>
    </section>
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-x-hidden font-[family-name:var(--font-geist-sans)]"
    >
      <div
        ref={headerRef}
        className="relative z-10 flex flex-col items-center justify-center h-screen p-6"
      >
        <main className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div ref={splineRef} className="fixed inset-0 w-full h-full -z-10">
            <Spline
              scene="https://prod.spline.design/uMTAOmqSa2pGMCzF/scene.splinecode"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
            Welcome to Telepathia-AI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-lg">
            Let the AI chat for you.
          </p>
          <button
            className="rounded-full bg-white text-black border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 px-8 py-3 font-medium shadow-xl hover:scale-105 active:scale-95 focus:outline-none"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </main>
      </div>

      <SectionCard
        id="about-us"
        title="About Us"
        content="Telepathia-AI is an AI chat assistant built with love and Web3 tech."
      />
      <SectionCard
        id="privacy-policy"
        title="Privacy Policy"
        content="Your data is yours. We don’t store conversations on central servers."
      />
      <SectionCard
        id="licensing"
        title="Licensing"
        content="All assets used are under MIT or free commercial license."
      />
      <SectionCard
        id="contact"
        title="Contact"
        content="Get in touch at team@telepathia.ai or find us on Twitter @TelepathiaAI"
      />
    </div>
  );
}