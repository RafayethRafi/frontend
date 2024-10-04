// lib/imageService.js

const getImage = async (endpoint) => {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const url = `${api}${endpoint}`;
  console.log(`Attempting to fetch image from: ${url}`);
  
  try {
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching image from ${url}:`, error.message);
    return null;
  }
};

export const getImages = async () => {
  const defaultImage = {
    image: null,
    altText: "Default placeholder"
  };

  try {
    const [hero, cricket, football] = await Promise.all([
      getImage('/users/main_background_image'),
      getImage('/users/cricket_background_image'),
      getImage('/users/football_background_image')
    ]);

    return {
      hero: hero || defaultImage,
      cricket: cricket || defaultImage,
      football: football || defaultImage
    };
  } catch (error) {
    console.error("Error in getImages:", error);
    return {
      hero: defaultImage,
      cricket: defaultImage,
      football: defaultImage
    };
  }
};