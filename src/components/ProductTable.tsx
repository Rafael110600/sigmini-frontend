import type { Product } from '../services/products'

type Props = {
  items: Product[]
  onEdit: (p: Product) => void
  onDelete: (id: number) => void
}

export default function ProductTable({ items, onEdit, onDelete }: Props) {
  return (
    <div className="card">
      <h3>Listado de productos</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>SKU</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td className="actions">
                <button onClick={()=>onEdit(p)}>Editar</button>
                <button onClick={()=>onDelete(p.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
