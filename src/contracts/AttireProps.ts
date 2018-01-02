import { RenderFunction } from '../types/RenderFunction'

interface AttireProps<FormState> {
	initial?: Partial<FormState>

	onChange?(data: FormState): void
	children: RenderFunction<FormState>
}

export { AttireProps }
