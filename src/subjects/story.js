
import { from } from 'rxjs'
import { switchMap, concatMap, filter, scan } from 'rxjs/operators'

import { talk, NO_CHANGE, CLEAR } from '../talk'

import { part } from './part'

export const story =
	part.pipe(
		switchMap(
			({title, body}) => {
				const el = document.querySelector('title')
				if (el && title) el.innerText = title
				return from(body)
			}
		),
		concatMap(talk({})),
		filter(v => NO_CHANGE !== v && v),
		scan(
			(lst, c) =>
				CLEAR === c ?
					[] :
					[...lst, c],
			[]
		),
	)
