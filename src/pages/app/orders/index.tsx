import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/getOrders'
import { Pagination } from '@/components/Pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './OrderTableFilters'
import { OrderTableRow } from './OrderTableRow'
import { OrderTableSkeleton } from './OrderTableSkeleton'

export const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status')
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')

  const pageIndex = z.coerce
    .number()
    .transform((page) => Math.max(page - 1, 0))
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((previousState) => {
      previousState.set('page', (pageIndex + 1).toString())

      return previousState
    })
  }

  return (
    <>
      <Helmet title="Orders" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">ID</TableHead>
                  <TableHead className="w-[180px]">Created at</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Costumer</TableHead>
                  <TableHead className="w-[140px]">Order total</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoadingOrders ? (
                  <OrderTableSkeleton />
                ) : (
                  result?.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
