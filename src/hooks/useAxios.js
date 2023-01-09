import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAxios(endpoint, body, method = 'get') {
	const [response, setResponse] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const username = localStorage.getItem('username')

	useEffect(() => {
		setLoading(true)
		axios({
			method,
			url: `http://192.168.8.100/api/${username}/${endpoint}`,
			data: body,
		})
			.then(res => {
				setResponse(res.data)
				setLoading(false)
			})
			.catch(err => {
				setError(err)
				setLoading(false)
			})
	}, [endpoint, body, method])

	return { response, error, loading }
}
