import Container from '../Container'
import { BedSingle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {
	LightBulbIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/solid'
import PowerButton from '../buttons/PowerButton'
import classes from '../../assets/roomClasses'
import LucideIcon from '../sub-components/LucideIcon'

export default function GridItem({ item }) {
	const text = useRef(null)

	const [any, setAny] = useState(item.state.any_on)
	const [all, setAll] = useState(item.state.all_on)

	const [canPress, setCanPress] = useState(true)

	const [lightErrors, setLightErrors] = useState([])

	useEffect(() => {
		item?.lights.forEach(light => {
			axios
				.get(
					`${process.env.REACT_APP_API_URL}/${localStorage.getItem(
						'username'
					)}/lights/${light}`
				)
				.then(response => {
					if (response.data.error || !response.data.state.reachable) {
						setLightErrors(prev => [...prev, light])
					}
				})
		})
	}, [item])

	function handleClick() {
		if (canPress) {
			setCanPress(false)
			if (any) {
				axios
					.put(
						`http://192.168.8.100/api/${localStorage.getItem(
							'username'
						)}/groups/${item.id}/action`,
						{
							on: false,
						}
					)
					.then(response => {
						if (response.data[0].error) {
							console.log(response.data[0].error.description)

							return
						}
						console.log(response)
						setAll(false)
						setAny(false)
						setCanPress(true)
					})
			} else {
				axios
					.put(
						`http://192.168.8.100/api/${localStorage.getItem(
							'username'
						)}/groups/${item.id}/action`,
						{
							on: true,
						}
					)
					.then(response => {
						if (response.data[0].error) {
							console.log(response.data[0].error.description)

							return
						}
						setAll(true)
						setAny(true)
						setCanPress(true)
					})
			}
		}
	}

	function raveParty() {
		axios
			.put(
				`http://192.168.8.100/api/${localStorage.getItem('username')}/groups/${
					item.id
				}/action`,
				{
					on: true,
					effect: 'colorloop',
				}
			)
			.then(response => {
				setAll(true)
				setAny(true)
			})
	}

	const icon = classes.find(thisClass => thisClass.name === item.class)?.icon

	return (
		<Container>
			<div className='relative isolate w-auto aspect-square p-4 rounded-3xl flex flex-col justify-between overflow-hidden'>
				<AnimatePresence>
					{all ? (
						<motion.div
							initial={{ opacity: 0, scale: 0.75, x: -24, y: 64 }}
							animate={{
								opacity: 1,
								scale: 1,
								x: 0,
								y: 0,
								transition: { delay: 0.5, duration: 5 },
							}}
							exit={{ opacity: 0, scale: 0.75, x: -24, y: 64 }}
							className='h-24 w-24 rounded-full absolute top-4 -right-2 bg-pink-400/50 blur-2xl -z-10'
						></motion.div>
					) : null}
				</AnimatePresence>
				<div className='flex justify-between items-center'>
					<div className='relative w-12 h-12 md:w-8 md-w-8 flex justify-center items-center'>
						<motion.div
							initial={{ opacity: 0, scale: 0.75 }}
							animate={{
								opacity: 1,
								scale: 1,
								opacity: any === true ? 1 : 0.75,
							}}
							className='absolute h-full w-full flex justify-center items-center'
						>
							{/* <BedSingle
								className='absolute w-7 h-7 text-pink-200'
								strokeWidth={3}
							/> */}
							{icon && <LucideIcon icon={icon} />}
						</motion.div>
						<AnimatePresence>
							{any === true && (
								<motion.div
									animate={{
										opacity: 1,
										scale: [1, 1.1, 1, 1.1, 1],
										y: [0, -2, 0, 2, 0],
										x: [0, 2, 2, -2, 0],
										transition: {
											duration: 4,
											repeat: Infinity,
											repeatType: 'loop',
											delay: Math.random() * 2 + 1,
											repeatDelay: Math.random() * 2 + 1,
										},
									}}
									exit={{ opacity: 0, scale: 0.5 }}
									className='w-6 h-6 rounded-full bg-pink-200 blur-lg'
								></motion.div>
							)}
						</AnimatePresence>
					</div>
					<PowerButton action={handleClick} all={all} any={any} />
				</div>
				<div ref={text}>
					<h3
						onClick={raveParty}
						style={{
							width: text.current?.clientWidth,
						}}
						className='text-stone-100 font-bold text-2xl md:text-xl items-center text-ellipsis overflow-x-hidden h-fit whitespace-nowrap'
					>
						{item.name}
					</h3>
					<div
						className={`flex items-center gap-1 ${
							lightErrors.length > 0 ? 'text-yellow-400/75' : 'text-stone-400'
						}`}
					>
						{lightErrors.length > 0 ? (
							<ExclamationTriangleIcon className='inline-block h-4 w-4 md:h-3 md:w-3' />
						) : (
							<LightBulbIcon className='inline-block h-4 w-4 md:h-3 md:w-3' />
						)}
						<p className='text-stone-400 text-sm md:text-xs font-semibold'>
							{item.lights.length}{' '}
							{item.lights.length === 1 ? 'light' : 'lights'}
						</p>
					</div>
				</div>
			</div>
		</Container>
	)
}
