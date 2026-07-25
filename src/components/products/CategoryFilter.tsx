import { Button } from "../ui/button"
import { useCategories } from "@/hooks/useProducts"

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  const { data: categories, isLoading } = useCategories()

  if (isLoading) return null

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect("all")}
        className="capitalize"
      >
        All
      </Button>

      {categories?.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(category)}
          className="capitalize"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

export default CategoryFilter
