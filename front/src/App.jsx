import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import AddRecipePage from 'pages/AddRecipePage';
import HomePage from 'pages/HomePage';
import RecipePage from 'pages/RecipePage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/new-recipe" element={<AddRecipePage />} />
      <Route path="recipe/:id" element={<RecipePage />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
