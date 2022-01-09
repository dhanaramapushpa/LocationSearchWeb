import { Autocomplete, Box ,Chip,TextField} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import axios from "axios";


export default function Search(){
    const [value, setValue] = React.useState(null);
    const [open,setOpen] = useState(false);
    const [displayValue,setDisplayValue] = useState(2);
    const [selectedOptions,setSelectedOptions] = useState([]);
    const [cities,setCities] = useState([]); 
    const LOCATION_SEARCH_URL = 'https://location-search-backend.herokuapp.com/elastic';
    function handleChange(e) {
        if(e.length>3){
            getCity(e);
        }
        if(e){
            setOpen(true);
        } else {
            setOpen(false);
        }
      }

    function saveSelection(newValue){
        if(newValue){
            saveSearchData(newValue);
            setOpen(false);
            setValue();
        }
    }

    function saveSearchData(newValue){

      let cityData = {
        id: newValue.id,
        cityName: newValue.city,
        region: newValue.region
      }

      axios.post(LOCATION_SEARCH_URL+"/save", cityData)
    .then(response => {
      console.log(response.data);
      getSearchData();
    });

    }

    function getSearchData() {
      const options = {
        method: 'GET',
        url: LOCATION_SEARCH_URL+"/getAll"
      };
      axios.request(options).then(function (response) {
        setSelectedOptions(response.data);
        setDisplayValue(2);
      }).catch(function (error) {
        console.error(error);
    });
    }

    async function getCity(searchText) {
        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix='+searchText,
            headers: {
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              'x-rapidapi-key': '75da3bd872mshea2b4537b8ba2eep10233ajsnedc0bb76d6d8'
            }
          };
         // const res = await axios('/data')
          await axios.request(options).then(function (response) {
              console.log(response.data);
              if(response.data) {
                  setCities(response.data.data);
              }
              console.log(cities);
          }).catch(function (error) {
              console.error(error);
          });
    }

    return (
        <>
        <Autocomplete id="Search" open={open}
      onInputChange={(_,value)=>handleChange(value)}
      sx={{ width: 400 }}
      options={cities}
      getOptionLabel={(option) => option.city}
    //   filterOptions={(option)=>option.data.cityvalue}
      autoHighlight
      value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          saveSelection(newValue)
        }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          label="Search Location"
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
    <br/>
    <Box component="div" flexDirection="left">
        
      {selectedOptions.slice(0,displayValue).map((data, index) => (
          <>
                <Chip style={{'color':'black'}} key={index} label={data.cityName} > </Chip> <React.Fragment>&nbsp;</React.Fragment></>
            ))}
            {
              displayValue!==selectedOptions.length && selectedOptions.length >2 && <Chip label={selectedOptions.length-2+" more "} onClick={
                (event, newValue) => {
                  console.log("on click");
                  setDisplayValue(selectedOptions.length);
                  console.log(displayValue);
                }
              }></Chip>
            }
            
      </Box>
    
        </>
    );
}
