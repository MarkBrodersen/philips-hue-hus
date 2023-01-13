import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import BurgerMenu from '../components/sub-components/BurgerMenu'
import { useEffect } from 'react'

const Navigation = () => {
	let place = useLocation().pathname
	const navigate = useNavigate()
	return (
		<header className='w-full p-4 pr-6 flex justify-between z-50 bg-stone-900/75 backdrop-blur-lg fixed top-0'>
			{place !== '/' ? (
				<button onClick={() => navigate(-1)}>
					<ChevronLeft className='w-7 h-7' />
				</button>
			) : (
				<p className='w-7 h-7'></p>
			)}
			<h1 className='text-xl text-stone-200 font-medium'>
				{place === '/'
					? 'Home'
					: place === '/rooms'
					? 'Rooms'
					: place === '/themes'
					? 'Themes'
					: null}
					
			</h1>

			<BurgerMenu />
		</header>
	)
}

export default Navigation
