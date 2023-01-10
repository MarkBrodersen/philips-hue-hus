import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({
	open,
	setOpen,
	title,
	content,
	action,
	actionLabel,
	destructive,
}) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={e => {
				if (e.target === e.currentTarget) {
					setOpen(false)
				}
			}}
			className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-stone-900/75 backdrop-blur-lg p-4'
		>
			<motion.div
				initial={{ y: 24, opacity: 0 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 24 }}
				className='bg-stone-800 rounded-3xl shadow-container w-full max-w-xl p-6 flex flex-col gap-4'
			>
				<h1 className='text-2xl font-bold text-stone-50'>{title}</h1>
				<p className='text-stone-400'>{content}</p>
				<div className='flex justify-end gap-4 mt-4'>
					<button
						onClick={e => {
							setOpen(false)
						}}
						className='bg-stone-700 rounded-3xl px-6 py-2 font-semibold text-stone-50'
					>
						Cancel
					</button>
					<button
						onClick={e => {
							action()
							setOpen(false)
						}}
						className={`${
							destructive
								? 'bg-red-600 shadow-red text-red-50'
								: 'bg-pink-300 shadow-pinkglow text-stone-900'
						} rounded-3xl px-6 py-2 font-bold`}
					>
						{actionLabel || 'Confirm'}
					</button>
				</div>
			</motion.div>
		</motion.div>
	)
}
