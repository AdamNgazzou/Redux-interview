import type { DefaultSeoProps } from "next-seo"

const SEOConfig: DefaultSeoProps = {
  titleTemplate: "%s | Product Showcase",
  defaultTitle: "Product Showcase - Browse Our Collection",
  description:
    "Browse our collection of high-quality products across various categories. Filter, like, and interact with items you love.",
  canonical: process.env.NEXT_PUBLIC_SITE_URL,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Product Showcase",
    title: "Product Showcase - Browse Our Collection",
    description:
      "Browse our collection of high-quality products across various categories. Filter, like, and interact with items you love.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Product Showcase",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@yourhandle",
    site: "@yoursite",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "products, showcase, electronics, fashion, home, wellness, shopping",
    },
    {
      name: "author",
      content: "Your Company Name",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
}

export default SEOConfig
