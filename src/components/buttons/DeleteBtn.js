import axios from 'axios'

export default function DeleteBtn({ id, groupType }) {
	const username = localStorage.getItem('username')
	function handleDelete() {
		axios.delete(`http://192.168.8.100/api/${username}/groups/${id}`)

		alert('you have deleted this group')

		window.history.back()
	}
	return (
		<button
			onClick={handleDelete}
			className='w-full bg-pink-300 shadow-pink rounded-3xl h-14 mt-6 font-bold text-stone-900 flex justify-center items-center'
		>
			Delete {groupType}
		</button>
	)
}
