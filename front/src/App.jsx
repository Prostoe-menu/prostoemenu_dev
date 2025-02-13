import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import HomePage from 'pages/HomePage';
import Loader from 'ui/Loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/new-recipe',
        async lazy() {
          const { AddRecipePage } = await import('pages/AddRecipePage');
          return { Component: AddRecipePage };
        },
      },
      {
        path: '/recipe/:id',
        async lazy() {
          const { RecipePage } = await import('pages/RecipePage');
          return { Component: RecipePage };
        },
      },
      {
        path: '/register',
        async lazy() {
          const { RegisterPage } = await import('pages/RegisterPage');
          return { Component: RegisterPage };
        },
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => (
  <RouterProvider router={router} fallbackElement={<Loader />} />
);

export default App;
