import { of } from 'rxjs'

import { set } from './set'
import { message } from './message'
import { delay } from './delay'
import { dateForm, timeForm, datetimeForm } from './dateForm'
import { enumForm } from './enumForm'
import { selectForm } from './selectForm'
import { link } from './link'
import { pending } from './pending'
import { clear } from './clear'
import { getStory } from './getStory'

import { when } from './when'

export { readFile } from './getStory'

export { CLEAR, NO_CHANGE, POP } from './consts'

const table = {
	set,
	message,
	delay,
	dateForm,
	timeForm,
	datetimeForm,
	enumForm,
	selectForm,
	link,
	pending,
	clear,
	getStory,
}

export const talk = vars => ([method, ...args]) => {
	const fn = table[method]

	const view = fn ? fn(vars, ...args) : of()

	return view
}

table.when = when(talk)
