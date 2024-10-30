import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import { Layout } from './layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tasks } from './pages/Tasks';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route element={<PublicRoute />}>
              <Route path="/login/" element={<Login />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/register/" element={<Register />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/*" element={<Layout><Tasks /></Layout>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};