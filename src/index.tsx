import { Provider } from 'react-redux'
import { App } from './App'
import { store } from './store'
import * as ReactDOM from 'react-dom/client'

const container = document.getElementById('root')
if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
} else {
  console.log("Container doesn't exist")
}
