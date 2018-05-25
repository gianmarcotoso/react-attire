import { RenderFunction } from '../types/RenderFunction';
interface AttireProps<FormState> {
    initial?: Partial<FormState>;
    onChange?(data: FormState): void;
    onInitialChange?(data: FormState, prevInitial: Partial<FormState>): FormState;
    children: RenderFunction<FormState>;
}
export { AttireProps };
