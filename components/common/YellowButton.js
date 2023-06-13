import { motion } from 'framer-motion';

export default function YellowButton({ text, href, color='bg-yellow-300', textColor='black', isBold=false }) {
  return (
    <a className='text-black font-normal' href={href}>
      <motion.button
        whileHover={{
          scale: 1.04,
          transition: { duration: 0.2, type: 'spring' },
        }}
        whileTap={{ scale: 0.90, transition: { duration: 0.1, type: 'spring', stiffness: 100 } }}
        className={`${color} py-3 px-5 rounded-md`}
      >
        <span className={`text-${textColor} ${isBold && 'font-bold'}`}>
          {text}
        </span>
      </motion.button>
    </a>
  )
}