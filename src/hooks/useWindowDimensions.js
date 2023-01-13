import { useState, useEffect } from 'react'

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowsDimensions()
	)
	const [device, setDevice] = useState('phone')

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowsDimensions())

			if (windowDimensions.width > 768) {
				setDevice('tablet')
			} else {
				setDevice('phone')
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return { ...windowDimensions, device }
}

function getWindowsDimensions() {
	const { innerWidth: width, innerHeight: height } = window
	return {
		width,
		height,
	}
}
