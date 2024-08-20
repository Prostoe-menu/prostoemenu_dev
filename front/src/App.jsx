import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import HomePage from 'pages/HomePage';
import Loader from 'ui/Loader';

const AddRecipePage = lazy(() => import('pages/AddRecipePage'));
const RecipePage = lazy(() => import('pages/RecipePage'));

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path="/new-recipe"
        element={
          <Suspense fallback={<Loader />}>
            <AddRecipePage />
          </Suspense>
        }
      />
      <Route
        path="/recipe/:id"
        element={
          <Suspense fallback={<Loader />}>
            <RecipePage />
          </Suspense>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
