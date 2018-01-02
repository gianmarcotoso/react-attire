import { ValidationRules } from './contracts';
declare function validate<S = object>(rules: ValidationRules<S>): (data: S) => object;
declare function validate<S = object>(rules: ValidationRules<S>, data: S): object;
export { validate };
