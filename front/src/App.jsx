import { Route, Routes } from 'react-router-dom';
import AddRecipeForm from 'components/AddRecipeForm/AddRecipeForm';
import Layout from 'components/Layout/Layout';
import NotFound from 'components/NotFound/NotFound';
import HomePage from 'pages/HomePage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/new-recipe" element={<AddRecipeForm />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
