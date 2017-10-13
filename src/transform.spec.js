import { transform } from './transform'

describe('transform', () => {
	it('should perform a simple transformation', () => {
		const rules = {
			name: v => v && v.toUpperCase()
		}

		expect(transform(rules, { name: 'billy' })).toEqual({ name: 'BILLY' })
	})

	it('should return a function if only the rules are passed', () => {
		const rules = {
			name: v => v && v.toUpperCase()
		}

		expect(transform(rules)).toBeInstanceOf(Function)
	})

	it('should perform a transformation from a curried function', () => {
		const rules = {
			name: v => v && v.toUpperCase()
		}

		const transformName = transform(rules)

		expect(transformName({ name: 'billy' })).toEqual({ name: 'BILLY' })
	})

	it('should not transform values without a transform function', () => {
		const rules = {
			name: v => v && v.toUpperCase()
		}

		expect(transform(rules, { surname: 'billson' })).toEqual({ surname: 'billson' })
	})

	it('should return the original object if no rules are defined', () => {
		expect(transform(undefined, { name: 'billy' })).toEqual({ name: 'billy' })
	})

	it('should return the original object if no rules are passed to the curried function', () => {
		const doNothing = transform()

		expect(doNothing({ name: 'billy' })).toEqual({ name: 'billy' })
	})

	it('should return an empty object if no data is passed to the curried function', () => {
		const rules = {
			name: v => v && v.toUpperCase()
		}

		const transformName = transform(rules)

		expect(transformName()).toEqual({})
	})
})
