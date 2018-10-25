
import { cloneElement } from 'react'

import { from } from 'rxjs'
import { concatMap, filter, scan } from 'rxjs/operators'

import { talk, NO_CHANGE, CLEAR } from '../talk'

import { part } from './part'

export const story =
	part.pipe(
		concatMap(
			({title, body}) => {
				const el = document.querySelector('title')
				if (el) el.innerText = title
				return from(body)
			}
		),
		concatMap(talk({})),
		filter(v => NO_CHANGE !== v && v),
		scan(
			(lst, c) =>
				CLEAR === c ?
					[] :
					[...lst, cloneElement(c, {key: lst.length})],
			[]
		),
	)
