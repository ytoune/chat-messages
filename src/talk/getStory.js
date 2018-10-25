
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'
import { CLEAR } from './consts'

import { pushPart } from '../subjects/part'

import { stringify } from 'query-string'

export const getStory = (vars, names) => {
	const query = names.reduce((o, name) => ({...o, [name]: vars[name]}), {})
	const {file} = vars
	return of(1, 0).pipe(
		concatMap(
			n => n ?
				of(CLEAR) :
				fetch(`./${file}?${stringify(query)}`)
					.then(r => r.json())
					.then(pushPart)
					.then(() => null)
		),
		filter(_ => _),
	)
}
