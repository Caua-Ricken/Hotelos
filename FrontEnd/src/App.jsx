import { useState } from 'react'
import { Outlet, NavLink } from "react-router-dom";
import './App.css'

function App() {

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h1>HotelOS</h1>
          <span>RECEPÇÃO • v2.4</span>
        </div>

        <nav className="menu">
          <p className="menu-title">PRINCIPAL</p>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/checkin"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Check-in
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Check-out
          </NavLink>

          <NavLink
            to="/quartos"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Quartos
          </NavLink>

          <p className="menu-title">GESTÃO</p>

          <NavLink
            to="/hospedes"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Hóspedes
          </NavLink>

          <NavLink
            to="/reservas"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Reservas
          </NavLink>

          <NavLink
            to="/relatorios"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Relatórios
          </NavLink>
        </nav>

        <div className="user-card">
          <div className="avatar">CR</div>

          <div>
            <h4>Cauã Ricken</h4>
            <span>gerente</span>
          </div>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>Dashboard</h2>
            <p>Visão geral em tempo real • Turno: 07:00–15:00</p>
          </div>

          <div className="actions">
            <span className="status">● AO VIVO</span>

            <button>Novo Check-in</button>
          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default App
