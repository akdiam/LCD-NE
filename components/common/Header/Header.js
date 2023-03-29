import { useEffect, useState } from 'react'
import { Cross as Hamburger } from 'hamburger-react';
import { motion } from 'framer-motion';

import ExpandedNav from '../ExpandedNav';

export default function HeaderComponent({ lcdLogoUrl }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLcdLogoVisible, setIsLcdLogoVisible] = useState(true);
  const [isInLogoRange, setIsInLogoRange] = useState(true);
  const [isMount, setIsMount] = useState(true);

  useEffect(() => {
    setIsMount(false);
    const handleScroll = window.addEventListener('scroll', () => {
      const currScrollPos = window.scrollY;

      if (currScrollPos > 50) {
        setIsLcdLogoVisible(false);
        setIsInLogoRange(false);
      } else {
        setIsLcdLogoVisible(true);
        setIsInLogoRange(true);
      }
    });

    return (() => window.removeEventListener('scroll', handleScroll));
  }, []);

  const toggleHamburger = () => {
    isNavOpen && !isInLogoRange 
      ? setIsLcdLogoVisible(false) 
      : setIsLcdLogoVisible(true);
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className='w-full fixed top-0 z-50'>
        <div className='font-bold flex flex-wrap mx-auto justify-between max-w-7xl px-6'>
          <div className='w-1/2'>
            <motion.div 
              className={`opacity-0 transition-opacity duration-50 ${!isLcdLogoVisible ? '' : 'opacity-100'} mt-4 pt-4`}
              animate={{ opacity: isLcdLogoVisible ? 1 : 0, y:isLcdLogoVisible ? 0 : isMount ? 0 : -15 }}
              initial={{ opacity: isMount ? 1 : 0, y: isMount ? 0 : -15 }}
              exit={{ opacity: isMount ? 1 : 0, y: 0, transition: { duration: 0.1 } }}
            >
              <a href='/'>
                <img src={lcdLogoUrl} className='h-12 sm:h-16' />
              </a>
            </motion.div>
          </div>
          <div className='w-1/2 text-right my-auto pt-4'>
            <div className='float-right bg-yellow-300 p-1 rounded-full drop-shadow-md'>
              <Hamburger 
                rounded 
                color='#000a1f' 
                size={26} 
                direction='right' 
                duration={0.2} 
                onToggle={toggleHamburger} 
              />
            </div>
          </div>
        </div>
      </div>
      <ExpandedNav show={isNavOpen} />
    </>
  )
}