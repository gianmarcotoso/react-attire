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
		expect(mounted.state().data.yolo).toBe('yeo')
	})

	it('should update its data when the onChange callback is called with a property name and a value', () => {
		const form = (
			<Attire initial={{ yolo: 'swag' }}>
				{(data, onChange) => (
					<input
						name="yolo"
						value={data.yolo}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { name: 'yolo', value: 'yeo' } })
		expect(mounted.state().data.yolo).toBe('yeo')
	})

	it('should update its data when the onChange callback is called with a delta object', () => {
		const form = (
			<Attire initial={{ yolo: 'swag' }}>
				{(data, onChange) => (
					<input
						name="yolo"
						value={data.yolo}
						onChange={e => onChange({ yolo: e.target.value })}
					/>
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted.find('input').simulate('change', { target: { name: 'yolo', value: 'yeo' } })
		expect(mounted.state().data.yolo).toBe('yeo')
	})

	it('should correctly handle the cheked property on a checkbox input', () => {
		const form = (
			<Attire initial={{ yolo: false }}>
				{(data, onChange) => (
					<input type="checkbox" name="yolo" checked={data.yolo} onChange={onChange} />
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted
			.find('input')
			.simulate('change', { target: { type: 'checkbox', name: 'yolo', checked: true } })
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
						onChange={e => onChange(e.target.name, e.target.checked)}
					/>
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted
			.find('input')
			.simulate('change', { target: { type: 'checkbox', name: 'yolo', checked: true } })
		expect(mounted.find('input').props().checked).toBe(true)
	})

	it('should call the global onChange callback when something changes', () => {
		let flag = false
		const myChange = data => {
			flag = true
		}

		const form = (
			<Attire initial={{ yolo: false }} onChange={myChange}>
				{(data, onChange) => (
					<input type="checkbox" name="yolo" checked={data.yolo} onChange={onChange} />
				)}
			</Attire>
		)

		const mounted = mount(form)
		mounted
			.find('input')
			.simulate('change', { target: { type: 'checkbox', name: 'yolo', checked: true } })
		expect(flag).toBe(true)
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
})
