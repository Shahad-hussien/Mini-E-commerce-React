import { ShoppingCart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useCartStore } from "@/store/cartStore"

const Header = () => {
  const location = useLocation()
  const totalItems = useCartStore((state) => state.totalItems)

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          MyShop
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? "text-primary" : "text-muted-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/cart">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0 text-xs">
                {totalItems()}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
