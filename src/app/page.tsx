import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
   <div className="relative h-screen w-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <div className="fixed inset-0 w-full h-full -z-10">
        <Spline
          scene="https://prod.spline.design/uMTAOmqSa2pGMCzF/scene.splinecode"  
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-6">
        <main className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md dark:drop-shadow-lg transition-all duration-300">
            Welcome to Telepathia-AI
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Let the AI chat for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="rounded-full bg-white text-black border border-transparent transition-all duration-300 ease-out transform hover:scale-105 hover:bg-black hover:text-white hover:border-white flex items-center justify-center gap-2 px-6 py-3 font-medium shadow-lg"
              href="/chatting"
            >
              Get started
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
