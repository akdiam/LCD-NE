import { AnimatedHeader } from "../common/AnimatedHeader"

export default function LeadershipWidget({ executiveDirector, operationsManager, execCommittee }) {
  return (
    <div className="bg-secondary py-24 sm:py-36 w-full">
      <div className="max-w-6xl mx-auto grid gap-y-10 sm:gap-y-20 gap-x-8 px-6 xl:grid-cols-3">
        <AnimatedHeader text='Our Team' textColor='text-white' textSize='text-6xl' underlineColor='text-yellow-300' />
        <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <LeaderCard 
            titleColor='text-yellow-300' 
            headshotSrc={executiveDirector.headshotImage.sourceUrl} 
            name={executiveDirector.name}
            title={'Executive Director'}
          />
          <LeaderCard 
            titleColor='text-yellow-300' 
            headshotSrc={operationsManager.headshotImage.sourceUrl} 
            name={operationsManager.name}
            title={'Operations Manager'} 
          />
        </ul>
        <AnimatedHeader text='Executive Committee' textColor='text-white' textSize='text-6xl' underlineColor='text-yellow-300' />
        <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {execCommittee.map((exec) => (
            <LeaderCard
              key={exec.name}
              titleColor='text-yellow-100' 
              headshotSrc={exec.headshotImage.sourceUrl} 
              name={exec.name} 
              title={exec.lcdPositionTitle}
              employer={exec.company}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

const LeaderCard = ({ titleColor, headshotSrc, name, title, employer }) => {
  return (
    <li key={name}>
      <div className="flex sm:items-center gap-x-6 flex-col sm:flex-row">
        <img className="h-48 hover:saturate-100 bg-gradient-to-b from-slate-800 to-transparent transition duration-100 ease-in w-full sm:h-64 sm:w-48 rounded-md object-cover" 
             src={headshotSrc} alt={name} />
        <div className="pt-2 sm:pt-0">
          <div className="text-base sm:text-2xl font-semibold leading-7 tracking-tight text-white">{name}</div>
          <div  className={`${titleColor} text-xs sm:text-sm font-normal leading-6 mt-0`}>{title}</div>
          {employer && <div className={`text-gray-400 text-xs sm:text-sm font-normal leading-6 mt-0`}>{employer}</div>}
        </div>
      </div>
    </li>
  )
}