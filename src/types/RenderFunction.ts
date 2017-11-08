import { ReactNode } from 'react'

import { OnChangeFunction } from './OnChangeFunction'
import { OnResetFunction } from './OnResetFunction'

import { Data } from '../contracts/Data'

type RenderFunction = {
	(data: Data, onChange: OnChangeFunction, onReset: OnResetFunction): ReactNode
}

export { RenderFunction }
