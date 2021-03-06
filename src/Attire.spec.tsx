import { mount } from 'enzyme'
import * as React from 'react'

import { Attire } from './Attire'

describe('Attire', () => {
	it('should initialize its data with the value of the `initial` prop', () => {
		const form = (
			<Attire initial={{ yolo: 'swag' }}>
				{data => <input name="yolo" value={data.yolo} onChange={() => {}} />}
			</Attire>
		)

		const mounted = mount(form)
		expect(mounted.state()).toEqual({ data: { yolo: 'swag' } })
		expect(mounted.find('input').props().value).toBe('swag')
	})

	it('should update its data when the onChange callback is called with an Event', () => {
		const form = (
			<Attire initial={{ yolo: 'swag' }}>
				{(data, onChange) => <input name="yolo" value={data.yolo} onChange={onChange} />}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { name: 'yolo', value: 'yeo' } })
		const { data } = mounted.state() as any
		expect(data.yolo).toBe('yeo')
	})

	it('should update its data when the onChange callback is called with a property name and a value', () => {
		const form = (
			<Attire initial={{ yolo: 'swag' }}>
				{(data, onChange) => (
					<input
						name="yolo"
						value={data.yolo}
						onChange={e => onChange(e.target.name as any, e.target.value)}
					/>
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { name: 'yolo', value: 'yeo' } })
		const { data } = mounted.state() as any
		expect(data.yolo).toBe('yeo')
	})

	it('should update its data when the onChange callback is called with a delta object', () => {
		const form = (
			<Attire initial={{ yolo: 'swag' }}>
				{(data, onChange) => (
					<input name="yolo" value={data.yolo} onChange={e => onChange({ yolo: e.target.value })} />
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { name: 'yolo', value: 'yeo' } })
		const { data } = mounted.state() as any
		expect(data.yolo).toBe('yeo')
	})

	it('should correctly handle the cheked property on a checkbox input', () => {
		const form = (
			<Attire initial={{ yolo: false }}>
				{(data, onChange) => <input type="checkbox" name="yolo" checked={data.yolo} onChange={onChange} />}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { type: 'checkbox', name: 'yolo', checked: true } })
		expect(mounted.find('input').props().checked).toBe(true)
	})

	it('should correctly handle the cheked property on a checkbox input when using a manual event handler', () => {
		const form = (
			<Attire initial={{ yolo: false }}>
				{(data, onChange) => (
					<input
						type="checkbox"
						name="yolo"
						checked={data.yolo}
						onChange={e => onChange(e.target.name as any, e.target.checked)}
					/>
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { type: 'checkbox', name: 'yolo', checked: true } })
		expect(mounted.find('input').props().checked).toBe(true)
	})

	it('should call the global onChange callback when something changes', () => {
		const myChange = jest.fn()

		const form = (
			<Attire initial={{ yolo: false }} onChange={myChange}>
				{(data, onChange) => <input type="checkbox" name="yolo" checked={data.yolo} onChange={onChange} />}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { type: 'checkbox', name: 'yolo', checked: true } })
		expect(myChange).toHaveBeenCalled()
	})

	it('should reset the form to its initial value when the `reset` callback is called', () => {
		const form = (
			<Attire initial={{ yolo: 'hello' }}>
				{(data, onChange, reset) => (
					<div>
						<input type="checkbox" name="yolo" value={data.yolo} onChange={onChange} />
						<button onClick={reset}>Nuke</button>
					</div>
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { name: 'yolo', value: 'swag' } })
		expect(mounted.find('input').props().value).toBe('swag')

		mounted.find('button').simulate('click', {})
		expect(mounted.find('input').props().value).toBe('hello')
	})

	it('should call onInitialChange and completely replace the state when the value of the initial prop changes', () => {
		const initialOne = {
			test: 'hello',
			anotherOne: 'yooo'
		}

		const initialTwo = {
			test: 'hohoho'
		}

		const onInitialChange = jest.fn((data, prevInitial) => {
			return initialTwo
		})

		const Form = class extends React.Component {
			state = {
				currentInitial: initialOne
			}

			render() {
				return (
					<div>
						<button id="change" onClick={() => this.setState({ currentInitial: initialTwo })} />
						<Attire onInitialChange={onInitialChange} initial={this.state.currentInitial}>
							{(data, onChange) => (
								<div>
									<input type="checkbox" name="test" value={data.test} onChange={onChange} />
								</div>
							)}
						</Attire>
					</div>
				)
			}
		}

		const mounted = mount(<Form />)
		mounted.find('#change').simulate('click')

		const { data } = mounted
			.children()
			.find(Attire)
			.state() as any
		expect(data.test).toEqual(initialTwo.test)
		expect(data.anotherOne).toBeUndefined()
		expect(onInitialChange).toHaveBeenCalled()
	})
})
