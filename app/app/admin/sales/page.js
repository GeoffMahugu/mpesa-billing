'use client'
import { Card, DateRangePicker, Button } from '@/components/ui'
import { RevenueChart, TopProducts } from './components'
import { exportSalesData } from './actions'

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sales Dashboard</h1>
      
      <div className="flex justify-between items-center">
        <DateRangePicker 
          onSelect={(range) => console.log(range)}
        />
        <Button onClick={exportSalesData}>
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <RevenueChart />
        </Card>
        <Card>
          <TopProducts />
        </Card>
      </div>
    </div>
  )
}
