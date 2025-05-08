import "../styles/globals.css"
import type { AppProps } from "next/app"
import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import store,{persistor} from "~/store"
import { DefaultSeo, OrganizationJsonLd } from "next-seo"
import SEOConfig from "~/config/seo-config"
function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <DefaultSeo {...SEOConfig} />
          <OrganizationJsonLd
            type="Corporation"
            logo={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`}
            legalName="Your Company Legal Name"
            name="Your Company"
            address={{
              streetAddress: "123 Main St",
              addressLocality: "City",
              addressRegion: "State",
              postalCode: "12345",
              addressCountry: "US",
            }}
            contactPoint={[
              {
                telephone: "+1-800-123-4567",
                contactType: "customer service",
                email: "support@yourcompany.com",
                areaServed: "US",
                availableLanguage: ["English"],
              },
            ]}
            sameAs={[
              "https://www.facebook.com/your-company",
              "https://www.instagram.com/your-company",
              "https://www.linkedin.com/company/your-company",
              "https://twitter.com/your-company",
            ]}
            url={process.env.NEXT_PUBLIC_SITE_URL || ""}
          />
        <Component {...pageProps} />
    </Provider>
  )
}

export default App

