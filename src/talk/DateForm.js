
import React, { Component } from 'react'
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'

import { Right } from '../views'

export const DateForm = (vars, name) => {
	let res
	class Form extends Component {
		constructor(...p) {
			super(...p)
			this.state = {
				v: '1990-01-01',
				p: false,
			}
		}
		render() {
			if (this.state.p) return null
			const onSubmit = e => {
				vars[name] = this.state.v
				this.setState({p: true})
				res()
				e.preventDefault()
				return false
			}
			return (
				<Right>
					<form onSubmit={onSubmit}>
						<input type="date" value={this.state.v} onChange={({target: {value}}) => this.setState({v: value})}/>
						<button onClick={onSubmit}>ok</button>
					</form>
				</Right>
			)
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
