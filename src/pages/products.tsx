import Pagination from "~/components/pagination"
import type { NextPage } from "next"
import React, { useEffect, useState } from "react"
import CategoryFilter from "~/components/category-filter"
import MobileBottomNav from "~/components/mobile-bottom-nav"
import MobileFilterDrawer from "~/components/mobile-filter-drawer"
import MobileNavbar from "~/components/mobile-navbar"
import ProductGrid from "~/components/product-grid"
import { Product, products as fetchProducts } from "~/data/products"
import { useMediaQuery } from "~/hooks/use-media-query"

import { useDispatch, useSelector } from "react-redux";
import { toggleCategory,clearCategories } from "~/store/filter-slice";
import { RootState } from "~/store"; 



const ProductsPage: NextPage = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const selectedCategories = useSelector((state: RootState) => state.filter.selectedCategories);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [loading, setLoading] = useState(true)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)


  // Use the hook to check if we're on mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts;
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(new Set(data.map((product) => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
  
  useEffect(() => {
    let result = [...products];
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }
    setFilteredProducts(result);
  }, [selectedCategories, products]);

  const handleClearFilters = () => {
    categories.forEach((category) => {
      if (!selectedCategories.includes(category)) {
        dispatch(toggleCategory(category));  // Only add category if it's not already selected
      }
    })   
    setFilteredProducts(products);
    setCurrentPage(1);
  };
  
  const handleRemoveProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => Number(product.id) !== productId)
    setProducts(updatedProducts)

    // Update categories if all products of a category are removed
    const remainingCategories = Array.from(new Set(updatedProducts.map((product) => product.category)))
    setCategories(remainingCategories)

    // Update selected categories if a category no longer exists
    //setSelectedCategories((prev) => prev.filter((cat) => remainingCategories.includes(cat)))
  }

  const handleToggleLike = (productId: number, liked: boolean) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (Number(product.id) === productId) {
          return {
            ...product,
            likes: liked ? product.likes + 1 : Math.max(0, product.likes - 1),
            dislikes: liked ? Math.max(0, product.dislikes - 1) : product.dislikes + 1,
          }
        }
        return product
      }),
    )
  }

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <>
      {/* Mobile navbar and filter drawer */}
      {isMobile && (
        <>
          <MobileNavbar title="Product Showcase" onFilterClick={() => setIsFilterDrawerOpen(true)} />

          <MobileFilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)}>
            <CategoryFilter
              categories={categories}
              isMobile={true}
            />
          </MobileFilterDrawer>

          <MobileBottomNav />
        </>
      )}

      <main
        className={`container mx-auto px-4 py-6 sm:py-8 bg-gray-50 dark:bg-background min-h-screen ${isMobile ? "pt-20 pb-20" : ""}`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Title only visible on desktop */}
          {!isMobile && (
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground gradient-text">Product Showcase</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our collection of products, filter by category, and interact with the items you like.
              </p>
            </div>
          )}

          {/* Category filter only visible on desktop */}
          {!isMobile && (
            <CategoryFilter
              categories={categories}
            />
          
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <>
                  <ProductGrid
                    products={currentProducts}
                    onRemove={handleRemoveProduct}
                    onToggleLike={handleToggleLike}
                  />

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                </>
              ) : (
                <div className="bg-white dark:bg-card rounded-xl shadow-md p-6 sm:p-10 text-center border border-border">
                  <p className="text-lg text-muted-foreground mb-4">No products found. Try adjusting your filters.</p>
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 rounded-lg text-sm font-medium gradient-bg text-white shadow-md transition-all duration-200"
                  >
                    Clear Filters1
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )

}

export default ProductsPage
