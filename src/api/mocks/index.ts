import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyRevenueInPeriodMock } from './getDailyRevenueInPeriodMock'
import { getDayOrdersAmountMock } from './getDayOrdersAmountMock'
import { getManagedRestaurantMock } from './getManagedRestaurantMock'
import { getMonthCanceledOrdersAmountMock } from './getMonthCanceledOrdersAmountMock'
import { getMonthOrdersAmountMock } from './getMonthOrdersAmountMock'
import { getMonthRevenueMock } from './getMonthRevenueMock'
import { getOrderDetailsMock } from './getOrderDetailsMock'
import { getOrdersMock } from './getOrdersMock'
import { getPopularProductsMock } from './getPopularProductsMock'
import { getProfileMock } from './getProfileMock'
import { registerRestaurantMock } from './registerRestaurantMock'
import { signInMock } from './signInMock'
import { updateProfileMock } from './updateProfileMock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
