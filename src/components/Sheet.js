import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Modal from './Modal'

export default function Sheet({
	open,
	setOpen,
	children,
	title,
	action,
	actionText,
	confirmCancel,
	inGrid,
}) {
	const [modalOpen, setModalOpen] = useState(false)
	function close() {
		if (!confirmCancel) {
			console.log('close')
			// setOpen(false)

			return
		}

		setModalOpen(true)
	}
	return (
		<>
			<AnimatePresence>
				{open ? (
					<motion.div
						initial={{ y: 24, opacity: 0 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 24 }}
						className={`fixed ${
							inGrid
								? 'md:relative'
								: 'md:flex md:flex-col md:justify-start md:items-center'
						} top-0 md:top-0 left-0 w-full h-full pt-16`}
					>
						<div
							className={`shadow-container rounded-3xl bg-stone-800 flex flex-col gap-4 p-6 h-full ${
								!inGrid ? 'max-w-3xl md:w-2/3' : ''
							}`}
						>
							<div className='flex justify-between'>
								<h1 className='text-3xl font-bold'>{title}</h1>
								<button
									onClick={e => {
										close()
									}}
								>
									<XMarkIcon className='w-8 h-8 stroke-2 text-stone-500' />
								</button>
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
			<AnimatePresence>
				{modalOpen ? (
					<Modal
						open={modalOpen}
						setOpen={setModalOpen}
						title='Confirm close'
						action={() => {
							setModalOpen(false)
							setTimeout(() => {
								setOpen(false)
							}, 300)
						}}
						destructive
						content='Are you sure you want to close this sheet? Changes will not be saved.'
					/>
				) : null}
			</AnimatePresence>
		</>
	)
}
