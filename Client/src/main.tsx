import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SidebarProvider } from './Components/components/ui/sidebar.tsx'
import { AuthProvider } from './Context/index.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>
)
