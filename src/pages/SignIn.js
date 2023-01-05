import Container from '../components/Container'
import { useState } from 'react'
import axios from 'axios'

export default function SignIn() {
	const [username, setUsername] = useState('')

	function submit() {
		if (username !== '') {
			axios.get(`http://192.168.8.100/api/${username}`).then(res => {
				if (res.data.error) {
					alert('Wrong username')
				} else {
					localStorage.setItem('username', username)
					window.location.reload()
				}
			})
		}
	}

	return (
		<div className='w-full px-4 py-6'>
			<h1 className='text-zinc-50 text-3xl font-bold'>Sign Up</h1>
			<p>Please sign up to continue</p>

			<div className='flex flex-col gap-2 my-6'>
				<Container>
					<input
						className='bg-transparent focus:outline-none flex w-full px-6 h-14'
						type='text'
						placeholder='Username'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</Container>

				<p className='text-sm text-zinc-500'>
					Tip: Include your device, if you're planning on using other devices
					later
				</p>
			</div>

			<button
				onClick={e => {
					e.preventDefault()
					submit()
				}}
			>
				Sign up
			</button>
		</div>
	)
}
