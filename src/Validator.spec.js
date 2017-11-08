import { mount } from 'enzyme'
import React from 'react'

import { Attire } from './Attire'
import { Validator } from './Validator'

describe('Validator', () => {
	it('validates the data its passed and renders the render prop with the current validation status', () => {
		const mockAttire = (
			<Attire>
				{(data, onChange) => (
					<div>
						<input type="text" name="text" onChange={onChange} value={data.text} />

						<Validator data={data} rules={{ text: v => v && v.length >= 5 }}>
							{(validated, validationStatus) => (
								<div id="validation-message">{validated ? 'OK' : 'KO'}</div>
							)}
						</Validator>
					</div>
				)}
			</Attire>
		)

		const wrap = mount(mockAttire)
		wrap.find('input').simulate('change', { target: { name: 'text', value: 'Hello' } })

		expect(wrap.find('#validation-message').text()).toBe('OK')
	})
})
