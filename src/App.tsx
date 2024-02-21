import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { FormSearchScreen } from '@/screen'
import './styles/styles.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FormSearchScreen />
    </QueryClientProvider>
  )
}

export default App
