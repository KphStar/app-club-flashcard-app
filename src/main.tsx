import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'primereact/resources/themes/lara-dark-purple/theme.css';        
import './index.css';
import 'bootstrap-grid-only/bootstrap.css';
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                        
import 'primeflex/primeflex.css';  




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
