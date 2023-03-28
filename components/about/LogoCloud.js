export default function LogoCloud({ sectionName, entities }) {
  return (
    <div className="py-12 w-full">
      <div className="max-w-7xl mx-auto text-black pb-8 px-6">
        <p className="text-5xl font-bold">{sectionName}</p>
      </div>       
      <div className="mx-6 sm:mx-auto max-w-7xl px-6">
        <div className="-mx-6 grid grid-cols-2 gap-2 overflow-hidden sm:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {entities.map((entity, _) => {
            return (
              <a className="rounded-md bg-white shadow-sm p-3 sm:p-6 sm:hover:grayscale-0 sm:grayscale" href={entity.url} key={entity.name}>
                <img
                  className="max-h-24 w-full object-contain h-24"
                  src={entity.logo.sourceUrl}
                  alt={entity.name}
                  width={210}
                  height={64}
                />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}