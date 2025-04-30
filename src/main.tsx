import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { routeTree } from './routeTree.gen'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/authContext';

const router = createRouter({ routeTree })
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
// const queryClient = new QueryClient()

 export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    <Toaster richColors expand={false} position="top-right"/>
    </ApolloProvider>
    </AuthProvider>
  </StrictMode>,
)
