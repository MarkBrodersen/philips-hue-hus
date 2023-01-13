// import useAxios from '../hooks/useAxios'
import { useState, useEffect } from 'react'
import GridItem from '../components/lists/GridItem_Room'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function RoomsList({ max, includeAdd, addAction, items }) {
	const [rooms, setRooms] = useState()

	// const { response, loading } = useAxios('groups')

	// useEffect(() => {
	// 	if (!response) return

	// 	const rooms = Object.keys(response).map(key => {
	// 		return { ...response[key], id: key }
	// 	})

	// 	console.log(rooms)

	// 	setRooms(rooms)
	// }, [response])

	useEffect(() => {
		if (!items) return

		setRooms(items)
	}, [items])

	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4'>
			{rooms &&
				rooms.map((room, index) => {
					if (max && index >= max) return null

					return <GridItem key={room.name} item={room} />
				})}
			{includeAdd && (
				<button
					onClick={addAction}
					className='flex flex-col p-6 justify-center items-center w-auto aspect-square bg-stone-800 rounded-3xl'
				>
					<PlusIcon className='w-16 h-16 stroke-2 text-stone-500 -ml-2' />
				</button>
			)}
		</div>
	)
}
