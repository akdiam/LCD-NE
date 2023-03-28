import { navigation } from "./Footer";

export default function ExpandedNav({ show }) {
  return (
    <div className={`flex flex-wrap bg-secondary transition-all duration-100 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'} overflow-y-scroll fixed top-0 w-screen h-screen z-40`}>
      <ul className="m-auto">
        {navigation.main.map((page, _) => (
          <div key={page.name} className="no-underline">
            <a href={page.href}>
              <li className="text-xl lg:text-3xl font-semibold py-4 px-2 hover:bg-slate-700 rounded-md text-yellow-300">
                {page.name}
              </li>
            </a>
          </div>
        ))}
      </ul>
    </div>
  )
}