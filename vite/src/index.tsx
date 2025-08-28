import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import App from './App';
import { store } from './store';
import { ConfigProvider } from './contexts/ConfigContext';
import './assets/scss/style.scss';
// Adicione outras importações de fontes ou estilos se necessário, como as que você tinha

// ==============================|| REACT DOM RENDER ||============================== //

const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
   <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>
);