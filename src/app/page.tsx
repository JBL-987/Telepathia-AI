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
  const sectionsRef = useRef([]);

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
      tl.from(splineRef.current, {
        clipPath: "inset(15%)",
        filter: "brightness(60%)",
        ease: "power2.out",
      })
      .to(splineRef.current, {
        scale: 0.8,
        duration: 0.1,
      }, 0)
      .to(headerRef.current.querySelector("h1"), {
        opacity: 0, 
        y: -50, 
        duration: 0.1,
      }, 0)
      .to(headerRef.current.querySelector("p"), {
        opacity: 0, 
        y: -50, 
        duration: 0.1,
      }, 0)
      .to(headerRef.current.querySelector("button"), {
        opacity: 0, 
        y: -50, 
        duration: 0.1,
      }, 0);

      gsap.utils.toArray("section").forEach((section, i) => {
        sectionsRef.current[i] = section;
        gsap.fromTo(
          section,
          { 
            opacity: 0, 
            y: 100, 
            scale: 0.95 
          },
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

  const SectionCard = ({ id, title, content }) => (
  <section
    id={id}
    className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative z-20"
  >
    <Card className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl h-screen md:h-5/6 shadow-2xl rounded-2xl border-white/10 border backdrop-blur-sm bg-white/5">
      <CardHeader className="md:p-8">
         <CardTitle className="text-white text-3xl md:text-4xl lg:text-5xl">{title}</CardTitle>
         </CardHeader>
      <CardContent className="text-gray-300 md:text-lg overflow-y-auto flex-grow">{content}</CardContent>
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

    <div className="relative z-10">
  <SectionCard
    id="about-us"
    title="About Us"
    content={
      <>
        <h3>Our Mission</h3>
        <p>Telepathia-AI is revolutionizing human-AI interaction through our advanced chat assistant built with cutting-edge Web3 technology. Founded in 2023, our team combines expertise in artificial intelligence, blockchain, and natural language processing to create secure, intuitive communication tools.</p>
        
        <h3>Our Vision</h3>
        <p>We envision a world where AI assistants respect privacy, empower individuals, and integrate seamlessly with decentralized technologies. Telepathia-AI strives to be at the forefront of this revolution, creating tools that enhance human potential while respecting personal autonomy.</p>
        
        <h3>Our Team</h3>
        <p>Our diverse team of AI researchers, blockchain developers, and UX specialists work together from our offices in Singapore and San Francisco. Led by our founders Dr. Eliza Chen and Marcus Wei, we're united by our passion for ethical AI development and Web3 innovation.</p>
      </>
    }
  />

  <SectionCard
    id="privacy-policy"
    title="Privacy Policy"
    content={
      <>
        <h3>Data Ownership</h3>
        <p>At Telepathia-AI, we believe your data belongs to you and only you. Unlike traditional AI services, we do not store conversations on central servers. Your interactions remain fully encrypted and stored locally or on your preferred decentralized storage solution.</p>
        
        <h3>No Data Mining</h3>
        <p>We will never mine your conversations for training data or marketing insights. Your communications with our AI assistant are private and will not be used to improve our models without your explicit, opt-in consent.</p>
        
        <h3>Transparency</h3>
        <p>Our privacy protocols are open-source and auditable by the community. We regularly publish transparency reports and invite independent security researchers to evaluate our systems.</p>
        
        <h3>Compliance</h3>
        <p>While embracing Web3 principles, Telepathia-AI complies with relevant data protection regulations including GDPR, CCPA, and other applicable privacy laws where our services are available.</p>
      </>
    }
  />

  <SectionCard
    id="licensing"
    title="Licensing"
    content={
      <>
        <h3>Software Licensing</h3>
        <p>Our core technology is available under dual licensing: open-source for non-commercial and research purposes, and enterprise licensing for commercial applications. This approach balances innovation with sustainability.</p>
        
        <h3>Asset Attribution</h3>
        <p>All assets used within Telepathia-AI platforms are properly licensed under MIT, Creative Commons, or commercial licenses. We maintain detailed attribution for all third-party components used in our products.</p>
        
        <h3>API Usage</h3>
        <p>Developers integrating with Telepathia-AI can access our API under tiered licensing options, from free developer accounts for experimentation to enterprise solutions with guaranteed uptime and support.</p>
        
        <h3>Token Economics</h3>
        <p>Our TPTH utility token powers certain advanced features and provides governance rights within the Telepathia ecosystem. Token holders enjoy premium features and participate in protocol governance decisions.</p>
      </>
    }
  />

  <SectionCard
    id="contact"
    title="Contact Us"
    content={
      <>
        <h3>General Inquiries</h3>
        <p>Email: team@telepathia.ai<br/>
        Twitter: @TelepathiaAI<br/>
        Discord: discord.telepathia.ai</p>
        
        <h3>Business Development</h3>
        <p>For partnership opportunities and enterprise solutions:<br/>
        Email: partnerships@telepathia.ai<br/>
        Schedule a call: calendly.com/telepathia-partnerships</p>
        
        <h3>Support</h3>
        <p>Technical support and customer service:<br/>
        Email: support@telepathia.ai<br/>
        Help Center: help.telepathia.ai<br/>
        Response Time: Within 24 hours</p>
        
        <h3>Office Locations</h3>
        <p>Singapore HQ: 60 Anson Road, #12-01, Singapore 079914<br/>
        San Francisco: 535 Mission St, 14th Floor, San Francisco, CA 94105</p>
      </>
    }
  />

  <SectionCard
    id="products"
    title="Our Products"
    content={
      <>
        <h3>Telepathia Chat</h3>
        <p>Our flagship AI assistant with unparalleled privacy features and Web3 integration, available on web, mobile, and as a browser extension.</p>
        
        <h3>Telepathia Protocol</h3>
        <p>The underlying decentralized infrastructure powering secure AI interactions across the web. Available for developers through our SDK.</p>
        
        <h3>Telepathia Enterprise</h3>
        <p>Custom AI solutions for businesses seeking private, secure alternatives to conventional AI assistants. Features include custom training, brand voice adaptation, and enterprise-grade security.</p>
        
        <h3>Telepathia DAO</h3>
        <p>Our decentralized governance structure allowing community members to shape the future of the protocol through transparent proposal and voting mechanisms.</p>
      </>
    }
  /> 
    </div>
  </div>
  );
}