import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MonthCanceledOrdersAmountCard = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Orders canceled (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">32</span>

        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500">-2%</span> {''}
          compared to last month
        </p>
      </CardContent>
    </Card>
  )
}
