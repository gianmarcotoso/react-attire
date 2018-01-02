import { TransformRules } from './contracts'

function transform<S = object>(rules: TransformRules<S>): (data: S) => object
function transform<S = object>(rules: TransformRules<S>, data: S): object
function transform<S = object>(rules: TransformRules<S>, data?: S): object {
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
