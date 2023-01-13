import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAxios from '../hooks/useAxios'
import useFilteredArrays from '../hooks/useFilteredArrays'
import useClickOutside from '../hooks/useClickOutside'

export default function SegmentedDropDown({
	items,
	selectedItems,
	setSelectedItems,
	placeholder,
}) {
	const [value, setValue] = useState('')
	const [focus, setFocus] = useState(false)
	const [showDropDown, setShowDropDown] = useState(false)

	const groups = useFilteredArrays(items, item => item.type === 'Room')

	const dropdown = useRef(null)
	useClickOutside(dropdown, event => {
		if (Array.from(event.target.classList).includes('dropdown')) return

		setFocus(false)
		setShowDropDown(false)
	})

	const dropdownVariants = {
		container: {
			initial: {
				opacity: 0,
			},
			animate: {
				opacity: 1,
				transition: {
					staggerChildren: 0.1,
				},
			},
			exit: {
				opacity: 0,
			},
		},
		children: {
			initial: {
				opacity: 0,
				y: 32,
				transition: {
					type: 'spring',
					stiffness: 200,
					damping: 20,
				},
			},
			animate: {
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					stiffness: 200,
					damping: 20,
					staggerChildren: 0.1,
					staggerDirection: -1,
					delayChildren: 0.2,
				},
			},
			exit: {
				opacity: 0,
				y: 32,
				transition: {
					type: 'spring',
					stiffness: 200,
					damping: 20,
				},
			},
		},
		subChildren: {
			initial: {
				x: -48,
				opacity: 0,
			},
			animate: {
				x: 0,
				opacity: 1,
			},
			exit: {
				x: 48,
				opacity: 0,
			},
		},
		horizontal: {
			initial: {
				opacity: 0,
				y: 32,
				transition: {
					type: 'spring',
					stiffness: 200,
					damping: 20,
				},
			},
			animate: {
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					stiffness: 200,
					damping: 20,
					staggerChildren: 0.1,
					staggerDirection: -1,
					delayChildren: 0.2,
				},
			},
			exit: {
				opacity: 0,
				y: 32,
				height: 0,
				transition: {
					type: 'spring',
					stiffness: 200,
					damping: 20,
				},
			},
		},
	}

	return (
		<div ref={dropdown} className='relative'>
			<div className='bg-stone-800 shadow-container rounded-3xl'>
				<input
					type='text'
					className='w-full h-14 rounded-3xl bg-transparent flex px-6 placeholder:font-semibold placeholder:text-stone-600 focus:outline-none'
					placeholder={placeholder}
					value={value}
					onChange={e => setValue(e.target.value)}
					onFocus={() => {
						setFocus(true)
						setShowDropDown(true)
					}}
					onBlur={() => {
						setFocus(false)
					}}
				/>
			</div>
			<AnimatePresence>
				{showDropDown && (
					<div className='absolute w-full z-50 flex flex-col gap-6 top-16'>
						<AnimatePresence>
							{showDropDown && (
								<motion.div
									layout
									variants={dropdownVariants.container}
									initial='initial'
									animate='animate'
									exit='exit'
									className='flex flex-col gap-2 bg-stone-800 shadow-container rounded-3xl overflow-hidden p-2'
								>
									<AnimatePresence>
										{selectedItems?.length > 0 && (
											<motion.div
												key='selected'
												variants={dropdownVariants.children}
												className='w-full overflow-x-auto overflow-y-visible scrollbar-hide rounded-2xl'
											>
												<motion.ul
													layout
													key='selected'
													className='flex flex-row-reverse items-center justify-end w-fit h-14 rounded-2xl gap-2'
												>
													{selectedItems &&
														selectedItems.map(item => (
															<SelectedLight
																key={item.id}
																item={item}
																variants={dropdownVariants.subChildren}
																setList={setSelectedItems}
															/>
														))}
												</motion.ul>
											</motion.div>
										)}
									</AnimatePresence>
									<AnimatePresence>
										<motion.ul
											key='groups'
											variants={dropdownVariants.children}
											className='flex flex-col gap-2 max-h-72 min-h-14 overflow-y-auto'
										>
											{groups.map(group => (
												<li key={group.id}>
													<Group
														group={group}
														list={selectedItems}
														setList={setSelectedItems}
														filter={value}
													/>
												</li>
											))}
										</motion.ul>
									</AnimatePresence>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}

function SelectedLight({ item, variants, setList }) {
	return (
		<>
			{item.name ? (
				<motion.li
					variants={variants}
					className='dropdown h-full w-fit inline-flex bg-pink-300 shadow-pink items-center rounded-2xl px-6 py-2 text-stone-900 font-bold whitespace-nowrap overflow-hidden'
					whileTap={{ scale: 0.95 }}
					onClick={() => {
						setList(prev => prev.filter(light => light.id !== item.id))
					}}
				>
					{item?.name}
				</motion.li>
			) : null}
		</>
	)
}

function Group({ group, list, setList, filter }) {
	const items = group.lights
	return (
		<>
			{items.length > 0 && (
				<div className='p-2 flex flex-col gap-1'>
					<div className='flex justify-between items-center px-4'>
						<h3 className='text-xs tracking-wider font-bold uppercase text-stone-500'>
							{group.name}
						</h3>
						<p className='text-xs tracking-wider font-bold uppercase text-stone-600'>
							{items.length} {items.length === 1 ? 'light' : 'lights'}
						</p>
					</div>
					<ul>
						{items.map(item => (
							<Light
								key={item}
								id={item}
								list={list}
								setList={setList}
								filter={filter}
							/>
						))}
					</ul>
				</div>
			)}
		</>
	)
}

function Light({ id, setList, list, filter, setIsValid }) {
	const { response: lightResponse, loading } = useAxios('lights/' + id)
	const light = {
		...lightResponse,
		id: id,
	}
	const numbersFromFilter = filter
		.split(' ')
		.map(number => {
			return number?.match(/\d/g)?.join('')
		})
		.filter(item => item !== undefined)

	const matchingPartOfString = filter
		?.split(' ')
		.map(word => {
			return light?.name?.toLowerCase().includes(word.toLowerCase())
		})
		.includes(true)
	const isValid = numbersFromFilter.includes(light?.id) || matchingPartOfString
	return (
		<>
			{isValid && (
				<li
					onClick={() => {
						console.log(
							list,
							list.find(item => item.id === id)
						)
						if (list.find(item => item.id === id)) {
							console.log('already in array')
							setList(list.filter(item => item.id !== id))
						} else {
							console.log('adding')
							setList([...list, light])
						}
					}}
					className={`h-14 flex items-center px-4 cursor-pointer hover:bg-stone-700/25 ${list.find(
						item => (item.id === id ? 'bg-red-500' : '')
					)} rounded-2xl`}
				>
					<div className='flex flex-col'>
						<h4 className='font-bold'>{light?.name}</h4>
						<p className='text-xs leading-tight font-semibold text-stone-400'>
							{light?.status?.on ? 'On' : 'Off'}
						</p>
					</div>
				</li>
			)}
		</>
	)
}
