import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SegmentedDropDown({
	items,
	selectedItems,
	setSelectedItems,
	placeholder,
}) {
	const [value, setValue] = useState('')
	const [focus, setFocus] = useState(false)
	const [showDropDown, setShowDropDown] = useState(false)

	const groups = items && Object.keys(items)

	return (
		<div className='relative'>
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
								<motion.ul className='bg-stone-800 shadow-container'>
									{groups.map(group => (
										<li key={group}>
											<Group groupNo={group} groups={items} />
										</li>
									))}
								</motion.ul>
							)}
						</AnimatePresence>
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}

function Group({ groupNo, groups }) {
	const group = groups[groupNo]
	const items = group.lights
	console.log(group)
	return <ul>{group.name}</ul>
}
