const people = [
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  // More people...
]

export default function BoardOfDirectorsList({ members }) {
  return (
    <div className="w-full bg-blue-700">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-32 border-t-4 border-yellow-300 animated-border">
        <div className="text-black">
          <p className="text-6xl font-bold text-white pb-10">Board of Directors</p>
        </div>
        <ul role="list" className="grid gap-x-6 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-y-16 xl:col-span-2">
          {members.map((member) => (
            <li key={member.name}>
              <div className="flex gap-x-6 flex-col">
                <img className="h-52 bg-gradient-to-b from-white to-transparent transition duration-100 ease-in hover:bg-yellow-200 w-full sm:h-64 lg:h-72 sm:w-full rounded-md object-cover shadow-sm" src={member.headshotImage.sourceUrl} alt="" />
                <div className="pt-2 sm:pt-4">
                  <h3 className="text-base sm:text-lg font-semibold leading-8 tracking-tight text-white">{member.name}</h3>
                  <p className="text-xs sm:text-sm font-thin leading-2 sm:leading-6 text-gray-300 mt-0">{member.company}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}