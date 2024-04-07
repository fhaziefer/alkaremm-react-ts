import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext';
import Routes from './Routes/Routes';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <AuthProvider><Routes /></AuthProvider>
    </BrowserRouter>
  )
}

export default App;
