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
	useClickOutside(dropdown, () => {
		setFocus(false)
		setShowDropDown(false)
	})

	const dropdownVariants = {
		container: {
			closed: {
				opacity: 0,
				// y: 24,
				// transition: {
				// 	type: 'spring',
				// 	stiffness: 200,
				// 	damping: 20,
				// },
			},
			open: {
				opacity: 1,
				// y: 0,
				// transition: {
				// 	type: 'spring',
				// 	stiffness: 200,
				// 	damping: 20,
				// },
				transition: {
					staggerChildren: 0.1,
				},
			},
		},
		children: {
			closed: {
				opacity: 0,
				y: 32,
				transition: {
					type: 'spring',
					stiffness: 200,
					damping: 20,
				},
			},
			open: {
				opacity: 1,
				y: 0,
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
						if (selectedItems.length === 0) setShowDropDown(false)
					}}
				/>
			</div>
			<AnimatePresence>
				{showDropDown && (
					<div className='absolute w-full z-50 flex flex-col gap-6 top-16'>
						<AnimatePresence>
							{showDropDown && (
								<motion.div
									variants={dropdownVariants.container}
									initial='closed'
									animate='open'
									exit='closed'
									className='flex flex-col gap-2'
								>
									<AnimatePresence>
										<motion.div
											key='selected'
											variants={dropdownVariants.children}
											className='w-full overflow-x-scroll scrollbar-hide'
										>
											<ul
												key='selected'
												className='flex items-center justify-end w-fit h-14 rounded-3xl gap-2'
											>
												<li className='h-full bg-pink-300 rounded-3xl shadow-pink flex items-center px-6 text-stone-900 font-bold'>
													Hej
												</li>
												<li className='h-full bg-pink-300 rounded-3xl shadow-pink flex items-center px-6 text-stone-900 font-bold'>
													Hej
												</li>
												<li className='h-full bg-pink-300 rounded-3xl shadow-pink flex items-center px-6 text-stone-900 font-bold'>
													Hej
												</li>
												<li className='h-full bg-pink-300 rounded-3xl shadow-pink flex items-center px-6 text-stone-900 font-bold'>
													Hej
												</li>
												<li className='h-full bg-pink-300 rounded-3xl shadow-pink flex items-center px-6 text-stone-900 font-bold'>
													Hej
												</li>
												<li className='h-full bg-pink-300 rounded-3xl shadow-pink flex items-center px-6 text-stone-900 font-bold'>
													Hej
												</li>
											</ul>
										</motion.div>
										<motion.ul
											key='groups'
											variants={dropdownVariants.children}
											className='bg-stone-800 flex flex-col gap-2 shadow-container rounded-3xl max-h-72 min-h-14 overflow-y-auto py-2'
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

function Group({ group, list, setList, filter }) {
	const items = group.lights
	return (
		<>
			{items.length > 0 && (
				<div className='p-2 flex flex-col gap-1'>
					<div className='flex justify-between items-center px-6'>
						<h3 className='text-xs tracking-wider font-bold uppercase text-stone-500'>
							{group.name}
						</h3>
						<p className='text-xs tracking-wider font-bold uppercase text-stone-600'>
							{items.length} {items.length === 1 ? 'light' : 'lights'}
						</p>
					</div>
					<ul>
						{items.map(item => (
							<Light id={item} list={list} setList={setList} filter={filter} />
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
					className={`h-14 flex items-center px-6 cursor-pointer hover:bg-stone-700/25 ${list.find(
						item => (item.id === id ? 'bg-red-500' : '')
					)} rounded-3xl`}
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
