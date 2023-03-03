import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19426296-0adceb4884beb75ab0f5599b5';

export async function fetchImages({ query, page }) {
  const response = await fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(
    new Error(`No results containing ${query} were found.`)
  );
}

fetchImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};


// if (!response.ok) {
//   throw new Error(`Failed to fetch images for query "${query}" (HTTP ${response.status})`);
// }
// return response.json();