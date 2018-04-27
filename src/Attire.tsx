import * as React from 'react'
import { SyntheticEvent, ReactNode } from 'react'

import { AttireProps, AttireState } from './contracts'
import { OnChangeFunction, OnResetFunction, RenderFunction } from './types'

class Attire<FormState = { [key: string]: any }> extends React.Component<
	AttireProps<FormState>,
	AttireState<FormState>
> {
	static defaultProps = {
		initial: {}
	}

	componentDidUpdate(prevProps: AttireProps<FormState>) {
		if (prevProps.initial !== this.props.initial) {
			const data = this.props.onInitialChange(this.state.data, prevProps.initial)
			this._updateStateWithDelta(data as Partial<FormState>)
		}
	}

	constructor(props: AttireProps<FormState>) {
		super(props)

		this.state = {
			data: Object.assign({}, props.initial as FormState)
		}
	}

	private _updateStateWithDelta(delta: object): void {
		const { onChange } = this.props

		this.setState(state => {
			const data = Object.assign({}, state.data, delta)

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

	handleFormValueChange: OnChangeFunction<FormState> = (...args: any[]) => {
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
				onChange(initial as FormState)
			}

			return { data: initial as FormState }
		})
	}

	render() {
		return this.props.children(this.state.data, this.handleFormValueChange, this.handleFormReset)
	}
}

export { Attire }
