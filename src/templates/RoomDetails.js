import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DeleteBtn from '../components/buttons/DeleteBtn'
import Container from '../components/Container'
import filterKeys from '../functions/filterKeys'
import useAxios from '../hooks/useAxios'
import { motion } from 'framer-motion'

export default function RoomDetails() {
	const [item, setItem] = useState()
	const [startDaRave, setStartDaRave] = useState(false)
	const { response } = useAxios('groups')

	useEffect(() => {
		if (!response) return

		const lights = filterKeys(response, item => item.type === 'Room')

		setItem(lights)
	}, [])

	const id = useParams().id
	function raveParty() {
		setStartDaRave(!startDaRave)
		console.log(startDaRave)
		console.log('rave party')
		axios.put(
			`http://192.168.8.100/api/${localStorage.getItem('username')}/groups/${
				item.id
			}/action`,
			{
				on: true,
				effect: 'colorloop',
			}
		)
	}

	return (
		<Container>
			<div className='flex flex-col w-94 m-auto p-4'>
				<div
					className='relative flex justify-between w-1/3 m-auto mt-64'
					onClick={raveParty}
				>
					<motion.h2
						animate={{ rotate: -45 }}
						transition={{ duration: 5 }}
						className='font-bold'
					>
						(☞ﾟヮﾟ)☞
					</motion.h2>
					<motion.div
						className='z-40'
						animate={{ marginTop: -45 }}
						transition={{ duration: 5 }}
					>
						<motion.h1
							initial={{ rotate: 0 }}
							animate={{ rotate: -15 }}
							exit={{ rotate: 15 }}
							transition={{
								repeat: Infinity,
								duration: 0.5,
							}}
							className='font-bold'
						>
							༼ つ ◕_◕ ༽つ
						</motion.h1>
					</motion.div>
					<motion.h2
						animate={{ rotate: 45 }}
						transition={{ duration: 5 }}
						className='font-bold'
					>
						☜(ﾟヮﾟ☜)
					</motion.h2>
					<motion.div
						initial={{ opacity: 0, top: -8 }}
						animate={{ opacity: 0.7, top: -64 }}
						transition={{ duration: 5 }}
						className='absolute  left-1/2 -ml-12 w-24 h-24 rounded-full bg-yellow-500 blur-xl'
					></motion.div>
				</div>
			</div>
			<DeleteBtn id={id} />
		</Container>
	)
}
