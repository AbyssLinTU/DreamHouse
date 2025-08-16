import React from 'react';
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans flex flex-col">

      <main className="flex-1 flex flex-col items-center p-4 sm:p-8 lg:p-12">
        <section className="text-center mb-16 mt-8 w-full max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-neutral-900">
            CONTACT US
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
           {`We'd`} love to hear from you! Whether you have a question about our products, need assistance with an order, or just want to share your feedback, our team is ready to help.
          </p>
        </section>

        <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Left Column: Contact Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wider">CONTACT</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-6">Get in Touch</h2>
            <p className="text-lg text-neutral-600 mb-8">
              {`We're`} here to help! If you have any questions, feedback, or need assistance, please {`don't`} hesitate to reach out to us.
            </p>

            <div className="space-y-6">
              <div className="flex items-start justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m11.314-10.314A7.49 7.49 0 0012 10a7.49 7.49 0 00-5.318 2.193m11.314-10.314a7.49 7.49 0 010 10.626M9 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-lg font-semibold text-neutral-800">Our office</p>
                  <p className="text-neutral-600">1875 DreamHouse Ave 10th Floor, AW,</p>
                  <p className="text-neutral-600">Washington, District of America</p>
                </div>
              </div>

              <div className="flex items-start justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v7a2 2 0 002 2h14a2 2 0 002-2v-7m-18 0H3" />
                </svg>
                <div>
                  <p className="text-lg font-semibold text-neutral-800">Get in touch</p>
                  <p className="text-neutral-600"><a href="mailto:hello@dreamhouse.com" className="text-amber-600 hover:underline">hello@dreamhouse.com</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col w-full bg-neutral-100 p-8 rounded-lg shadow-md">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-neutral-800 mb-2">
                  NAME (required)*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name please"
                  className="w-full p-3 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-neutral-800 mb-2">
                  Email (required)*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address please"
                  className="w-full p-3 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-neutral-800 mb-2">
                  Your Message (required)*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Enter your message please"
                  className="w-full p-3 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>

    </div>
  );
}
