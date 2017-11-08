import * as React from 'react'
import { SyntheticEvent, ReactNode } from 'react'

import { AttireProps, AttireState } from './contracts'
import { OnChangeFunction, OnResetFunction, RenderFunction } from './types'

class Attire extends React.Component<AttireProps, AttireState> {
	static defaultProps = {
		initial: {}
	}

	constructor(props: AttireProps) {
		super(props)

		this.state = {
			data: { ...props.initial }
		}
	}

	private _updateStateWithDelta(delta: object): void {
		const { onChange } = this.props

		this.setState(state => {
			const data = { ...state.data, ...delta }

			if (onChange) {
				onChange(data)
			}

			return { data }
		})
	}

	_handleFormValueChangeEvent(event: Event | SyntheticEvent<HTMLInputElement>): void {
		const { name, type, checked, value } = event.target as HTMLInputElement

		const delta = {
			[name]: type === 'checkbox' ? checked : value
		}

		this._updateStateWithDelta(delta)
	}

	handleFormValueChange: OnChangeFunction = (...args: any[]) => {
		if (args.length === 1) {
			const [deltaOrEvent] = args
			if (deltaOrEvent instanceof Event || deltaOrEvent.nativeEvent) {
				return this._handleFormValueChangeEvent(deltaOrEvent)
			}

			return this._updateStateWithDelta(deltaOrEvent)
		}

		if (args.length === 2) {
			const [name, value] = args
			return this._updateStateWithDelta({
				[name]: value
			})
		}
	}

	handleFormReset: OnResetFunction = () => {
		const { initial, onChange } = this.props

		this.setState(state => {
			if (onChange) {
				onChange({ ...initial })
			}

			return { data: { ...initial } }
		})
	}

	render() {
		return this.props.children(
			this.state.data,
			this.handleFormValueChange,
			this.handleFormReset
		)
	}
}

export { Attire }
