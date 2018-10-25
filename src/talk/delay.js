

export const usleep = ms => new Promise(s => setTimeout(s, ms))

export const delay = (_, ms) => usleep(ms)
