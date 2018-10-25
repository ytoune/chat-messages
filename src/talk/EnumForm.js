
import React, { Component } from 'react'
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'

import Button from '@material-ui/core/Button'
import { Right } from '../views'

export const EnumForm = (vars, name, enums) => {
	let res
	class Form extends Component {
		constructor(...p) {
			super(...p)
			this.state = {
				disabled: false,
			}
			this.select = v => {
				vars[name] = v
				this.setState({disabled: true})
				res()
			}
		}
		render() {
			const {
				state: {disabled},
				select,
			} = this
			return (
				<Right>
					{enums.map(str => (
						<Button
							color="primary"
							disabled={!!disabled}
							key={str}
							onClick={() => select(str)}
						>
							{str}
						</Button>
					))}
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
