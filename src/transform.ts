function transform(rules: object): (data: object) => object
function transform(rules: object, data: object): object
function transform(rules: object, data?: object): object {
	const closure = (data = {}) => {
		if (!rules || Object.keys(rules).length === 0) {
			return data
		}

		return Object.keys(data).reduce((result, key) => {
			if (rules[key]) {
				return {
					...result,
					[key]: rules[key].call(undefined, data[key], data)
				}
			}

			return {
				...result,
				[key]: data[key]
			}
		}, {})
	}

	return data ? closure(data) : closure
}

export { transform }
