import { Route, Routes } from 'react-router-dom';
import AddRecipeForm from 'components/AddRecipeForm/AddRecipeForm';
import Layout from 'components/Layout/Layout';
import HomePage from 'pages/HomePage';
import RecipePage from 'pages/RecipePage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/new-recipe" element={<AddRecipeForm />} />
      <Route path="recipe/:id" element={<RecipePage />} />
    </Route>
  </Routes>
);

export default App;
