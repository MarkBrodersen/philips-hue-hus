import { useState } from 'react'
import Input from '../components/Input'
import useAxios from '../hooks/useAxios'
import Sheet from '../components/Sheet'
import DropDown from '../components/DropDown'
import classes from '../assets/roomClasses'
import useFilteredArrays from '../hooks/useFilteredArrays'
import { LightBulbIcon } from '@heroicons/react/24/solid'
import SegmentedDropDown from '../components/SegmentedDropDown'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function NewRoom({ open, setOpen }) {
	const [name, setName] = useState('')
	const [selectedClass, setSelectedClass] = useState()
	const [selectedLights, setSelectedLights] = useState([])

	const { response: lightsObject } = useAxios('lights')
	const lights = useFilteredArrays(lightsObject)

	const { response: groupsObject } = useAxios('groups')
	const groups = useFilteredArrays(groupsObject)

	const lightsNotInGroup = lights?.filter(light => {
		const isInGroup = groups?.find(group => {
			return group.lights.includes(light.id)
		})

		return !isInGroup
	})

	async function createRoom() {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/${localStorage.getItem(
				'username'
			)}/groups`
		)
		const groupsObject = response.data
		const groups = Object.keys(groupsObject)
			.map(key => {
				return {
					...groupsObject[key],
					id: key,
				}
			})
			.filter(group => group.type === 'Room')

		console.log(groups)

		await Promise.all(
			groups.map(async group => {
				const match = group.lights
					.map(light => {
						return (
							selectedLights.find(
								selectedLight => selectedLight.id === light
							) !== undefined
						)
					})
					.includes(true)

				console.log(group.name, match)

				if (match) {
					await axios
						.put(
							`${process.env.REACT_APP_API_URL}/${localStorage.getItem(
								'username'
							)}/groups/${group.id}`,
							{
								lights: group.lights.filter(light => {
									return (
										selectedLights.find(
											selectedLight => selectedLight.id === light
										) === undefined
									)
								}),
							}
						)
						.then(res => console.log(res))
				}
			})
		)

		axios
			.post(
				`${process.env.REACT_APP_API_URL}/${localStorage.getItem(
					'username'
				)}/groups`,
				{
					name,
					type: 'Room',
					class: selectedClass,
					lights: selectedLights.map(light => light.id),
				}
			)
			.then(res => {
				if (res.data[0].error) {
					toast.error(res.data[0].error.description)
					return
				}

				toast.success('Room created')
				setOpen(false)
			})
	}

	return (
		<Sheet inGrid open={open} setOpen={setOpen} title='New Room' confirmCancel>
			<div>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-6'>
						<Input label='Name' value={name} setValue={setName} />

						<DropDown
							label='Category'
							items={classes}
							selected={selectedClass}
							setSelected={setSelectedClass}
						/>

						<div className='mt-6 flex flex-col gap-6'>
							<h2 className='text-2xl font-bold text-stone-50'>
								Choose lights
							</h2>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
								{lights &&
									lightsNotInGroup.map(light => (
										<Light
											key={light.id}
											light={light}
											selectedLights={selectedLights}
											setSelectedLights={setSelectedLights}
										/>
									))}
							</div>
							<SegmentedDropDown
								items={groups}
								selectedItems={selectedLights}
								setSelectedItems={setSelectedLights}
								placeholder='Search for lights'
							/>
							<button
								onClick={createRoom}
								className='h-14 px-6 bg-pink-300 flex w-full rounded-3xl font-bold text-stone-900 items-center justify-center shadow-pink'
							>
								Create Room
							</button>
							<div className='h-96'></div>
						</div>
					</div>
				</div>
			</div>
		</Sheet>
	)
}

function Light({ light, selectedLights, setSelectedLights }) {
	return (
		<button
			onClick={() => {
				if (selectedLights.includes(light)) {
					setSelectedLights(selectedLights.filter(item => item.id !== light.id))
				} else {
					setSelectedLights([...selectedLights, light])
				}
			}}
			className={`relative flex flex-col justify-between items-start gap-2 transition-all ${
				selectedLights.includes(light)
					? 'shadow-container bg-pink-900'
					: 'shadow-container'
			} aspect-square bg-stone-800 rounded-3xl p-6 overflow-hidden`}
		>
			<LightBulbIcon
				className={`w-16 h-16 stroke-2 transition-all ${
					selectedLights.includes(light) ? 'text-pink-500' : 'text-stone-700'
				}`}
			/>
			<p
				className={`text-base text-start ${
					selectedLights.includes(light) ? 'text-stone-200' : 'text-stone-200'
				} font-bold`}
			>
				{light.name}
			</p>
		</button>
	)
}
