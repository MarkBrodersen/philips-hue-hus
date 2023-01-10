import RoomsList from '../templates/RoomsList'
import { PlusIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Container from '../components/Container'
import Sheet from '../components/Sheet'

export default function Rooms() {
	const [openNewRoom, setOpenNewRoom] = useState(false)

	return (
		<div className='relative p-4 grid md:grid-cols-3 gap-6'>
			<div className='flex flex-col gap-6'>
				<div className='flex items-end justify-between'>
					<h1 className='text-4xl font-bold'>Rooms</h1>
					<AnimatePresence>
						{!openNewRoom && (
							<motion.button
								initial={{ rotate: -45, opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, rotate: 0, scale: 1 }}
								exit={{ opacity: 0, rotate: -45, scale: 0.5 }}
								// animate={{
								// 	rotate: openNewRoom ? 45 : 0,
								// 	transition: { type: 'spring', stiffness: 300, damping: 20 },
								// }}
								onClick={() => setOpenNewRoom(!openNewRoom)}
								className='p-1'
							>
								<PlusIcon className='w-8 h-8 stroke-2 text-stone-500' />
							</motion.button>
						)}
					</AnimatePresence>
				</div>
				<RoomsList includeAdd addAction={setOpenNewRoom} />
			</div>
			<div className='md:col-span-2'>
				<AnimatePresence>
					{/* {openNewRoom && (
						<motion.div
							initial={{ y: 24, opacity: 0 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 24 }}
							className='fixed md:relative top-0 md:top-0 left-0 w-full h-full pt-16'
						>
							<div className='shadow-container rounded-3xl bg-stone-800 flex flex-col gap-4 p-6 h-full'>
								<h1 className='text-3xl font-bold'>New Room</h1>
							</div>
						</motion.div>
					)} */}
				</AnimatePresence>
				<Sheet
					inGrid
					open={openNewRoom}
					setOpen={setOpenNewRoom}
					title='New Room'
					confirmCancel
				>
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col gap-2'>
							<label className='text-lg font-bold'>Name</label>
							<input className='input' />
						</div>
					</div>
				</Sheet>
			</div>
		</div>
	)
}
