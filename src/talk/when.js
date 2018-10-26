
import { of, from } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'

export const when = talk => (vars, ...args) => {
	while (args.length) {
		const cond = args.shift()
		if ('string' === typeof cond && args.length) {
			const body = args.shift()
			if (!isArray(body)) throw new Error('syntax error, body is required to be array')
			const [name, op, value] = `${cond}`.split(/\s/gui)
			const fn = table[op]
			if (!fn) throw new Error('fail to parse condition')
			if (fn(vars[name], value)) {
				return from(body).pipe(concatMap(talk(vars)))
			}
		} else if (isArray(cond) && !args.length) {
			return from(cond).pipe(concatMap(talk(vars)))
		} else {
			throw new Error('invalid arguments length')
		}
	}
	return of()
}

const {isArray} = Array

const table = {
	'=': (q, w) => q == w,
	'==': (q, w) => q == w,
	'!=': (q, w) => q != w,
	'<>': (q, w) => q != w,
	'<': (q, w) => q < w,
	'<=': (q, w) => q <= w,
	'>': (q, w) => q > w,
	'>=': (q, w) => q >= w,
}
