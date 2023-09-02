import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App'

import 'virtual:svg-icons-register'
import 'app/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
