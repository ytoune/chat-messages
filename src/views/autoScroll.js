
import * as SmoothScroll from 'smooth-scroll'

export const autoScroll = element => {
	if (inView(element)) return
	const scroll = new SmoothScroll()
	scroll.animateScroll(getPosition(element))
	return () => {
		scroll.cancelScroll()
		scroll.destroy()
	}
}

const inView = element => {
	const {top, bottom} = element.getBoundingClientRect()
	const {innerHeight: height} = window
	if (0 <= top && bottom <= height) {
		return true
	}
}

const getPosition = element => {
	const {top, bottom} = element.getBoundingClientRect()
	const {innerHeight: height} = window
	const goTop = Math.max(0 - top, 0) >= Math.max(bottom - height, 0)
	return goTop ?
		getViewTop() + top - 16 :
		getViewTop() + bottom + 16 - height
}

const getViewTop = () => {
	let t
	return (
		((t = document.documentElement) || (t = document.body.parentNode))
		&& 'number' === typeof t.scrollTop ? t : document.body
	).scrollTop
}
