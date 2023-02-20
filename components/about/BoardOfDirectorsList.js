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
    <div className="bg-white pb-24 sm:py-12 my-4">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-6xl lg:mx-0">
          <h2 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Board of Directors</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The LCD Board of Directors is a collective of like-minded individuals who are committed to being catalysts for change in the legal profession. Comprised of leaders from our member organizations and representative of the diversity we want to see throughout Connecticut, our board members have chosen to take an active role in ensuring the success of our overall mission and goals.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-y-16 gap-x-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {members.map((member, _) => (
            <li key={member.name}>
              <img className="mx-auto h-32 w-32 rounded-xl" src={member.headshotImage.sourceUrl} alt="" />
              <h3 className="mt-2 text-base font-semibold leading-7 tracking-tight text-gray-900">{member.name}</h3>
              <p className="text-sm leading-6 text-gray-600">{member.company}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}