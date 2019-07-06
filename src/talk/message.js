import React from 'react'
import { of } from 'rxjs'

import { Message } from '../views'
import Typography from '@material-ui/core/Typography'

import { withVars } from './set'

export const message = (vars, text) => {
	const { speaker, icon } = vars
	return of(
		<Message icon={icon} speaker={speaker}>
			<Typography>{withVars(text, vars)}</Typography>
		</Message>,
	)
}
