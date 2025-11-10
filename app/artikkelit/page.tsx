import { Header } from "../components/Header";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export const metadata = {
  title: "Artikkelit - Arkiapuri",
  description:
    "Löydä inspiraatiota ja hyödyllisiä vinkkejä blogista ja resepteistä",
};

export default function ArtikkelitPage() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6513624758655536"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Header
        pageTitle="Artikkelit"
        coverImage={{
          url: "https://images.ctfassets.net/2pij69ehhf4n/jyX6yWARpgK7rueTB6zIO/265d4d4036ae4fe4b322302a9a83a5eb/pexels-mikhail-nilov-6969811.jpg",
          description: "Artikkelit header image",
        }}
        objectPosition="center"
      />
      <main className="flex-grow animate-fade-in">
        <div className="container mx-auto px-5 pt-10 md:pt-14 pb-10 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <div className="text-xl leading-relaxed mb-10 md:mb-12">
              Tervetuloa Arkiapuri-blogin artikkeleihin! Täältä löydät sekä
              blogikirjoituksia että herkullisia reseptejä arjen
              sujuvoittamiseen.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Blogi Card */}
              <Link href="/artikkelit/blogi">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="https://images.ctfassets.net/2pij69ehhf4n/7tNL9fyMcfXfQmsUvIxgze/50e2d0a7728d68f556717f9874a3c8f8/pexels-picjumbo-com-55570-196649.jpg"
                      alt="Blogi"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      Blogi
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Lue blogikirjoituksia arjen sujuvoittamisesta, vinkkejä
                      ruokahuollon helpottamiseen ja muita hyödyllisiä
                      artikkeleja.
                    </p>
                    <div className="mt-6 text-primary font-semibold flex items-center gap-2">
                      Tutustu blogikirjoituksiin
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Reseptit Card */}
              <Link href="/artikkelit/reseptit">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="https://images.ctfassets.net/2pij69ehhf4n/zPEHlmsQhspd7kMidWon0/e3253ea774aeba21f1965e766009a598/pexels-xmtnguyen-2664216.jpg"
                      alt="Reseptit"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      Reseptit
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Tutustu helppoihin ja maukkaisi resepteihin arjen
                      ruoanlaittoon. Löydät täältä monipuolisia ruokaohjeita.
                    </p>
                    <div className="mt-6 text-primary font-semibold flex items-center gap-2">
                      Tutustu resepteihin
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
