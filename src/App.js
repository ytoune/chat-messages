
import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import { story } from './subjects'
import { map } from 'rxjs/operators'

export const App = withStyles({
	root: {
		margin: 0,
		padding: 0,
		width: '100%',
		minHeight: '100vh',
	},
})(class App extends Component {
	constructor(...p) {
		super(...p)
		this.state = {}
	}
	componentDidMount() {
		this.$ = story.pipe(map(story => ({story}))).subscribe(this.setState.bind(this))
	}
	componentWillUnmount() {
		this.$.unsubscribe()
		this.$ = null
	}
	render() {
		const {
			props: {
				classes: {root},
			},
			state: {
				story,
			}
		} = this
		return (
			<div className={root}>
				{story}
			</div>
		)
	}
})
