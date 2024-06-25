import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approveOrder'
import { cancelOrder } from '@/api/cancelOrder'
import { deliverOrder } from '@/api/deliverOrder'
import { dispatchOrder } from '@/api/dispatchOrder'
import { GetOrdersResponse } from '@/api/getOrders'
import { OrderDetails } from '@/components/OrderDetails'
import { OrderStatus, OrderStatusType } from '@/components/OrderStatus'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: Date | string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const queryClient = useQueryClient()

  const [isDetailOpen, setIsDetailOpen] = useState(false)

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: handleCancelOrder, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: handleApproveOrder, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: handleDispatchOrder, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: handleDeliverOrder, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button size="xs" variant="outline">
              <Search className="h-3 w-3" />
              <span className="sr-only">Order details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails isOpen={isDetailOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isApprovingOrder}
            onClick={() => handleApproveOrder({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            <span>Approve</span>
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
            onClick={() => handleDispatchOrder({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            <span>Delivering</span>
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDeliveringOrder}
            onClick={() => handleDeliverOrder({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            <span>Delivered</span>
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
          onClick={() => handleCancelOrder({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          <span>Cancel</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
