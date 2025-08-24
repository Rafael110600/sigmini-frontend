import { Link, Outlet } from 'react-router-dom'
import './styles.css'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>SiGMini</h1>
        <nav>
          <Link to="/">Productos</Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <small>SiGMini • Frontend</small>
      </footer>
    </div>
  )
}
