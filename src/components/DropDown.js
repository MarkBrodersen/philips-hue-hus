import { AnimatePresence, motion, spring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import LucideIcon from './sub-components/LucideIcon'

export default function DropDown({ selected, setSelected, items, label }) {
	const [value, setValue] = useState('')
	const [focus, setFocus] = useState(false)
	const [showDropDown, setShowDropDown] = useState(false)

	function filterItems() {
		if (value === '') return items

		return items.filter(item => {
			return item.name.toLowerCase().includes(value.toLowerCase())
		})
	}

	useEffect(() => {
		if (!selected) return
		setValue(selected)
		console.log(selected, items)
	}, [selected])

	return (
		<div className='relative h-20 flex flex-col justify-end'>
			<label className='relative w-full h-14 flex rounded-3xl bg-gradient-to-tr bg-stone-800/50 bg-stone-800 shadow-container'>
				<motion.span
					animate={{ y: focus ? -56 : '-50%' }}
					className='flex absolute top-1/2 -translate-y-1/2 left-6 text-stone-600 font-semibold'
				>
					{label}
				</motion.span>
				<motion.div
					animate={{ rotate: focus ? 180 : 0 }}
					className='absolute right-6 h-full flex flex-col justify-center pointer-events-none'
				>
					<ArrowDownCircleIcon className='text-stone-400 w-6 h-6' />
				</motion.div>
				<input
					type='text'
					value={value}
					onChange={e => setValue(e.target.value)}
					className='w-full h-full bg-transparent focus:outline-none px-6'
					onFocus={() => {
						setFocus(true)
						setShowDropDown(true)
					}}
					onBlur={() => {
						if (selected && value !== selected) {
							setValue(selected)
							setShowDropDown(false)

							return
						}
						if (value === '' || !selected) setFocus(false)
						setShowDropDown(false)
					}}
				/>
			</label>

			<AnimatePresence>
				{showDropDown ? (
					<motion.ul
						initial={{ y: 24, opacity: 0 }}
						animate={{
							y: 0,
							opacity: 1,
							transition: {
								type: 'spring',
								stiffness: 200,
								damping: 20,
								delay: 0.1,
							},
						}}
						exit={{
							y: 24,
							opacity: 0,
							transition: {
								type: 'spring',
								stiffness: 200,
								damping: 20,
							},
						}}
						className='absolute z-50 flex flex-col gap-2 top-24 bg-stone-800 rounded-3xl w-full shadow-container max-h-72 min-h-14 overflow-y-auto p-2'
					>
						{filterItems().map(item => (
							<li
								className={`px-4 py-4 rounded-2xl flex gap-4 items-center cursor-pointer hover:bg-stone-700 ${
									item.name === selected ? 'bg-pink-800' : ''
								}`}
								key={item.name}
								onClick={() => {
									console.log(item.name)
									setSelected(item.name)
									setValue(item.name)
									setFocus(true)
								}}
							>
								<LucideIcon icon={item.icon} className='w-6 h-6' />
								{item.name}
							</li>
						))}
					</motion.ul>
				) : null}
			</AnimatePresence>
		</div>
	)
}
