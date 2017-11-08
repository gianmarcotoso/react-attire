import { validate } from './validate'

describe('validate', () => {
	it('should perform a simple validation', () => {
		const rules = {
			name: v => v && v.length >= 3
		}

		return expect(validate(rules, { name: 'billy' })).toEqual({ validated: true, status: { name: true } })
	})

	it('should reject an object that does not follow the rules', () => {
		const rules = {
			name: v => v && v.length >= 3
		}

		return expect(validate(rules, { name: 'yo' })).toEqual({ validated: false, status: { name: false } })
	})

	it('should allow validation with a curried function', () => {
		const rules = {
			name: v => v && v.length >= 3
		}

		const validateName = validate(rules)

		return expect(validateName({ name: 'billy' })).toEqual({ validated: true, status: { name: true } })
	})

	it('should resolve automatically if no rules are defined', () => {
		return expect(validate(undefined, { name: 'billy' })).toEqual({ validated: true, status: {} })
	})

	it('should resolve automatically if the rules are empty', () => {
		return expect(validate({}, { name: 'billy' })).toEqual({ validated: true, status: {} })
	})
})
