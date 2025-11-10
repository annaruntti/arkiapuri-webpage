import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="container mx-auto px-5 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-300 mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Täällä ei ole mitään
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Hakemaasi sivua ei löytynyt. Sivua ei ole olemassa tai se on
            siirretty.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors duration-300"
          >
            Palaa etusivulle
          </Link>
        </div>
      </div>
    </main>
  );
}

