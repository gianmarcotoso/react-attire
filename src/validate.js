class ValidationStatus {
	constructor(keys) {
		this.status = keys.reduce
			? keys.reduce((result, next) => {
					return {
						...result,
						[next]: true
					}
				}, {})
			: {}

		this.validated = true
	}

	pass(key) {
		if (!this.status[key]) return

		this.status[key] = true
	}

	fail(key) {
		if (!this.status[key]) return

		this.status[key] = false
		this.validated = false
	}
}

export function validate(rules, data) {
	const closure = data => {
		if (!rules || Object.keys(rules).length === 0) {
			return new ValidationStatus({})
		}

		const validationStatus = new ValidationStatus(Object.keys(rules))
		Object.keys(rules).forEach(key => {
			!!rules[key].call(undefined, data[key], data)
				? validationStatus.pass(key)
				: validationStatus.fail(key)
		})

		return validationStatus
	}

	return data ? closure(data) : closure
}
