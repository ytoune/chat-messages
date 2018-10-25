
import { ReplaySubject } from 'rxjs'

export const part = new ReplaySubject()

export const pushPart = item => part.next(item)
