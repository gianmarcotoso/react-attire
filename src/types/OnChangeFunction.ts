import { SyntheticEvent } from 'react'

type OnChangeFunction<FormState> = {
	(event: Event | SyntheticEvent<HTMLInputElement>): void
	(delta: Partial<FormState>): void
	<K extends keyof FormState>(name: K, value: any): void
}

export { OnChangeFunction }
