import HomePage from './pages/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import RoutesComponent from './routes/Routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme } from 'src/theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import './App.css';

const theme = createTheme();

function App() {
  const user = null;
  const logo = 'assets/logo/blood_logo.png';
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <div className="App">
          {user ? (
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blood Donor Market
              </a>
            </header>
          ) : (
            <RoutesComponent />
          )}
        </div>
        <ToastContainer />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
