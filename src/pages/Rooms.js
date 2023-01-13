import RoomsList from '../templates/RoomsList'
import { PlusIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Container from '../components/Container'
import Sheet from '../components/Sheet'
import Input from '../components/Input'
import NewRoom from '../templates/NewRoom'
import useAxios from '../hooks/useAxios'
import Loading from '../components/animation/Loading'
import useFilteredArrays from '../hooks/useFilteredArrays'

export default function Rooms() {
	const [openNewRoom, setOpenNewRoom] = useState(false)

	const { response, loading } = useAxios('groups')

	const rooms = useFilteredArrays(response, item => item.type === 'Room')

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
								onClick={() => setOpenNewRoom(!openNewRoom)}
								className='p-1'
							>
								<PlusIcon className='w-8 h-8 stroke-2 text-stone-500' />
							</motion.button>
						)}
					</AnimatePresence>
				</div>
				{loading ? (
					<div>
						<Loading />
					</div>
				) : (
					<RoomsList items={rooms} includeAdd addAction={setOpenNewRoom} />
				)}
			</div>
			<div className='md:col-span-2'>
				<AnimatePresence>
					{openNewRoom && (
						<NewRoom open={openNewRoom} setOpen={setOpenNewRoom} />
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
