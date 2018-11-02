import * as React from 'react';
import { SyntheticEvent } from 'react';
import { AttireProps, AttireState } from './contracts';
import { OnChangeFunction, OnResetFunction } from './types';
declare class Attire<FormState = {
    [key: string]: any;
}> extends React.Component<AttireProps<FormState>, AttireState<FormState>> {
    static defaultProps: {
        initial: {};
    };
    componentDidUpdate(prevProps: AttireProps<FormState>): void;
    constructor(props: AttireProps<FormState>);
    private _updateStateWithDelta;
    _handleFormValueChangeEvent(event: Event | SyntheticEvent<HTMLInputElement>): void;
    handleFormValueChange: OnChangeFunction<FormState>;
    handleFormReset: OnResetFunction;
    render(): React.ReactNode;
}
export { Attire };
