import { Route, Routes } from 'react-router-dom';
import AddRecipeForm from 'components/AddRecipeForm/AddRecipeForm';
import Layout from 'components/Layout/Layout';
import HomePage from 'pages/HomePage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/new-recipe" element={<AddRecipeForm />} />
    </Route>
  </Routes>
);

export default App;
