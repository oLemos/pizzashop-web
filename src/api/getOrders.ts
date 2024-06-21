import { api } from '@/lib/axios'

export interface GetOrderQuery {
  pageIndex?: number | null
}

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

export async function getOrders({ pageIndex }: GetOrderQuery) {
  const queryParams = {
    params: {
      pageIndex,
    },
  }

  const response = await api.get<GetOrdersResponse>('/orders', queryParams)

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
