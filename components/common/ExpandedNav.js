import { navigation } from "./Footer";
import { Transition } from "@headlessui/react";

export default function ExpandedNav({ show }) {
  return (
    <div className={`flex flex-wrap bg-secondary transition-all duration-100 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'} overflow-y-scroll fixed top-0 w-screen h-screen z-40`}>
      <ul className="m-auto">
        {navigation.main.map((page, _) => (
          <a href={page.href} key={page.name}>
            <li className="text-2xl lg:text-3xl lg:font-bold py-4 px-2 hover:bg-slate-700 transition duration-50 ease-in-out rounded-md">
              {page.name}
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}