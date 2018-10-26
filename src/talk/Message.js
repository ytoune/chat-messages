
import React from 'react'
import { of } from 'rxjs'

import { Message } from '../views'
import Typography from '@material-ui/core/Typography'

export const message = (vars, text) => {
	const {speaker, icon} = vars
	return of(
		<Message icon={icon} speaker={speaker}>
			<Typography>{
				text.replace(/__([a-zA-Z0-9]+)__/gui, (_, name) => vars[name])
			}</Typography>
		</Message>
	)
}
