import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <html lang="en" className="h-full">
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <App />
            </ThemeProvider>
        </html>
    </React.StrictMode>,
)
