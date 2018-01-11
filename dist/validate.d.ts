import { ValidationRules } from './contracts';
declare function validate<S = object>(rules: ValidationRules<S>): (data: S) => Promise<object>;
declare function validate<S = object>(rules: ValidationRules<S>, data: S): Promise<object>;
export { validate };
