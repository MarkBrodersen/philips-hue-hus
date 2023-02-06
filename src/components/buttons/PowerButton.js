import { motion } from 'framer-motion'
import { PowerIcon } from '@heroicons/react/24/outline'

export default function PowerButton({ action, all, any }) {
	return (
		<motion.button
			onClick={action}
			animate={{
				background: all ? '#F472B6' : any ? '#BE185D' : '#44403C',
				color: all ? '#1C1917' : any ? '#F9A8D4' : '#F9A8D480',
				boxShadow: all
					? '0px 2px 16px #831843, 0px 2px 32px #F9A8D470, inset 0px -1px 2px rgba(255, 255, 255, 0.6), inset 0px 4px 8px rgba(253, 242, 248, 0.5), inset 0px -4px 8px rgba(190, 24, 93, 0.3), inset 0px -8px 16px rgba(190, 24, 93, 0.25)'
					: any
					? '0px 8px 32px rgba(190, 24, 93, 0.25), inset 0px -1px 2px rgba(255, 255, 255, 0.4), inset 0px 4px 8px rgba(253, 242, 248, 0.3), inset 0px -4px 8px rgba(190, 24, 93, 0.3), inset 0px -8px 16px rgba(190, 24, 93, 0.25)'
					: '0px 8px 32px rgba(12, 10, 9, 0.25), inset 0px -1px 2px rgba(250, 250, 249, 0.15), inset 0px 4px 8px rgba(250, 250, 249, 0.1), inset 0px -4px 8px rgba(28, 25, 23, 0.25), inset 0px -8px 16px rgba(28, 25, 23, 0.25)',
			}}
			className='btn rounded-full z-30 bg-pink-300 h-16 w-16 md:w-12 md:h-12 shadow-pinkglow flex items-center justify-center'
		>
			<PowerIcon
				strokeWidth={3}
				className='h-7 w-7 md:h-6 md:w-6 pointer-events-none'
			/>
		</motion.button>
	)
}
