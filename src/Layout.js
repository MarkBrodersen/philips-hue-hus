import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function Layout() {
	return (
		<div className='bg-stone-900 min-h-screen text-stone-200'>
			<Outlet />
		</div>
	)
}
