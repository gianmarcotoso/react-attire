import React from 'react'

import { validate } from './validate'

class Validator extends React.Component {
	render() {
		const { data, rules } = this.props
		const validationStatus = validate(rules, data)

		return this.props.children(validationStatus.validated, validationStatus.status)
	}
}

export { Validator }
