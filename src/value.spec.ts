import { value } from './value'

describe('value', () => {
	it('should return an empty string when no parameter is passed', () => {
		expect(value()).toEqual('')
	})

	it('should return the parameter that is passed, when present', () => {
		expect(value('hello')).toEqual('hello')
	})
})
