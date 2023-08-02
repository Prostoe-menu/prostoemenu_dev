import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

const RecipeGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  // const currentStage = useSelector((state) => state.form.currentFormStage);
  useEffect(() => {
    // Replace this URL with the actual API endpoint or data source URL
    fetch('http://109.172.82.25/api/recipes')
      .then((response) => response.json())
      .then((data) => setGalleryData(data.results))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <section>
      {galleryData.map((recipe) => (
        <div className="gallery-item" key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <img src={recipe.photos[0]?.photo} alt={recipe.name} />
        </div>
      ))}
    </section>
  );
};
export default RecipeGallery;
