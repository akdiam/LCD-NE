export default function HomeCtaHeader() {
  return (
    <div className="relative bg-white">
      <div className="relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <img
          className="h-full w-full object-contain"
          src="img_LCD_event-hug.png"
          alt=""
        />
      </div>
      <div className="relative mx-auto max-w-8xl py-24 sm:py-32 lg:py-40 lg:px-8">
        <div className="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <p className="mt-2 text-5xl font-bold tracking-tight text-black sm:text-7xl">Dedicated to building a legal community in which all lawyers can thrive and succeed.</p>
          <p className="mt-6 text-2xl leading-7 text-gray-900">
            Interested in learning more? Contact us below!
          </p>
          <div className="mt-8">
            <a
              href="/about"
              className="inline-flex rounded-md bg-yellow-400 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
