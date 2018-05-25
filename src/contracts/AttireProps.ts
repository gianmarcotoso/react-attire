import { RenderFunction } from '../types/RenderFunction'

interface AttireProps<FormState> {
	initial?: Partial<FormState>

	onChange?(data: FormState): void
	onInitialChange?(
		data: FormState,
		prevInitial: Partial<FormState>,
		currentInitial: Partial<FormState>
	): FormState | false
	children: RenderFunction<FormState>
}

export { AttireProps }
