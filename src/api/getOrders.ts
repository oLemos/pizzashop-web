import { api } from '@/lib/axios'

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: Date | string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const queryParams = {
    params: {
      pageIndex: 0,
    },
  }

  const response = await api.get<GetOrdersResponse>('/orders', queryParams)

  console.log(response.data)

  const formattedOrders = response.data.orders.map((order) => {
    return {
      ...order,
      createdAt: order.createdAt ?? new Date(),
    }
  })

  return {
    orders: formattedOrders,
    meta: response.data.meta,
  }
}
