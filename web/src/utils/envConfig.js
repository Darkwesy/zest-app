const environment = import.meta.env.VITE_ENVIRONMENT;
let apiURL;

if (environment === 'LOCALHOST') {
  apiURL = 'http://localhost:3333';
} else if (environment === 'EXPOSED') {
  apiURL = import.meta.env.VITE_API_URL;
} else {
  apiURL = 'http://localhost:3333';
}

export default apiURL;
