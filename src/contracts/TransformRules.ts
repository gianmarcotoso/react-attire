import { TransformFunction } from '../types/TransformFunction'

export interface TransformRules<S> {
	[key: string]: TransformFunction<S>
}
