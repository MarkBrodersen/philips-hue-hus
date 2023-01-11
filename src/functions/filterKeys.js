export default function filterKeys(object, filter) {
	const array = Object.keys(object).map(key => {
		return { ...object[key], id: key }
	})

	if (!filter) {
		return array
	}

	return array.filter(filter)
}
