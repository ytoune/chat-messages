
import React from 'react'
import { of } from 'rxjs'

import Button from '@material-ui/core/Button'

/* eslint-disable react/jsx-no-target-blank */
const Ln = ({children, href}) => (
	<a href={href} target="_blank">{children}</a>
)
/* eslint-enable */

export const link = (vars, title, href) => of(
	<Button color="primary" href={href} component={Ln}>
		{title}
	</Button>
)
