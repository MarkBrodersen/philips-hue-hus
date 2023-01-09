import RoomsList from '../templates/RoomsList'
import { PlusIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Container from '../components/Container'

export default function Rooms() {
	const [openNewRoom, setOpenNewRoom] = useState(false)

	return (
		<div className='relative p-4 grid md:grid-cols-3 gap-6'>
			<div className='flex flex-col gap-6'>
				<div className='flex items-end justify-between'>
					<h1 className='text-4xl font-bold'>Rooms</h1>
					<motion.button
						animate={{
							rotate: openNewRoom ? 45 : 0,
							transition: { type: 'spring', stiffness: 300, damping: 20 },
						}}
						onClick={() => setOpenNewRoom(!openNewRoom)}
						className='p-1'
					>
						<PlusIcon className='w-8 h-8 stroke-2 text-stone-500' />
					</motion.button>
				</div>
				<RoomsList includeAdd setOpen={setOpenNewRoom} />
			</div>
			<div className='md:col-span-2'>
				<AnimatePresence>
					{openNewRoom && (
						<motion.div
							initial={{ y: 24, opacity: 0 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 24 }}
							className='fixed md:relative top-20 md:top-0 left-0 w-full h-fit'
						>
							{/* <Container bgBlur> */}
							<div className='shadow-container rounded-3xl bg-stone-800 flex flex-col gap-4 p-6'>
								<h1 className='text-3xl font-bold'>New Room</h1>
							</div>
							{/* </Container> */}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
