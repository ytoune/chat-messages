
import { of } from 'rxjs'

import { set } from './set'
import { Message } from './Message'
import { delay } from './delay'
import { DateForm } from './DateForm'
import { EnumForm } from './EnumForm'
import { Link } from './Link'
import { getStory } from './getStory'

export { readFile } from './getStory'

export {
	CLEAR,
	NO_CHANGE,
} from './consts'

export const talk = vars => ([method, ...args]) => {

	const fn = table[method]

	const view =
		fn ?
			fn(vars, ...args) :
			of()

	return view

}

const table = {
	set,
	Message,
	delay,
	DateForm,
	EnumForm,
	Link,
	getStory,
}
