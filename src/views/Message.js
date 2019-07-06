import React, { Fragment } from 'react'

import Chip from '@material-ui/core/Chip'
import Icon from '@material-ui/core/Icon'

import { Hidable } from '../views'
import { withStyles } from '@material-ui/core/styles'

const Line = withStyles({
	root: {
		marginTop: '.5em',
	},
})(({ children, classes: { root } }) => <div className={root}>{children}</div>)

export const Message = ({ icon, speaker, children }) => (
	<Fragment>
		<Hidable show={speaker}>
			<Chip
				icon={icon ? <Icon>{icon}</Icon> : null}
				label={speaker}
				clickable
				variant="outlined"
			/>
		</Hidable>
		<Line>{children}</Line>
	</Fragment>
)
