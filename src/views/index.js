import React from 'react'
import { withStyles } from '@material-ui/core/styles'

export const Right = withStyles({
	root: {
		textAlign: 'right',
	},
})(({ classes: { root }, children }) => <div className={root}>{children}</div>)

export const Left = withStyles({
	root: {
		textAlign: 'left',
	},
})(({ classes: { root }, children }) => <div className={root}>{children}</div>)

export const Hidable = ({ show, children }) => (show ? children : null)

export { Message } from './Message'

export { TimeInput, DateInput, DateTimeInput } from './DateInput'
