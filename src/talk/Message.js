
import React, { Fragment } from 'react'
import { of } from 'rxjs'

import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

const Line = withStyles({
	root: {
		marginTop: '.5em',
	}
})(Typography)

export const Message = (vars, text) => of(
	<Fragment>
		<Chip
			icon={<FaceIcon />}
			label={vars.speaker}
			variant="outlined"
		/>
		<Line>{
			text.replace(/__([a-zA-Z0-9]+)__/gui, (_, name) => vars[name])
		}</Line>
	</Fragment>
)
