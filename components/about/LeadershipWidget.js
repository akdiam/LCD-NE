const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export default function LeadershipWidget({ executiveDirector, operationsManager, execCommittee }) {
  (executiveDirector)
  return (
    <div className="bg-secondary py-16 sm:py-32 w-full">
      <div className="max-w-6xl mx-auto grid gap-y-10 sm:gap-y-20 gap-x-8 px-6 xl:grid-cols-3">
        <div className="max-w-2xl text-white">
          <p className="text-6xl font-bold">Leadership</p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <li key={executiveDirector.name}>
            <div className="flex sm:items-center gap-x-6 flex-col sm:flex-row">
              <img className="h-48 bg-gradient-to-b from-slate-800 to-transparent w-full sm:h-64 sm:w-48 rounded-md object-cover" src={executiveDirector.headshotImage.sourceUrl} alt="" />
              <div className="pt-2 sm:pt-0">
                <h3 className="text-base sm:text-2xl font-semibold leading-7 tracking-tight text-white">{executiveDirector.name}</h3>
                <p className="text-xs sm:text-sm font-normal leading-6 text-yellow-300 mt-0">{executiveDirector.lcdPositionTitle}</p>
              </div>
            </div>
          </li>
          <li key={operationsManager.name}>
            <div className="flex sm:items-center gap-x-6 flex-col sm:flex-row">
              <img className="h-48 bg-gradient-to-b from-slate-800 to-transparent w-full sm:h-64 sm:w-48 rounded-md object-cover" src={operationsManager.headshotImage.sourceUrl} alt="" />
              <div className="pt-2 sm:pt-0">
                <h3 className="text-base sm:text-2xl font-semibold leading-7 tracking-tight text-white">{operationsManager.name}</h3>
                <p className="text-xs sm:text-sm font-normal leading-6 text-yellow-300 mt-0">{operationsManager.lcdPositionTitle}</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="max-w-6xl text-white">
          <p className="text-6xl font-bold">Executive Committee</p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {execCommittee.map((exec) => (
            <li key={exec.name}>
              <div className="flex sm:items-center gap-x-6 flex-col sm:flex-row">
                <img className="h-48 bg-gradient-to-b from-slate-800 to-transparent w-full sm:h-64 sm:w-48 rounded-md object-cover" src={exec.headshotImage.sourceUrl} alt="" />
                <div className="pt-2 sm:pt-0">
                  <h3 className="text-base sm:text-2xl font-semibold leading-7 tracking-tight text-white">{exec.name}</h3>
                  <p className="text-xs sm:text-sm font-normal leading-6 text-yellow-100 mt-0">{exec.lcdPositionTitle}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}