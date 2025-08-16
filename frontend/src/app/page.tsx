import Image from "next/image";
import Link from "next/link"; // Використовуємо Link для навігації Next.js

export default function Home() {
  return (
      

      <main className=" flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12">
        {/* Hero Section */}
        <section className="text-center mb-16 mt-8 w-full max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-neutral-900">
            ДИЗАЙН, ЩО НАДИХАЄ
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Створіть простір, який відображає вашу індивідуальність. Відкрийте для себе колекцію, що поєднує функціональність та естетику.
          </p>
          <Link href="/shop" className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-amber-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            Дослідити Колекцію
          </Link>
        </section>

        {/* Three Column Section */}
        <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Column 1 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://placehold.co/600x400/F3F4F6/6B7280?text=Затишок+та+Стиль"
              alt="Затишок та Стиль"
              width={600}
              height={400}
              className="rounded-lg shadow-md mb-4 object-cover w-full h-auto transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              priority
            />
            <p className="text-base text-neutral-700 mb-2 font-semibold">
              Створюємо затишок у кожній деталі
            </p>
            <p className="text-sm text-neutral-500">
              Наші товари ретельно відібрані, щоб додати тепла та стилю вашому дому.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://placehold.co/600x400/F3F4F6/6B7280?text=Якість+та+Інновації"
              alt="Якість та Інновації"
              width={600}
              height={400}
              className="rounded-lg shadow-md mb-4 object-cover w-full h-auto transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              priority
            />
            <p className="text-base text-neutral-700 mb-2 font-semibold">
              Подорож до виняткової якості
            </p>
            <p className="text-sm text-neutral-500">
              Ми віримо, що якість є основою комфорту та довговічності.
            </p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://placehold.co/600x400/F3F4F6/6B7280?text=Унікальний+Дизайн"
              alt="Унікальний Дизайн"
              width={600}
              height={400}
              className="rounded-lg shadow-md mb-4 object-cover w-full h-auto transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              priority
            />
            <p className="text-base text-neutral-700 mb-2 font-semibold">
              Неперевершений стиль для вашого простору
            </p>
            <p className="text-sm text-neutral-500">
              Відкрийте для себе унікальні предмети, що перетворять ваш дім.
            </p>
          </div>
        </section>
      </main>

      
  );
}
