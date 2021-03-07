import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=20568475-e49370300f5da7d7d0431a4b9&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  }, [term]);

  return (
    <div className='container mx-auto'>
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className='text-5xl text-center mx-auto mt-32'>No Images Found</h1>}
      {isLoading ? <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1> : <div className='grid grid-cols-3 gap-4'>
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;
