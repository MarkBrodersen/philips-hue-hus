import { useEffect, useState } from 'react'

export default function useFilteredArrays(response, filter) {
	const [array, setArray] = useState()

	useEffect(() => {
		if (!response) return

		setArray(
			filter
				? Object.keys(response)
						.map(key => {
							return { ...response[key], id: key }
						})
						.filter(filter)
				: Object.keys(response).map(key => {
						return { ...response[key], id: key }
				  })
		)
	}, [response])

	return array
}
