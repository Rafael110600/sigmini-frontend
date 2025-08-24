import { useState } from 'react'
import type { ProductCreate } from '../services/products'

type Props = { onCreate: (p: ProductCreate) => Promise<void> }

export default function ProductForm({ onCreate }: Props) {
  const [sku, setSku] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('general')
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await onCreate({ sku, name, category, price, stock })
      setSku(''); setName(''); setCategory('general'); setPrice(0); setStock(0)
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Error al crear producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>Nuevo producto</h3>
      <div className="grid">
        <label>SKU
          <input value={sku} onChange={e=>setSku(e.target.value)} required />
        </label>
        <label>Nombre
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Categoría
          <input value={category} onChange={e=>setCategory(e.target.value)} />
        </label>
        <label>Precio
          <input type="number" step="0.01" value={price} onChange={e=>setPrice(parseFloat(e.target.value))} />
        </label>
        <label>Stock
          <input type="number" value={stock} onChange={e=>setStock(parseInt(e.target.value || '0'))} />
        </label>
      </div>
      <div style={{marginTop:12, display:'flex', gap:8}}>
        <button type="submit" disabled={loading}>Crear</button>
        {error && <span style={{color:'#ff8a8a'}}>{error}</span>}
      </div>
    </form>
  )
}
