
import { of } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { safeLoad } from 'js-yaml'
import { pushPart } from '../subjects/part'
import { stringify } from 'query-string'

const parseYaml = _ => safeLoad(_.replace(/](\s+)\[/gui, '],$1['))

export const readFile = (file, query) =>
	fetch(`./${file}?${stringify(query)}`)
		.then(r => r.text())
		.then(parseYaml)
		.then(pushPart)
		.then(() => null)

export const getStory = (vars, file, ...names) => {
	const query = names.reduce((o, name) => ({...o, [name]: vars[name]}), {})
	return of(0).pipe(
		concatMap(_ => readFile(file, query)),
	)
}
