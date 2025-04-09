import './App.css';
import InventorySystemPrototype from './components/InventorySystemPrototype';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProtectedRoute loginComponent={<Login />}>
          <InventorySystemPrototype />
        </ProtectedRoute>
      </AuthProvider>
    </div>
  );
}

export default App;