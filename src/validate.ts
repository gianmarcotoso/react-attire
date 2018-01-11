import { ValidationRules } from './contracts'

function validate<S = object>(rules: ValidationRules<S>): (data: S) => Promise<object>
function validate<S = object>(rules: ValidationRules<S>, data: S): Promise<object>
function validate<S = object>(rules: ValidationRules<S>, data?: S): any {
	const closure = data => {
		return new Promise((resolve, reject) => {
			if (!rules || Object.keys(rules).length === 0) {
				return resolve(data)
			}

			const validationStatus = {}
			const validated = Object.keys(rules).reduce((result, key) => {
				let validates = result

				validates = !!rules[key].call(undefined, data[key], data)
				validationStatus[key] = validates

				return result === false ? false : validates
			}, true)

			return validated ? resolve(data) : reject(validationStatus)
		})
	}

	return data ? closure(data) : closure
}

export { validate }
