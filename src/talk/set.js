
import { of } from 'rxjs'

export const set = (vars, name, _value) => {
	let value = _value
	const txt = `${value}`.replace(/__([a-zA-Z0-9]+)__/gui, (_, name) => vars[name])
	if (txt.match(/^[0-9\.+\-\/*%\s)(]+$/)) {
		value = eval(txt)
	}
	vars[name] = value
	return of()
}
