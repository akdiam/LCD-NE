import { useEffect } from 'react';
import { AnimatedHeader } from '../common/AnimatedHeader';

export default function BoardOfDirectorsList({ members }) {
  return (
    <div className="w-full bg-blue-700">
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-36 animated-border">
        <div className='sm:max-w-xl'>
          <AnimatedHeader text="Board of Directors" textSize="text-6xl" textColor="text-white" underlineColor="text-yellow-300" />
        </div>
        <ul role="list" className="grid gap-x-6 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-y-16 xl:col-span-2 pt-8">
          {members.map((member) => (
            <li key={member.name}>
              <div className="flex gap-x-6 flex-col">
                <img className="h-52 saturate-50 hover:saturate-100 bg-gradient-to-b from-white to-transparent transition duration-100 ease-in hover:bg-yellow-200 w-full sm:h-64 lg:h-72 sm:w-full rounded-md object-cover shadow-sm" src={member.headshotImage.sourceUrl} alt="" />
                <div className="pt-2 sm:pt-4">
                  <h3 className="text-base sm:text-lg font-semibold leading-8 tracking-tight text-white leading-normal">{member.name}</h3>
                  <p className="text-xs sm:text-sm font-thin leading-2 sm:leading-6 text-gray-300 mt-1">{member.company}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}