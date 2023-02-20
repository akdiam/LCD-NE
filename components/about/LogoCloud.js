export default function LogoCloud({ sectionName, entities }) {
  return (
    <div className="bg-white py-16 sm:py-16 my-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-8 text-gray-900">
            {sectionName}
          </h2>
          <div className="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
            {entities.map((entity, _) => {
              return (
                <a href={entity.url} key={entity.name}>
                  <img
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    src={entity.logo.sourceUrl}
                    alt={entity.name}
                    width={158}
                    height={48}
                  />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}