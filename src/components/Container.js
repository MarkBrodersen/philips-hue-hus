export default function Container({
	children,
	fit,
	bg = true,
	padding,
	bgBlur,
}) {
	return (
		<div
			className={`${
				bg &&
				'bg-gradient-to-tr from-stone-800/50 to-stone-800 shadow-container'
			} ${fit && 'w-fit h-fit'} rounded-3xl ${padding && padding} ${
				bgBlur && 'backdrop-blur-md'
			}`}
		>
			{children}
		</div>
	)
}
