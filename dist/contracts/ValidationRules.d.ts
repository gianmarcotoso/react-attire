import { ValidateFunction } from '../types/ValidateFunction';
export interface ValidationRules<S> {
    [key: string]: ValidateFunction<S>;
}
