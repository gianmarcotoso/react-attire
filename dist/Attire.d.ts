/// <reference types="react" />
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { AttireProps, AttireState } from './contracts';
import { OnChangeFunction, OnResetFunction } from './types';
declare class Attire extends React.Component<AttireProps, AttireState> {
    static defaultProps: {
        initial: {};
    };
    constructor(props: AttireProps);
    private _updateStateWithDelta(delta);
    _handleFormValueChangeEvent(event: Event | SyntheticEvent<HTMLInputElement>): void;
    handleFormValueChange: OnChangeFunction;
    handleFormReset: OnResetFunction;
    render(): React.ReactNode;
}
export { Attire };
