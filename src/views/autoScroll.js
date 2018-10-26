
import * as SmoothScroll from 'smooth-scroll'

export const autoScroll = element => {
	if (inView(element)) return
	const scroll = new SmoothScroll()
	scroll.animateScroll(element)
	return () => {
		scroll.cancelScroll()
		scroll.destroy()
	}
}

const inView = element => {
	const rect = element.getBoundingClientRect()
	let t
	const viewTop = (
		((t = document.documentElement) || (t = document.body.parentNode))
		&& 'number' === typeof t.scrollTop ? t : document.body
	).scrollTop
	const viewBottom = viewTop + window.innerHeight
	const top = viewTop + rect.top
	const bottom = viewTop + rect.bottom
	if (viewTop <= top && bottom <= viewBottom) {
		return true
	}
}
