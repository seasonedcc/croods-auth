import React from 'react'
import ReactDOM from 'react-dom'

import Providers from './Providers'
import './index.css'
import App from './App'

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root'),
)
