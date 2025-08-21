'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ShadcnDialog } from '@/components/ui';
import { ProductForm } from './components/ProductForm'
import { UploadCSV } from './components/UploadCSV'
import { columns } from './columns'

export default function StockPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [products, setProducts] = useState([])

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsDrawerOpen(true)
  }

  const handleCreate = () => {
    setEditingProduct(null)
    setIsDrawerOpen(true)
  }

  const handleSave = (product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p._id === product._id ? product : p))
    } else {
      // Add new product
      setProducts([...products, product])
    }
    setIsDrawerOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="space-x-2">
          <Button onClick={handleCreate}>Add Product</Button>
          <UploadCSV onUpload={setProducts} />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={(id) => setProducts(products.filter(p => p._id !== id))}
      />

<ShadcnDialog
  open={isDrawerOpen}
  onOpenChange={(open) => setIsDrawerOpen(open)}
>
  <ProductForm
    product={editingProduct}
    onSave={handleSave}
    onCancel={() => setIsDrawerOpen(false)}
  />
</ShadcnDialog>
    </div>
  )
}
