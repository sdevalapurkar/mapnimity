import React from 'react';
import axios from 'axios';
// using this npm module for displaying results from Google Places API in dropdown
import PlacesAutocomplete from 'react-places-autocomplete';

import './css/MainHome.css'

require('dotenv').config();

class MainHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            'address' : "",
            'errorMessage' : "", 
            'addressList' : []
        }
    }

    handleChange = address => {
        this.setState({ address : address, errorMessage : "" });
    };

    handleSelect = address => {
        this.handleChange(address);
        this.handleTextFieldChange(address);
    }

    handleTextFieldChange = address => {
        document.getElementById('searchInput').value = address
    }

    handleSubmit = (event) => {
        const { address, addressList } = this.state;
        event.preventDefault();

        if(address){
            if(!addressList.includes(address)){
                let currAddList = addressList;
                currAddList.push(this.state.address);

                this.setState({addressList : currAddList}, () => {
                this.setState({address : ""});
                this.handleTextFieldChange("");
            });
            }else{
                this.setState({message : "Address already added", address : ""});
                this.handleTextFieldChange("");
            } 
        }
    }

    handleAddressDelete = (address) => {

        let currAddList = this.state.addressList;

        let addressDeleteIndex = currAddList.indexOf(address);

        currAddList.splice(addressDeleteIndex, 1);

        this.setState({addressList : currAddList});
    }

    handleAddressLookup = async (event) => {
        event.preventDefault();

        const fetchURL = `${process.env.REACT_APP_PORT}/api/locations`;

        try{
            const response = await axios.post(fetchURL, { "locations": this.state.addressList });

            if(response.status === 200){
                console.log("Success");   
            } else{
                console.log("Failure");
            }
        }catch(err){
            alert('Error submitting addresses');
        }
    }

    render(){
        return(
            <div id="MainHomeContainer">
                <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
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
                                    })} />
                                </div>
                                <div className='homeSearchButton'>
                                    <button disabled={(this.state.address === "") ? true : false} className="btn btn-primary btn-lg" type="button" onClick={(event) => this.handleSubmit(event)}>+</button> 
                                </div>
                                <br/>
                                <div className='displayMessage'>
                                    {this.state.message}
                                </div>
                            </div>
                            <br/>
                            <div className='suggestions'>
                            {loading ? <div>...loading </div> : null}

                            {suggestions.map((suggestion) => {
                                return(
                                    <div onClick={() => this.handleSelect(suggestion.description)}
                                    onMouseOver={() => this.handleTextFieldChange(suggestion.description)} 
                                    className='suggestion' {...getSuggestionItemProps(suggestion)}>
                                        {suggestion.description}
                                    </div>
                                )
                            })}
                            </div>

                            <CurrentAddressList deleteAddress={(addressToDelete) => this.handleAddressDelete.bind(this, addressToDelete)}addressList={this.state.addressList}/>
                        </div>
                    )}

                    </PlacesAutocomplete>
                    
                    <div id="letsMeetDiv">
                        <button disabled={(this.state.addressList.length <= 1) ? true: false} onClick={(event) => this.handleAddressLookup(event)} class="btn btn-success btn-lg letsMeetButton">Let's Meet!</button>
                    </div>
            </div>
        );
    }

}


function CurrentAddressList(props){
    if(props.addressList.length > 0){
        return props.addressList.map(address => {
            return(
                <div id="addressList">
                    <div className='addressPoint'>{address}</div>
                    <div className="deleteAddress"><button onClick={props.deleteAddress(address)} className="btn btn-danger">Delete</button></div>
                </div>
            )
        })
    } else{
        return(
            <div></div>
        )
    }
}

export default MainHome;
