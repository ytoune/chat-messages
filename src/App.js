
import React, { Component, createRef } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import { story } from './subjects'
import { map } from 'rxjs/operators'

import { autoScroll } from './views/autoScroll'

const bodystyle = document.createElement('style')
document.head.append(bodystyle)
bodystyle.innerHTML = `
	body {
		margin: 0;
		padding: 0;
		background: #e3e3e3;
	}
`

export const App = withStyles({
	root: {
		margin: 0,
		padding: 10,
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
		this.lastref = createRef()
		this.prevref = null
	}
	componentDidMount() {
		this.$ = story.pipe(map(story => ({story}))).subscribe(this.setState.bind(this))
	}
	componentDidUpdate() {
		const current = this.lastref.current
		const prev = this.prevref
		if (!current || prev === current) return
		this.prevref = current
		if (this._cancel) this._cancel()
		this._cancel = autoScroll(current)
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
			},
			lastref,
		} = this
		if (!Array.isArray(story)) return null
		return (
			<div className={root}>
				{story.map((row, i) => (
					<div key={i} className={card} ref={i === story.length - 1 ? lastref : null}>
						<Paper className={content}>
							{row}
						</Paper>
					</div>
				))}
			</div>
		)
	}
})
