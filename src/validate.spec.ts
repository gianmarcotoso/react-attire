import { validate } from './validate'

describe('validate', () => {
	it('should perform a simple validation', () => {
		const rules = {
			name: v => v && v.length >= 3
		}

		expect.assertions(1)
		return expect(validate(rules, { name: 'billy' })).resolves.toEqual({ name: 'billy' })
	})

	it('should reject an object that does not follow the rules', () => {
		const rules = {
			name: v => v && v.length >= 3
		}

		expect.assertions(1)
		return expect(validate(rules, { name: 'yo' })).rejects.toEqual({ name: false })
	})

	it('should allow validation with a curried function', () => {
		const rules = {
			name: v => v && v.length >= 3
		}

		const validateName = validate(rules)

		expect.assertions(1)
		return expect(validateName({ name: 'billy' })).resolves.toEqual({ name: 'billy' })
	})
})
