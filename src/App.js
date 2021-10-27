import React, { useState } from 'react';
import './App.css';
import Item from './Item';
import TopSearch from './TopSearch';
import TopCollection from './TopCollection';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [topSearch, setTopSearch] = useState([]);
  const [topCollections, setTopCollections] = useState([]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchResult(e.target.value);
    if (e.target.value.length > 2) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  const handleTopQuery = (q) => {
    setSearchQuery(q);
    fetchResult(q);
  }

  const fetchResult = (q) => {
    const url = `https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/?user=&${getFormBody({ q })}&size=6&suggestions=1&maxSuggestions=6`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setList(data.results);
        setTopSearch(data.suggestions);
        data.facets.length > 0 && setTopCollections(data.facets.collectionname);
        console.log(data);
      });
  }


  //To encode urls
  function getFormBody(params) {
    let formBody = [];

    for (let property in params) {
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); //neelesh 123 => neelesh%20123

      formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');  //user%20name=N@example.com&password=1234
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid" style={{ justifyContent: 'center' }}>
          <span className="navbar-brand" >Expert Rec</span>
          <div className="d-flex search-block" >
            <input className="form-control me-2" onChange={handleSearchChange} value={searchQuery} type="search" placeholder="Search" aria-label="Search" />
            {show && <div className="search-display">
              <div className="suggestions">
                <div className="suggestion-list-title">Top Searches</div>
                <ul className="suggestion-list">
                  {topSearch.map((top, index) => {
                    return <TopSearch top={top} key={index} handleTopQuery={handleTopQuery} />
                  })}
                </ul>
                <div className="suggestion-list-title">Top Collections</div>
                <ul className="suggestion-list">
                  {topCollections.map((top, index) => {
                    return <TopCollection top={top} key={index} handleTopQuery={handleTopQuery} />
                  })}
                </ul>
              </div>
              <div className="search-items-box">
                <h4>Popular products in {searchQuery}</h4>
                <ul className="search-items">
                  {list.map((item, index) => {
                    return <Item item={item} key={index} />
                  })}
                </ul>
                <button className="view-all-btn">View All items</button>
              </div>
            </div>}
          </div>
        </div>
      </nav>
    </div>
  );
}
