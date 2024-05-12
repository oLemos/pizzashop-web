import { ArrowRight, Search, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Orders = () => {
  return (
    <>
      <Helmet title="Orders" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

        <div className="5 space-y-2">
          <form action="" className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filters:</span>
            <Input placeholder="Costumer name" className="h-8 w-[320px]" />
          </form>

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
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Button size="xs" variant="outline">
                        <Search className="h-3 w-3" />
                        <span className="sr-only">Order details</span>
                      </Button>
                    </TableCell>

                    <TableCell className="font-mono text-xs font-medium">
                      423ds-fsd423fsd
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      15 minutes ago
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                        <span className="font-medium text-muted-foreground">
                          Pending
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">
                      Gabriel Lemos Junqueira
                    </TableCell>

                    <TableCell className="font-medium">$ 149,90</TableCell>

                    <TableCell>
                      <Button variant="outline" size="xs">
                        <ArrowRight className="mr-2 h-3 w-3" />
                        <span>Approve</span>
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button variant="ghost" size="xs">
                        <X className="mr-2 h-3 w-3" />
                        <span>Cancel</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
