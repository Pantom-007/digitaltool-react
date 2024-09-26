import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './css/style.css';
import './css/NotoSansJP.css';
import 'flatpickr/dist/flatpickr.min.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <Suspense>
  <Provider store={store}>

  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </Provider>
  </Suspense>
);
