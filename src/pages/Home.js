import { Link } from 'react-router-dom'
import Container from '../components/Container'
import Zones from '../templates/Zones'
import Lights from '../templates/Lights'
import RoomsList from '../templates/RoomsList'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import useWindowDimensions from '../hooks/useWindowDimensions'
import useAxios from '../hooks/useAxios'
import useFilteredArrays from '../hooks/useFilteredArrays'

export default function Home() {
	const { device } = useWindowDimensions()

	const { response: roomsResponse } = useAxios('groups')

	// useEffect(() => {
	// 	if (!roomsResponse) return
	// 	setRooms(filterKeys(roomsResponse, item => item.type === 'Room'))
	// }, [roomsResponse])

	const newRooms = useFilteredArrays(
		roomsResponse,
		item => item.type === 'Room'
	)

	return (
		<div className='p-4 grid gap-6 grid-cols-1 md:grid-cols-3'>
			<section className='flex flex-col gap-6'>
				<h1 className='text-4xl font-bold'>Rooms</h1>
				<div className='flex flex-col gap-4'>
					<RoomsList items={newRooms} max={device === 'tablet' ? 4 : 2} />
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
			<section className='flex flex-col md:col-span-2 '>
				<h2 className='text-4xl font-bold mb-6'>Zones</h2>
				<Container>
					<div className='p-4 flex flex-col gap-4 justify-between'>
						<Zones Zone='Alt' />
					</div>
				</Container>
				<h2 className='text-4xl mt-12 font-bold mb-6'>Lights</h2>
				<Container>
					<div className='p-4 flex flex-col gap-4 justify-between'>
						<Lights />
					</div>
				</Container>
			</section>
		</div>
	)
}
