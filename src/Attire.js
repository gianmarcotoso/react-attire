import { func, object } from 'prop-types'
import React from 'react'

class Attire extends React.Component {
	static propTypes = {
		initial: object,
		onChange: func,
		render: func
	}

	static defaultProps = {
		initial: {}
	}

	constructor(props) {
		super(props)

		this.state = {
			data: { ...props.initial }
		}
	}

	handleFormValueChange = (...args) => {
		const { onChange } = this.props

		let delta = {}
		if (args.length === 1) {
			const [event] = args
			const { name, type, checked, value } = event.target

			delta = {
				[name]: type === 'checkbox' ? checked : value
			}
		}

		if (args.length === 2) {
			const [name, value] = args

			delta = {
				[name]: value
			}
		}

		this.setState(state => {
			const data = { ...state.data, ...delta }

			if (onChange) {
				onChange(data)
			}

			return { data }
		})
	}

	handleFormReset = () => {
		const { initial, onChange } = this.props

		this.setState(state => {
			if (onChange) {
				onChange({ ...initial })
			}

			return { data: { ...initial } }
		})
	}

	render() {
		return this.props.children(this.state.data, this.handleFormValueChange, this.handleFormReset)
	}
}

export { Attire }
