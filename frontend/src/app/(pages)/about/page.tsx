import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
     <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12">
        <section className="text-center mb-16 mt-8 w-full max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-neutral-900">
            ABOUT US
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Welcome to DREAMHOUSE – your source of inspiration for creating the perfect home.
          </p>
        </section>

        <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
          <div className="flex flex-col items-center text-center md:text-left">
            <Image
              src="https://placehold.co/600x400/F3F4F6/6B7280?text=Our+Mission"
              alt="Our Mission"
              width={600}
              height={400}
              className="rounded-lg shadow-md mb-6 object-cover w-full h-auto transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              priority
            />
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Mission</h2>
            <p className="text-lg text-neutral-600 mb-4">
              {`At DREAMHOUSE, we believe that a home is more than just a place. It's a space where you relax, create, and live. Our mission is to provide you with unique and high-quality home goods that will help transform any space into a true dream home. We strive to inspire you to create interiors that reflect your individuality and style.`}
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:text-left">
            <Image
              src="https://placehold.co/600x400/F3F4F6/6B7280?text=Our+Values"
              alt="Our Values"
              width={600}
              height={400}
              className="rounded-lg shadow-md mb-6 object-cover w-full h-auto transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              priority
            />
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Values</h2>
            <ul className="text-lg text-neutral-600 space-y-3 list-disc list-inside">
              <li><b >Quality:</b> We carefully select each supplier to guarantee the high quality of every product.</li>
              <li><b >Design:</b> We offer only those items that combine functionality with unparalleled style.</li>
              <li><b>Inspiration:</b> We strive to be a source of ideas and solutions for your home.</li>
              <li><b>Customer Focus:</b> Your comfort and satisfaction are our top priority.</li>
            </ul>
          </div>
        </section>

        <section className="text-center mt-16 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Team</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Behind DREAMHOUSE is a team of enthusiasts passionate about design and creating coziness. We are constantly looking for new trends and innovative solutions to offer you the best.
          </p>
        </section>
      </main>
  );
}
