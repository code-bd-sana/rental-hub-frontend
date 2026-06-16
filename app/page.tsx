export default function Home() {
  return (
    <main className="wrap py-10">
      <div className="bg-paper p-8 rounded-2xl shadow-custom border border-line">
        <h1 className="text-purple text-4xl mb-4 font-sans">
          Phase 1 Complete
        </h1>
        <p className="text-muted mb-6">
          Directory structures are ready, global CSS is mapped, and assets have been extracted.
        </p>
        <button className="btn primary">
          Let&apos;s Go to Phase 2
        </button>
      </div>
    </main>
  );
}
