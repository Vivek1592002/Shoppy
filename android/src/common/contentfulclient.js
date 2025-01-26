
  // Define Space ID and Access Token
  const SPACE_ID = 'hn7gf8i5a9fi';
  const ACCESS_TOKEN = 'YRJjo0bUtuMfBntHKDJNwg4pMQHAqgU71KzF1FDPiQY';

// Base URL for Contentful's Delivery API
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

// Function to fetch categories and their product using REST API
export const fetchCategoriesWithProducts = async () => {
  try {
    // Fetch entries of type 'category'
    const response = await fetch(
      `${BASE_URL}/entries?content_type=category&access_token=${ACCESS_TOKEN}`
    );

    // Parse the response JSON
    const data = await response.json();

    // Transform response data into a readable format
    const categories = data;

    return categories;
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return [];
  }
};
