import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import './index.less'
import App from './App'
import { Provider } from 'react-redux'
import store from '@/store'

import.meta.env.MODE === 'development' && (localStorage.token = 'ec0f8adef88db5fdb3dd17fb0cd450d4')

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
