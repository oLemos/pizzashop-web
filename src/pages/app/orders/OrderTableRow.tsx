import { ArrowRight, Search, X } from 'lucide-react'

import { OrderDetails } from '@/components/OrderDetails'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

export const OrderTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="xs" variant="outline">
              <Search className="h-3 w-3" />
              <span className="sr-only">Order details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        423ds-fsd423fsd
      </TableCell>

      <TableCell className="text-muted-foreground">15 minutes ago</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pending</span>
        </div>
      </TableCell>

      <TableCell className="font-medium">Gabriel Lemos Junqueira</TableCell>

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
  )
}
