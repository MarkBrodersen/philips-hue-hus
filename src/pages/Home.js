import { Link } from 'react-router-dom'
import RoomsList from '../templates/RoomsList'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import useWindowDimensions from '../hooks/useWindowDimensions'
import useAxios from '../hooks/useAxios'
import filterKeys from '../functions/filterKeys'
import { useEffect, useState } from 'react'
import useFilteredArrays from '../hooks/useFilteredArrays'

export default function Home() {
	const { device } = useWindowDimensions()
	const [rooms, setRooms] = useState()

	const { response: roomsResponse, loading: roomsLoading } = useAxios('groups')

	// useEffect(() => {
	// 	if (!roomsResponse) return
	// 	setRooms(filterKeys(roomsResponse, item => item.type === 'Room'))
	// }, [roomsResponse])

	const newRooms = useFilteredArrays(
		roomsResponse,
		item => item.type === 'Room'
	)

	return (
		<div className='p-4 grid grid-cols-1 md:grid-cols-3'>
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
		</div>
	)
}
