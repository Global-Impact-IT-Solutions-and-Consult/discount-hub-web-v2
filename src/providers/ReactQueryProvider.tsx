import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

const ReactQueryProvider = ({ Component, pageProps }) => {
    const [queryClient] = useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
              },
            },
          }),
      )
  return (
    <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
  )
}

export default ReactQueryProvider