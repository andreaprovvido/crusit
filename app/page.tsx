export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
        CRUSIT
      </h1>

      <p className="mt-6 text-xl text-gray-300 text-center max-w-2xl">
        Discover cruising spots worldwide.
      </p>

      <p className="mt-4 text-gray-500 text-center max-w-xl">
        A global community map for discovering, sharing and reviewing cruising locations.
      </p>

      <button className="mt-10 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition">
        Coming Soon
      </button>
    </main>
  );
}