import React, { Component } from 'react'
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'

import Button from '@material-ui/core/Button'
import { Right } from '../views'

export const enumForm = (vars, name, enums) => {
	let res
	class Form extends Component {
		constructor(...p) {
			super(...p)
			this.state = {
				done: false,
				selected: null,
			}
			this.select = v => {
				vars[name] = v
				this.setState({ done: true, selected: v })
				res()
			}
		}
		render() {
			const {
				state: { done, selected },
				select,
			} = this
			return (
				<Right>
					{enums.map(name => {
						const [label, value] = Array.isArray(name) ? name : [name, name]
						return (
							<Button
								color="primary"
								readOnly={selected === value}
								disabled={!!done && selected !== value}
								key={value}
								onClick={() => select(value)}
							>
								{label}
							</Button>
						)
					})}
				</Right>
			)
		}
	}
	return of(1, 0).pipe(
		concatMap(num => (num ? of(<Form />) : new Promise(r => (res = r)))),
		filter(_ => _),
	)
}
