export default function Container({ children, fit, bg = true, padding }) {
	return (
		<div
			className={`${
				bg && 'bg-gradient-to-tr from-zinc-800/50 to-zinc-800 shadow-container'
			} ${fit && 'w-fit h-fit'} rounded-3xl ${padding && padding}`}
		>
			{children}
		</div>
	)
}
