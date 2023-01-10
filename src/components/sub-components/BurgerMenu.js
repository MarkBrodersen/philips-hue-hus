import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
const BurgerMenu = () => {
	const [clicked, setClicked] = useState(false)
	return (
		<>
			<div
				onClick={() => {
					setClicked(!clicked)
				}}
				className='w-6 flex justify-between items-center relative'
			>
				<motion.span
					animate={{
						width: clicked === false ? 4 : 32,
						height: 4,
						rotate: clicked === false ? 0 : 45,
						marginRight: clicked === false ? 0 : -12,
					}}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					className='rounded-full bg-white pointer-events-none'
				></motion.span>
				<motion.span
					animate={{
						width: clicked === false ? 4 : 0,
						height: clicked === false ? 4 : 0,
						scale: clicked === false ? 1 : 0,
						opacity: clicked === false ? 1 : 0,
					}}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					className='rounded-full bg-white pointer-events-none'
				></motion.span>
				<motion.span
					animate={{
						width: clicked === false ? 4 : 32,
						height: 4,
						rotate: clicked === false ? 0 : -45,
						marginLeft: clicked === false ? 0 : -12,
					}}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					className='rounded-full bg-white pointer-events-none'
				></motion.span>
			</div>
			<AnimatePresence>
				{clicked === true ? (
					<motion.aside
						initial={{ right: -400, top: 64 }}
						animate={{ right: 0, top: 64 }}
						className='absolute shadow-container backdrop-blur-lg rounded-l-3xl p-5 w-64 bg-gradient-to-tr from-stone-800/50 to-stone-800'
					>
						<ul>
							<li className='text-xl font-medium '>
								<NavLink to='/'>Home</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/rooms'>Rooms</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/newroom'>New Room</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/themes'>Themes</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/newthemes'>New Theme</NavLink>
							</li>
						</ul>
					</motion.aside>
				) : (
					<motion.aside
						initial={{ right: 0, top: 64 }}
						animate={{ right: -400, top: 64 }}
						className='absolute shadow-container rounded-l-3xl p-5 w-64 bg-gradient-to-tr from-stone-800/50 to-stone-800'
					>
						<ul>
							<li className='text-xl font-medium '>
								<NavLink to='/'>Home</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/rooms'>Rooms</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/newroom'>New Room</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/themes'>Themes</NavLink>
							</li>
							<li className='text-xl font-medium mt-5'>
								<NavLink to='/newthemes'>New Theme</NavLink>
							</li>
						</ul>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	)
}

export default BurgerMenu
