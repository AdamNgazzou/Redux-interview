"use client"

import Pagination from "~/components/pagination"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import CategoryFilter from "~/components/category-filter"
import MobileBottomNav from "~/components/mobile-bottom-nav"
import MobileFilterDrawer from "~/components/mobile-filter-drawer"
import MobileNavbar from "~/components/mobile-navbar"
import ProductGrid from "~/components/product-grid"
import { type Product, products as fetchProducts } from "~/data/products"
import { useMediaQuery } from "~/hooks/use-media-query"

import { useDispatch, useSelector } from "react-redux"
import { toggleCategory, initializeCategories } from "~/store/filter-slice"
import {
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  nextPage,
  prevPage,
  firstPage,
  lastPage,
} from "~/store/pagination-slice"

import type { RootState } from "~/store"

const ProductsPage: NextPage = () => {
  const dispatch = useDispatch()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  // Redux state selectors
  const selectedCategories = useSelector((state: RootState) => state.filter.selectedCategories)
  const initialized = useSelector((state: RootState) => state.filter.initialized)
  const { currentPage, itemsPerPage, totalPages } = useSelector((state: RootState) => state.pagination)

  // Use the hook to check if we're on mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Load products and initialize categories
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts
        setProducts(data)
        setFilteredProducts(data)

        // Update total items in pagination state
        dispatch(setTotalItems(data.length))

        const uniqueCategories = Array.from(new Set(data.map((product) => product.category)))
        setCategories(uniqueCategories)

        // Initialize all categories as selected if not already initialized
        if (!initialized && uniqueCategories.length > 0) {
          dispatch(initializeCategories(uniqueCategories))
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [dispatch, initialized])

  // Filter products when selected categories or products change
  useEffect(() => {
    let result = [...products]
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }
    setFilteredProducts(result)

    // Update total items in pagination state when filtered results change
    dispatch(setTotalItems(result.length))
  }, [selectedCategories, products, dispatch])

  const handleClearFilters = () => {
    categories.forEach((category) => {
      if (!selectedCategories.includes(category)) {
        dispatch(toggleCategory(category)) // Only add category if it's not already selected
      }
    })
    setFilteredProducts(products)
    dispatch(setCurrentPage(1))
  }

  const handleRemoveProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => Number(product.id) !== productId)
    setProducts(updatedProducts)

    // Update categories if all products of a category are removed
    const remainingCategories = Array.from(new Set(updatedProducts.map((product) => product.category)))
    setCategories(remainingCategories)

  // Remove selected categories that are no longer present
  selectedCategories.forEach((category) => {
    if (!remainingCategories.includes(category)) {
      dispatch(toggleCategory(category)) // Deselect category in Redux
    }
  })
    // Filter the products again using current selected categories
    const updatedFiltered =
      selectedCategories.length > 0
        ? updatedProducts.filter((product) => selectedCategories.includes(product.category))
        : updatedProducts

    setFilteredProducts(updatedFiltered)


    // Update total items in pagination state
    dispatch(setTotalItems(updatedFiltered.length))
  }

  const handleToggleInteraction = (
    productId: number,
    prevStatus: "liked" | "disliked" | "none",
    action: "like" | "dislike",
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (Number(product.id) === productId) {
          let likes = product.likes
          let dislikes = product.dislikes

          if (action === "like") {
            if (prevStatus === "liked") {
              likes = Math.max(0, likes - 1) // remove like
            } else if (prevStatus === "disliked") {
              dislikes = Math.max(0, dislikes - 1)
              likes += 1 // switch from dislike to like
            } else {
              likes += 1 // add like
            }
          } else if (action === "dislike") {
            if (prevStatus === "disliked") {
              dislikes = Math.max(0, dislikes - 1) // remove dislike
            } else if (prevStatus === "liked") {
              likes = Math.max(0, likes - 1)
              dislikes += 1 // switch from like to dislike
            } else {
              dislikes += 1 // add dislike
            }
          }

          return { ...product, likes, dislikes }
        }
        return product
      }),
    )
  }

  // Calculate current page products
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Calculate pagination range for display
  const startItem = filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0
  const endItem = Math.min(indexOfLastProduct, filteredProducts.length)

  return (
    <>
      {/* Mobile navbar and filter drawer */}
      {isMobile && (
        <>
          <MobileNavbar title="Product Showcase" onFilterClick={() => setIsFilterDrawerOpen(true)} />

          <MobileFilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)}>
            <CategoryFilter categories={categories} isMobile={true} />
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
            <div className="mb-6">
              <CategoryFilter categories={categories} />
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Results summary */}
              {!loading && filteredProducts.length > 0 && selectedCategories.length >0  && (
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {startItem} to {endItem} of {filteredProducts.length} products
                </div>
              )}

              {selectedCategories.length >0 ? (
                <>
                  <ProductGrid
                    products={currentProducts}
                    onRemove={handleRemoveProduct}
                    handleToggleInteraction={handleToggleInteraction}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => dispatch(setCurrentPage(page))}
                    onItemsPerPageChange={(count) => dispatch(setItemsPerPage(count))}
                    onNextPage={() => dispatch(nextPage())}
                    onPrevPage={() => dispatch(prevPage())}
                    onFirstPage={() => dispatch(firstPage())}
                    onLastPage={() => dispatch(lastPage())}
                  />
                </>
              ) : (
                <div className="bg-white dark:bg-card rounded-xl shadow-md p-6 sm:p-10 text-center border border-border">
                  {filteredProducts.length > 0 ? (
                    <>
                      <p className="text-lg text-muted-foreground mb-4">No products found. Try adjusting your filters.</p>
                      <button
                        onClick={handleClearFilters}
                        className="px-4 py-2 rounded-lg text-sm font-medium gradient-bg text-white shadow-md transition-all duration-200"
                      >
                        Select all Filters
                      </button></>) : ( 
                        <p className="text-lg text-muted-foreground mb-4">No products found.</p>
                      )}
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
