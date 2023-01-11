import * as Icon from 'lucide-react'

export default function LucideIcon({ icon, ...props }) {
	const IconComponent = Icon[icon]
	return <IconComponent {...props} />
}
