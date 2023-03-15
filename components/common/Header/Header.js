import { useState } from 'react'
import { Cross as Hamburger } from 'hamburger-react';
import ExpandedNav from '../ExpandedNav';

const navOptions = [
  { name: 'About', href: '/about', current: false },
  { name: 'Membership', href: '/membership', current: false },
  { name: 'Opportunities', href: '/for-professionals-students', current: false },
  { name: 'Events', href: '/events', current: false },
]

export default function HeaderComponent({ lcdLogoUrl }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className='w-full fixed top-0 z-50'>
        <div className='font-bold flex flex-wrap mx-auto justify-between max-w-6xl px-6'>
          <div className='w-1/2'>
            <div className='mt-4 pt-4'>
              <a href='/'>
                <img src={lcdLogoUrl} className='h-12 sm:h-16' />
              </a>
            </div>
          </div>
          <div className='w-1/2 text-right my-auto pt-4'>
            <div className='float-right bg-yellow-300 p-1 w-14 h-14 rounded-full drop-shadow-md'>
              <Hamburger rounded color='#000a1f' direction='right' duration={0.2} onToggle={() => setIsNavOpen(!isNavOpen)} />
            </div>
          </div>
        </div>
      </div>
      <ExpandedNav show={isNavOpen} />
    </>
  )
}