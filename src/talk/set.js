import { of } from 'rxjs'

export const set = (vars, name, _value) => {
	let value = _value
	const txt = withVars(`${value}`, vars)
	if (txt.match(/^[0-9.+\-/*%\s)(]+$/)) {
		// eslint-disable-next-line no-eval
		value = eval(txt)
	}
	vars[name] = value
	return of()
}

export const withVars = (text, vars) =>
	text.replace(/__([a-zA-Z0-9]+)(|%[a-zA-Z]+)__/giu, (_, name, method) => {
		const f = table[method]
		return f ? f(vars[name]) : vars[name]
	})

const table = {
	'%length': q => q.length,
	'%trim': q => q.trim(),
	'%year': q => q.match(/\d+/gu)[0],
	'%month': q => q.match(/\d+/gu)[1],
	'%day': q => q.match(/\d+/gu)[2],
}
