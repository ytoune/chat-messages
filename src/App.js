
import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'

import { story } from './subjects'
import { map } from 'rxjs/operators'

export const App = withStyles({
	root: {
		margin: 0,
		padding: 10,
		// width: '100%',
		minHeight: '100vh',
		background: '#e3e3e3',
	},
	card: {
		marginBottom: 3,
	},
	content: {
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16,
		paddingRight: 16,
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
				classes: {root, card, content},
			},
			state: {
				story,
			}
		} = this
		if (!Array.isArray(story)) return null
		return (
			<div className={root}>
				{story.map((row, i) => (
					<Card key={i} className={card}>
						<Paper className={content}>
							{row}
						</Paper>
					</Card>
				))}
			</div>
		)
	}
})
