
import { of } from 'rxjs'

export const set = (vars, name, value) => {
	vars[name] = value
	return of()
}
