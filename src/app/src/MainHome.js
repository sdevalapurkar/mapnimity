import React, { useState, useEffect } from 'react';
import axios from 'axios';

// using this npm module for displaying results from Google Places API in dropdown
import PlacesAutocomplete from 'react-places-autocomplete';

import './css/MainHome.css'

require('dotenv').config();

function MainHome() {
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addressList, setAddressList] = useState([]);

  const handleChange = (address) => {
    setAddress(address);
    setErrorMessage("");
  };

  const handleSelect = (address) => {
    handleChange(address);
    handleTextFieldChange(address);
  };

  const handleTextFieldChange = (address) => {
    document.getElementById('searchInput').value = address;
  }

  const handleSubmit = (event) => {
    const { address, addressList } = this.state;

    event.preventDefault();

    if (!address) {
      return;
    }

    if (!addressList.includes(address)) {
      const currAddList = addressList;
      currAddList.push(address);
      setAddressList(addressList);
    } else {
      setErrorMessage("Address already added");
    }

    setAddress("");
    handleTextFieldChange("");
  }

  const handleAddressDelete = (address) => {
    const addressDeleteIndex = addressList.indexOf(address);

    setAddressList(addressList.splice(addressDeleteIndex, 1));
  }

  const handleAddressLookup = async (event) => {
    event.preventDefault();

    const fetchURL = `${process.env.REACT_APP_PORT}/api/locations`;

    try {
      const response = await axios.post(fetchURL, { "locations": addressList });

      if (response.status === 200) {
        console.log("Success");
      } else{
        console.log("Failure");
      }
    } catch (err) {
      alert('Error submitting addresses');
    }
  };

  return (
    <div id="MainHomeContainer">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        className='autocomplete'
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="addAddressWrapper">
            <div className='titleBar'>
              <h2>Add an address/Look up a User</h2>
            </div>
            <br/>
            <div className='searchBar'>
              <div className='searchInput'>
                <input 
                  aria-label = "Recipient's username"
                  aria-describedby = "basic-addon2"
                  {...getInputProps({
                    placeholder: '81 St Mary St, Toronto, ON, Canada',
                    className: 'location-search-input form-control',
                    id: 'searchInput',
                    type: "text"
                  })}
                />
              </div>
              <div className='homeSearchButton'>
                <button
                  disabled={!address}
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={(event) => handleSubmit(event)}
                >
                  +
                </button> 
              </div>
              <br/>
              <div className='displayMessage'>
                {errorMessage}
              </div>
            </div>
            <br/>
            <div className='suggestions'>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                return (
                  <div
                    onClick={() => handleSelect(suggestion.description)}
                    onMouseOver={() => handleTextFieldChange(suggestion.description)} 
                    className='suggestion' {...getSuggestionItemProps(suggestion)}
                  >
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
            <CurrentAddressList
              deleteAddress={(addressToDelete) => handleAddressDelete(addressToDelete)}
              addressList={addressList}
            />
          </div>
        )}
      </PlacesAutocomplete>              
      <div id="letsMeetDiv">
        <button
          disabled={(addressList.length <= 1)}
          onClick={(event) => handleAddressLookup(event)}
          class="btn btn-success btn-lg letsMeetButton"
        >
          Let's Meet!
        </button>
      </div>
    </div>
  );
}

function CurrentAddressList(props) {
  if (props.addressList.length > 0) {
    return props.addressList.map(address => {
      return (
        <div id="addressList">
          <div className='addressPoint'>{address}</div>
          <div
            className="deleteAddress"
          >
            <button onClick={props.deleteAddress(address)} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      )
    })
  } else {
    return(
      <div />
    )
  }
}

export default MainHome;
