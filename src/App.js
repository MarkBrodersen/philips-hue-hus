import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Layout from './Layout'

function App() {
	const [token, setToken] = useState('')
	const username = localStorage.getItem('username')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (username) {
			setLoading(true)
			axios.get(`http://192.168.8.100/api/${username}`).then(res => {
				setLoading(false)
				if (res.data.error) {
					setToken(undefined)
				} else {
					setToken(username)
				}
			})
		} else {
			setLoading(false)
		}
	}, [])

	return (
		// <div className='bg-zinc-900 min-h-screen p-12'>
		// 	<Container fit>
		// 		<h1 className='h-60 w-80'>Hej</h1>
		// 	</Container>
		// </div>
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			<BrowserRouter>
				<Routes>
					{loading ? (
						<Route path='/' element={<Layout />}>
							<Route index element={<div>Loading...</div>} />
						</Route>
					) : token ? (
						<Route path='/' element={<Layout />}>
							<Route index element={<Home />} />
						</Route>
					) : (
						<Route path='/' element={<Layout />}>
							<Route index element={<SignIn />} />
						</Route>
					)}
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
