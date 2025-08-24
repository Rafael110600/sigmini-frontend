import { useEffect, useMemo, useState } from 'react'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import { listProducts, createProduct, updateProduct, deleteProduct, type Product, type ProductUpdate } from '../services/products'

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([])
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    if (!q) return items
    return items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()))
  }, [q, items])

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const data = await listProducts()
      setItems(data)
    } catch (e: any) {
      setError('No se pudo cargar productos: ' + (e?.message || 'error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onCreate = async (payload: Omit<Product, 'id'>) => {
    await createProduct(payload)
    await load()
  }

  const onDelete = async (id: number) => {
    await deleteProduct(id)
    await load()
  }

  const onSaveEdit = async () => {
    if (!editing) return
    const payload: ProductUpdate = { name: editing.name, category: editing.category, price: editing.price, stock: editing.stock }
    await updateProduct(editing.id, payload)
    setEditing(null)
    await load()
  }

  return (
    <div className="grid">
      <div>
        <ProductForm onCreate={onCreate} />
      </div>
      <div>
        <div className="card" style={{marginBottom:16}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <input placeholder="Buscar por nombre..." value={q} onChange={e=>setQ(e.target.value)} />
            <button onClick={load} disabled={loading}>Recargar</button>
            {error && <span style={{color:'#ff8a8a'}}>{error}</span>}
          </div>
        </div>
        <ProductTable items={filtered} onEdit={setEditing} onDelete={onDelete} />
        {editing && (
          <div className="card" style={{marginTop:16}}>
            <h3>Editar producto</h3>
            <div className="grid">
              <label>Nombre
                <input value={editing.name} onChange={e=>setEditing({...editing, name: e.target.value})} />
              </label>
              <label>Categoría
                <input value={editing.category ?? ''} onChange={e=>setEditing({...editing, category: e.target.value})} />
              </label>
              <label>Precio
                <input type="number" step="0.01" value={editing.price ?? 0} onChange={e=>setEditing({...editing, price: parseFloat(e.target.value)})} />
              </label>
              <label>Stock
                <input type="number" value={editing.stock ?? 0} onChange={e=>setEditing({...editing, stock: parseInt(e.target.value || '0')})} />
              </label>
            </div>
            <div style={{marginTop:12, display:'flex', gap:8}}>
              <button onClick={onSaveEdit}>Guardar</button>
              <button onClick={()=>setEditing(null)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
