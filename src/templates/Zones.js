import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import ListItem from '../components/lists/ListItem_Zones'
import filterKeys from '../functions/filterKeys'
import useAxios from '../hooks/useAxios'

export default function Zones() {
	const [zones, setZones] = useState()

	const { response } = useAxios('groups')

	useEffect(() => {
		if (!response) return

		// take the keys of the response object and map them to the values as an id

		const zones = filterKeys(response, item => item.type === 'Zone')
		console.log(zones)
		setZones(zones)
	}, [response])

	return (
		<>
			{zones &&
				zones.map(items => {
					return (
						<div key={items.id} className='flex justify-between items-center'>
							<div className='flex items-center gap-4'>
								<ListItem item={items} />
								<h3 className='font-bold'>{items.name}</h3>
							</div>
							<ChevronRight />
						</div>
					)
				})}
		</>
	)
}
