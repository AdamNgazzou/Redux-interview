# React Interview

1. Display Products in Responsive Cards
   Display the list of products in cards with the following features:

   - The product title should be in bold.
   - Show the category of the product.
   - Display a gauge similar to YouTube's indicating the popularity ratio (likes/dislikes).
   - The cards should be arranged side by side and be responsive.

2. Add a button to each card that enables users to remove the product card.
3. Incorporate a toggle button in each card that allows users to switch between liking and disliking a product.
4. Implement a category filter (multi-select) assuming that categories are not known beforehand. Fetch the categories dynamically from the products. If all products of a category are removed, that category should be excluded from the filter.
5. Develop a pagination system with the following features:
   - Previous/Next buttons for navigation.
   - Allow users to select the number of items shown per page (4, 8, or 12).

Feel free to take initiatives to create a visually appealing interface. You can earn extra points for:

- Paying meticulous attention to details.
- Make SEO optimizations.
- Implementing Redux effectively.

!!! WARNING Please be aware that removing the asynchronous behavior in `src/data/products.ts` will result in the test being invalidated.

!!! DANGER PROJECT MUST BE DONE IN NEXT.JS WITH TYPESCRIPT, AND TAILWIND AS THE STYLING FRAMEWORK
