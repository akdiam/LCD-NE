export default function LogoCloud({ sectionName, entities }) {
  return (
    <div className="py-16 sm:py-32 w-full">
      <div className="max-w-6xl mx-auto text-black pb-8 px-6">
        <p className="text-5xl font-bold">Members</p>
      </div>       
      <div className="mx-6 sm:mx-auto max-w-6xl px-6">
        <div className="-mx-6 grid grid-cols-2 gap-2 overflow-hidden sm:mx-0 md:grid-cols-3">
          {entities.map((entity, _) => {
            return (
              <a className="rounded-md bg-white shadow-sm p-6 sm:p-10 sm:hover:grayscale-0 sm:grayscale" href={entity.url} key={entity.name}>
                <img
                  className="max-h-16 w-full object-contain"
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