import React, { Component } from 'react'
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'
import Loading from 'react-loading'

import { Message } from '../views'
import { POP } from './consts'

export const pending = ({ icon, speaker }, ms) => {
	let resolve
	class Mortal extends Component {
		constructor(...p) {
			super(...p)
			this.state = {}
		}
		componentDidMount() {
			this._id = setTimeout(() => {
				this.setState({ dead: true })
				resolve(POP)
			}, ms)
		}
		componentWillUnmount() {
			clearTimeout(this._id)
		}
		render() {
			return this.state.dead ? null : (
				<Message icon={icon} speaker={speaker}>
					<Loading type="bubbles" height="1em" width="1em" color="#000" />
				</Message>
			)
		}
	}
	const prom = new Promise(r => (resolve = r))
	return of(1, 0).pipe(
		concatMap(num => (num ? of(<Mortal />) : prom)),
		filter(_ => _),
	)
}
