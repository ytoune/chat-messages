
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'
import { safeLoad } from 'js-yaml'
import { pushPart } from '../subjects/part'
import { stringify } from 'query-string'

const parseYaml = _ => safeLoad(_)

export const readFile = (file, query) =>
	fetch(`./${file}?${stringify(query)}`)
		.then(r => r.text())
		.then(parseYaml)
		.then(pushPart)
		.then(() => null)

export const getStory = (vars, file, ...names) => {
	const query = names.reduce((o, name) => ({...o, [name]: vars[name]}), {})
	return of(0).pipe(
		concatMap(n => readFile(file, query)),
	)
}
