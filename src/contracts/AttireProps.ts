import { Data } from './Data'
import { RenderFunction } from '../types/RenderFunction'

interface AttireProps {
	initial: Data

	onChange?(data: Data): void
	children: RenderFunction
}

export { AttireProps }
