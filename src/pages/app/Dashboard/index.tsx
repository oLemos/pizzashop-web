import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from './DayOrdersAmountCard'
import { MonthOrdersAmountCard } from './MonthOrdersAmountCard'
import { MonthRevenueCard } from './MonthRevenueCard'
import { MonthCanceledOrdersAmountCard } from './MothCancelOrdersAmountCard'
import { PopularProductsChart } from './PopularProductsChart'
import { RevenueChart } from './RevenueChart'

export const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />

          <MonthOrdersAmountCard />

          <DayOrdersAmountCard />

          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />

          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
