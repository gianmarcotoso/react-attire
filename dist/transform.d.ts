import { TransformRules } from './contracts';
declare function transform<S = object>(rules: TransformRules<S>): (data: S) => object;
declare function transform<S = object>(rules: TransformRules<S>, data: S): object;
export { transform };
