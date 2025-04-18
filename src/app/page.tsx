"use client";
import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Swal from 'sweetalert2';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleGetStarted = () => {
    if (isConnected) {
      router.push('/dashboard');
    } else {
      Swal.fire({
        icon: "error",
        title: "Wallet Not Connected",
        text: "Please connect your wallet first!",
      });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-6">
        <main className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="fixed inset-0 w-full h-full -z-10">
            <Spline
            scene="https://prod.spline.design/uMTAOmqSa2pGMCzF/scene.splinecode"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          </div>
        {isLoading && (
          <div className="absolute inset-0 bg-black z-40 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading 3D model...</div>
          </div>
        )}
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
    </div>
  );
}