import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './providers/authProvider/AuthProvider';
import GlobalLoading from './components/ui/loading/GlobalLoading';

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalLoading />
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
