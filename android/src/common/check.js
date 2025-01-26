const fetchCategoriesWithProducts = async () => {
    const SPACE_ID = 'hn7gf8i5a9fi'; // Your Contentful Space ID
const ACCESS_TOKEN = 'YRJjo0bUtuMfBntHKDJNwg4pMQHAqgU71KzF1FDPiQY'; // Your Contentful Access Token
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;
    try {
      const response = await fetch(
        `${BASE_URL}/entries?content_type=category&access_token=${ACCESS_TOKEN}`
      );
      const data = await response.json();
  
      console.log('API Response:', data); // Log API response
      
    } catch (error) {
      console.error('Error fetching data from Contentful:', error);
    }
  };