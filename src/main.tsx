import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import './assets/style/index.less'
import App from './App'
import { Provider } from 'react-redux'
import store from '@/store'

import.meta.env.MODE === 'development' && (localStorage.token = '4ce824b998fc2fd8c089bbf611ef5d46')

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
