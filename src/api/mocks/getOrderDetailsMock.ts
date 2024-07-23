import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../getOrderDetails'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '00123456789',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1500,
        product: {
          name: 'Pepperoni Pizza',
        },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 1000,
        product: {
          name: 'Mozzarella Pizza',
        },
        quantity: 2,
      },
    ],
    totalInCents: 3500,
  })
})
