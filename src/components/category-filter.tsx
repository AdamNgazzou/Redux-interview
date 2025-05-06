"use client"
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory, clearCategories } from "~/store/filter-slice";
import { RootState } from "~/store"; // Assuming the store is set up properly


interface CategoryFilterProps {
  categories: string[];
  isMobile?: boolean;
}


export default function CategoryFilter({
  categories,
  isMobile = false,
}: CategoryFilterProps) {
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state: RootState) => state.filter.selectedCategories);

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategory(category)); // now i am using redux 
    
  };

  const handleSelectAll = () => {
    if (selectedCategories.length !== 0) {
      dispatch(clearCategories());
    } else {
      // Add all categories to selectedCategories
      categories.forEach((category) => {
        if (!selectedCategories.includes(category)) {
          dispatch(toggleCategory(category));  // Only add category if it's not already selected
        }
      });
    }
  };
  

  // If this is rendered in the mobile drawer, adjust styling
  const containerClasses = isMobile ? "" : "mb-8 bg-white dark:bg-card rounded-xl shadow-md p-5 border border-border"

  return (
    <div className={containerClasses}>
      <h2 className="text-lg font-semibold mb-4 text-foreground">Filter by Category</h2>

      {/* Select All button */}
      <div className="mb-3">
        <button
          onClick={handleSelectAll}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedCategories.length === 0
              ? "gradient-bg text-white shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {selectedCategories.length !== 0 ? "Clear All" : "Select All"}
        </button>
      </div>

      {/* Category list - scrollable on mobile */}
      <div className={`flex flex-wrap gap-2 items-center ${isMobile ? "max-h-[200px] overflow-y-auto pb-2" : ""}`}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategories.includes(category)
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Showing {selectedCategories.length} of {categories.length} categories
        </p>
      )}
    </div>
  )
}
