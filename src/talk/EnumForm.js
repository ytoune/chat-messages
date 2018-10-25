
import React, { Component } from 'react'
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'

export const EnumForm = (vars, name, enums) => {
	let res
	class Form extends Component {
		constructor(...p) {
			super(...p)
			this.state = {
				p: false,
			}
		}
		render() {
			if (this.state.p) return null
			const select = v => {
				vars[name] = v
				this.setState({p: true})
				res()
			}
			return <div>
				{enums.map(str => (
					<button key={str} onClick={() => select(str)}>{str}</button>
				))}
			</div>
		}
	}
	return of(1, 0).pipe(
		concatMap(
			num => num ?
				of(<Form/>) :
				new Promise(r => res = r)
		),
		filter(_ => _),
	)
}
