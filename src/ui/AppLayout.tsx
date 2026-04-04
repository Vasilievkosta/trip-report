import { Outlet, Link, useLocation } from "react-router-dom"

export function AppLayout() {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          Trip Report
        </Link>
        <p className="brand-copy">Архив фотографий некоторых наших походов.</p>
      </header>
      <main className={isHome ? "page page-home" : "page"}>
        <Outlet />
      </main>
    </div>
  )
}
