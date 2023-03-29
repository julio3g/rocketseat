import { QueryClientProvider } from '@tanstack/react-query/build/lib/QueryClientProvider'
import { queryClient } from './lib/reactQuery'
import { Routes } from './Routes'
import './styles/global.css'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
