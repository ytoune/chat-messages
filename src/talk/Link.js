
import React from 'react'
import { of } from 'rxjs'

/* eslint-disable react/jsx-no-target-blank */
export const Link = (vars, title, href) => of(
	<div>
		<a href={href} target="_blank">{title}</a>
	</div>
)
/* eslint-enable */
