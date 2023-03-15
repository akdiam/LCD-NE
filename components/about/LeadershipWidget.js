export default function LeadershipWidget({ executiveDirector, operationsManager, execCommittee }) {
  (executiveDirector)
  return (
    <div className="bg-secondary py-16 sm:py-32 w-full">
      <div className="max-w-6xl mx-auto grid gap-y-10 sm:gap-y-20 gap-x-8 px-6 xl:grid-cols-3">
        <div className="max-w-2xl text-white">
          <p className="text-6xl font-bold">Leadership</p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <LeaderCard 
            titleColor='text-yellow-300' 
            headshotSrc={executiveDirector.headshotImage.sourceUrl} 
            name={executiveDirector.name} 
            title={executiveDirector.lcdPositionTitle} 
          />
          <LeaderCard 
            titleColor='text-yellow-300' 
            headshotSrc={operationsManager.headshotImage.sourceUrl} 
            name={operationsManager.name} 
            title={operationsManager.lcdPositionTitle} 
          />
        </ul>
        <div className="max-w-6xl text-white">
          <p className="text-6xl font-bold">Executive Committee</p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {execCommittee.map((exec) => (
            <LeaderCard 
              key={exec.name}
              titleColor='text-yellow-100' 
              headshotSrc={exec.headshotImage.sourceUrl} 
              name={exec.name} 
              title={exec.lcdPositionTitle} 
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

const LeaderCard = ({ titleColor, headshotSrc, name, title }) => {
  return (
    <li key={name}>
      <div className="flex sm:items-center gap-x-6 flex-col sm:flex-row">
        <img className="h-48 bg-gradient-to-b from-slate-800 to-transparent transition duration-100 ease-in hover:bg-yellow-200 w-full sm:h-64 sm:w-48 rounded-md object-cover" 
             src={headshotSrc} alt={name} />
        <div className="pt-2 sm:pt-0">
          <h3 className="text-base sm:text-2xl font-semibold leading-7 tracking-tight text-white">{name}</h3>
          <p className={`${titleColor} text-xs sm:text-sm font-normal leading-6 mt-0`}>{title}</p>
        </div>
      </div>
    </li>
  )
}