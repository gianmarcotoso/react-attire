import { SyntheticEvent } from 'react'
import { Data } from '../contracts/Data'

type OnChangeFunction = {
	(event: Event | SyntheticEvent<HTMLInputElement>): void
	(delta: Data): void
	(name: string, value: any): void
}

export { OnChangeFunction }
