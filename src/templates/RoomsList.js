import useAxios from '../hooks/useAxios'
import { useState, useEffect } from 'react'
import GridItem from '../components/lists/GridItem_Room'
import Loading from '../components/animation/Loading'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function RoomsList({ max, includeAdd }) {
	const [rooms, setRooms] = useState()

	const { response, loading } = useAxios('groups')

	useEffect(() => {
		if (!response) return

		// take the keys of the response object and map them to the values as an id

		const rooms = Object.keys(response).map(key => {
			return { ...response[key], id: key }
		})

		setRooms(rooms)
	}, [response])

	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4'>
			{loading ? (
				<div className='w-full h-32 flex justify-center items-center'>
					<Loading />
				</div>
			) : (
				rooms &&
				rooms.map((room, index) => {
					if (max && index >= max) return null

					return <GridItem key={room.name} item={room} />
				})
			)}
			{includeAdd && (
				<button className='flex flex-col p-6 justify-end items-start w-auto aspect-square bg-stone-800 rounded-3xl'>
					<PlusIcon className='w-16 h-16 stroke-2 text-stone-500 -ml-2' />
					<p className='xs:text-sm sm:text-xl md:text-base font-bold text-stone-400 text-left'>
						Add new room
					</p>
				</button>
			)}
		</div>
	)
}
