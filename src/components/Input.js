import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Input({ value, setValue, type, label }) {
	const [focus, setFocus] = useState(false)
	return (
		<div className='h-20 flex flex-col justify-end'>
			<label className='relative w-full h-14 flex rounded-3xl bg-gradient-to-tr bg-stone-800/50 bg-stone-800 shadow-container'>
				<motion.span
					animate={{ y: focus ? -56 : '-50%' }}
					className='flex absolute top-1/2 -translate-y-1/2 left-6 text-stone-600 font-semibold'
				>
					{label}
				</motion.span>
				<input
					type={type}
					value={value}
					onChange={e => setValue(e.target.value)}
					className='w-full h-full bg-transparent focus:outline-none px-6'
					onFocus={() => setFocus(true)}
					onBlur={() => {
						if (value === '') setFocus(false)
					}}
				/>
			</label>
		</div>
	)
}
