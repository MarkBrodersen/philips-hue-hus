export default function ListItem({ index, title, desc }) {
	return (
		<li className='flex gap-4'>
			<div className='w-6 h-6 bg-pink-300 shadow-pink flex justify-center items-center rounded-full text-stone-800 font-bold text-sm shrink-0'>
				{index + 1}
			</div>
			<div className='flex flex-col gap-1'>
				<h3 className='text-stone-100 font-bold text-lg h-6 flex items-center'>
					{title}
				</h3>
				<p className='text-stone-400'>{desc}</p>
			</div>
		</li>
	)
}
