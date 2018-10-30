
import React, { Component } from 'react'
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'
import Button from '@material-ui/core/Button'
import {
	Right,
	TimeInput,
	DateInput,
	DateTimeInput,
} from '../views'
import { DateTime } from 'luxon'

const wrap = (Input, outfmt, infmt) => (vars, name, initdatetime) => {
	let res
	class Form extends Component {
		constructor(...p) {
			super(...p)
			this.state = {
				v: infmt && initdatetime ?
					DateTime.fromFormat(initdatetime, infmt) :
					DateTime.local(),
				p: false,
			}
		}
		render() {
			if (this.state.p) return (
				<Right>
					<Button color="primary" readOnly>
						{this.state.v.toFormat(outfmt)}
					</Button>
				</Right>
			)
			const onSubmit = () => {
				const {state: {v}} = this
				vars[name] = v.toFormat(outfmt)
				this.setState({p: true})
				res()
			}
			const onChange = async value => {
				await this.setState({v: value})
				onSubmit()
			}
			return (
				<Right>
					<Input value={this.state.v} onChange={onChange}/>
					<Button color="primary" onClick={onSubmit}>OK</Button>
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


export const dateForm = wrap(DateInput, 'y年L月d日', 'y-L-d')
export const datetimeForm = wrap(DateTimeInput, 'y年L月d日 H時m分', 'y-L-d H:m')
export const timeForm = wrap(TimeInput, 'H時m分', 'H:m')
