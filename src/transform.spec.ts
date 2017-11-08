import { transform } from './transform'

describe('transform', () => {
	it('should perform a simple transformation', () => {
		const rules = {
			name: (v: string) => v && v.toUpperCase()
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
})
