/// <reference types="react" />
import { ReactNode } from 'react';
import { OnChangeFunction } from './OnChangeFunction';
import { OnResetFunction } from './OnResetFunction';
declare type RenderFunction<FormState> = {
    (data: FormState, onChange: OnChangeFunction<FormState>, onReset: OnResetFunction): ReactNode;
};
export { RenderFunction };
