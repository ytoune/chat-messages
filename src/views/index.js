
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

export const Right = withStyles({
	root: {
		textAlign: 'right',
	},
})(({classes: {root}, children}) => (
	<div className={root}>{children}</div>
))

export const Left = withStyles({
	root: {
		textAlign: 'left',
	},
})(({classes: {root}, children}) => (
	<div className={root}>{children}</div>
))
