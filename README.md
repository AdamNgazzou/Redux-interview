# 🚀 Product Showcase – Take-Home Interview Project

![Product Showcase](https://i.imgur.com/YWTknba.png)

## Project Overview

This Product Showcase is a responsive web application built with Next.js and Redux that allows users to browse, filter, and interact with a collection of products. The application demonstrates modern frontend development practices, state management, responsive design, and performance optimization techniques.

The project solves the common e-commerce challenge of presenting products in an engaging, interactive way while providing intuitive filtering and navigation capabilities. It showcases how to build a performant, SEO-friendly application with a focus on user experience across all devices.

## SEO Optimization

The application implements several SEO best practices:

- **Metadata Management**: Uses `next-seo` to configure comprehensive metadata including title templates, descriptions, and Open Graph data
- **Structured Data**: Implements JSON-LD for organization information to enhance search engine understanding
- **Canonical URLs**: Sets proper canonical URLs to prevent duplicate content issues
- **Meta Tags**: Includes appropriate meta tags for viewport, description, and keywords
- **Semantic HTML**: Uses semantic HTML elements throughout the application for better accessibility and SEO
- **Mobile Optimization**: Fully responsive design ensures good mobile SEO rankings
- **Performance Optimization**: Fast loading times contribute to better SEO rankings

## Page Routing

The application uses Next.js's file-based routing system:

- `/` - Home page with a simple counter component (demonstration of basic Redux)
- `/products` - Main product showcase page with filtering and pagination
- Future routes can be easily added by creating new files in the `pages` directory

The routing structure is designed to be scalable, allowing for easy addition of new sections like product details, categories, or user accounts.

## Functionality

### Key Features

#### Redux State Management

- **Counter Slice**: Simple demonstration of Redux state management
- **Filter Slice**: Manages category filtering state
- **Like Slice**: Handles product like/dislike state with persistence
- **Pagination Slice**: Controls pagination state

#### Category Filtering

- Users can filter products by multiple categories
- Filter state is managed in Redux
- Mobile-optimized filter drawer for smaller screens
- Search functionality within categories

#### Product Interactions

- Like/Dislike functionality with visual feedback
- Popularity gauge showing the ratio of likes to dislikes
- Product removal capability

#### Pagination

- Customizable items per page
- First/last/next/previous page navigation
- Current page indicator

#### Persistence

- User preferences and interactions are persisted using Redux Persist
- Liked/disliked products state is maintained between sessions

## Mobile Version

The application features a comprehensive mobile-responsive design:

- **Mobile Navigation**: Custom mobile navbar with hamburger menu
- **Bottom Navigation**: Mobile-specific bottom navigation for key actions
- **Filter Drawer**: Slide-out drawer for filters on mobile
- **Responsive Grid**: Product grid adjusts columns based on screen size
- **Touch-Optimized**: Larger touch targets for mobile users
- **Adaptive Layout**: Content reorganization for optimal mobile viewing
- **Performance Optimized**: Lightweight for faster mobile loading

Mobile-specific components include:

- `MobileNavbar.tsx`
- `MobileBottomNav.tsx`
- `MobileFilterDrawer.tsx`

## Performance

The application is optimized for performance through:

- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Components load only when needed
- **Optimized Redux**: Efficient state management
- **Tailwind CSS**: Utility-first CSS for smaller bundle size
- **Animations**: Lightweight CSS animations for better perceived performance
- **Efficient Rendering**: Careful component design to minimize re-renders

### Lighthouse Performance Metrics

[Include Lighthouse performance metrics image here](https://i.imgur.com/Gow1fug.png)

## Technologies Used

- **Frontend Framework**: Next.js
- **State Management**: Redux Toolkit
- **Persistence**: Redux Persist
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **SEO**: Next SEO
- **Testing**: Jest, React Testing Library
- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier

## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/product-showcase.git
   cd product-showcase

   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps

   ```

3. **Start the development server bash**

   ```bash
   npm run dev

   ```

4. **Open the application in your browser**
   Navigate to http://localhost:3000 to view the app.

⚠️ If you encounter peer dependency warnings, the --legacy-peer-deps flag helps bypass them during installation.
