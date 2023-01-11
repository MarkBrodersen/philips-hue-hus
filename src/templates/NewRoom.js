import { useState } from 'react'
import Input from '../components/Input'
import useAxios from '../hooks/useAxios'
import Sheet from '../components/Sheet'
import DropDown from '../components/DropDown'
import classes from '../assets/roomClasses'
import useFilteredArrays from '../hooks/useFilteredArrays'
import { LightBulbIcon } from '@heroicons/react/24/solid'
import SegmentedDropDown from '../components/SegmentedDropDown'

export default function NewRoom({ open, setOpen }) {
	const [name, setName] = useState('')
	const [selectedClass, setSelectedClass] = useState()
	const [selectedLights, setSelectedLights] = useState([])

	// const { response, loading } = useAxios('groups', { name, lights }, 'put')

	const { response: lightsObject, loading: loadingLights } = useAxios('lights')
	const lights = useFilteredArrays(lightsObject)

	const { response: groupsObject, loading: loadingGroups } = useAxios('groups')
	const groups = useFilteredArrays(groupsObject)

	const lightsNotInGroup = lights?.filter(light => {
		const isInGroup = groups?.find(group => {
			return group.lights.includes(light.id)
		})

		return !isInGroup
	})

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
							<div className='grid grid-cols-3 md:grid-cols-4 gap-4'>
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
				if (selectedLights.includes(light.id)) {
					setSelectedLights(selectedLights.filter(id => id !== light.id))
				} else {
					setSelectedLights([...selectedLights, light.id])
				}
			}}
			className={`relative flex flex-col justify-center items-center text-center gap-2 transition-all ${
				selectedLights.includes(light.id)
					? 'bg-pink-300 shadow-pinkglow'
					: 'bg-stone-800 shadow-container'
			} aspect-square rounded-3xl p-4 overflow-hidden`}
		>
			<LightBulbIcon
				className={`w-16 h-16 stroke-2 transition-all ${
					selectedLights.includes(light.id) ? 'text-pink-500' : 'text-stone-700'
				}`}
			/>
			<p
				className={`absolute text-center w-full bottom-0 left-0 p-2 md:p-4 text-sm ${
					selectedLights.includes(light.id)
						? 'text-stone-900'
						: 'text-stone-200'
				} font-bold`}
				style={{
					textShadow: selectedLights.includes(light.id)
						? '0 0 16px rgb(249, 168, 212)'
						: '0 0 16px rgb(41, 37, 36)',
				}}
			>
				{light.name}
			</p>
		</button>
	)
}
