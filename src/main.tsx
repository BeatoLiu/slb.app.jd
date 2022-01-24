import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import './assets/style/index.less'
import App from './App'
import { Provider } from 'react-redux'
import store from '@/store'

import.meta.env.MODE === 'development' && (localStorage.token = 'dc5fe5ceee1dc50f698098a923e6ffc9')

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
