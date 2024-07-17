import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { signInMock } from './signInMock'

export const worker = setupWorker(signInMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
