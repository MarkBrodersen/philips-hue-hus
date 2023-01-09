import { Link } from 'react-router-dom'
import RoomsList from '../templates/RoomsList'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Home() {
	const { device, width } = useWindowDimensions()
	console.log(device, width)
	return (
		<div className='p-4 grid grid-cols-1 md:grid-cols-3'>
			<section className='flex flex-col gap-6'>
				<h1 className='text-4xl font-bold'>Rooms</h1>
				<div className='flex flex-col gap-4'>
					<RoomsList max={device === 'tablet' ? 4 : 2} />
					<Link
						to='/rooms'
						className='flex items-center justify-between w-full px-6 rounded-3xl bg-stone-800 h-14 text-stone-300 font-semibold'
					>
						See all rooms
						<ChevronRightIcon
							strokeWidth={3}
							className='w-6 h-6 text-stone-400'
						/>
					</Link>
				</div>
			</section>
		</div>
	)
}
