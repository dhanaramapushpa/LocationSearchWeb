import logo from './logo.svg';
import './App.css';
import Search from './Component/Search/search';
import axios from "axios";

function App() {
  const LOCATION_SEARCH_URL = 'https://location-search-backend.herokuapp.com/elastic';
  const options = {
    method: 'DELETE',
    url: LOCATION_SEARCH_URL+"/deleteAll"
  };
  axios.request(options).then(function (response) {
    
  }).catch(function (error) {
      console.error(error);
  });
  return (
    <div className="App">
      <header className="App-header">
      <Search/>
      </header>
    </div>
  );
}

export default App;
