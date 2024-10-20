import { FromAddCoordsContext, ToAddCoordsContext } from "@/context/Context";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AutoCompleteAddress = () => {
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [fromSelected, setFromSelected] = useState<boolean>(false);  
  const [toSelected, setToSelected] = useState<boolean>(false);      

  const { setSelectedFromCoordinates } = useContext(FromAddCoordsContext);
  const { setSelectedToCoordinates } = useContext(ToAddCoordsContext);

  const getAddressList = async (query: string, setSuggestions: Function) => {
    const res = await fetch(`/api/search-address?q=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setSuggestions(data.data.suggestions);
  };

  useEffect(() => {
    if (fromAddress && !fromSelected) {  
      const delayTimer = setTimeout(() => {
        getAddressList(fromAddress, setFromSuggestions);
      }, 100);

      return () => clearTimeout(delayTimer);
    }
    setFromSelected(false);
  }, [fromAddress]);

  useEffect(() => {
    if (toAddress && !toSelected) { 
      const delayTimer = setTimeout(() => {
        getAddressList(toAddress, setToSuggestions);
      }, 500);

      return () => clearTimeout(delayTimer);
    }
    setToSelected(false);
  }, [toAddress]);
  

  const sessionToken = uuidv4();
  const getLatAndLngFromAdd = async (suggestion: any) => {
    setFromSelected(true); 
    setFromAddress(suggestion.full_address);
    setFromSuggestions([]);
    const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setSelectedFromCoordinates({
      lng: data.features[0].geometry.coordinates[0],
      lat: data.features[0].geometry.coordinates[1],
    });
  };

  const getLatAndLngToAdd = async (suggestion: any) => {
    setToSelected(true);  
    setToAddress(suggestion.full_address);
    setToSuggestions([]);
    const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setSelectedToCoordinates({
      lng: data.features[0].geometry.coordinates[0],
      lat: data.features[0].geometry.coordinates[1],
    });
  };

  return (
    <div className="px-5 mt-1 flex flex-col gap-2">
      <div>
        <label
          htmlFor="fromAddress"
          className="font-medium text-md text-gray-600"
        >
          Where From?
        </label>
        <input
          type="text"
          name="fromAddress"
          value={fromAddress}
          onClick={() => setToSuggestions([])}
          onChange={(e) => {
            setFromSelected(false);
            setFromAddress(e.target.value);
          }}
          className="p-2 text-sm shadow-md rounded-md border outline-none border-gray-200 w-full focus:bg-gray-50"
        />

        {fromSuggestions.length > 0 && (
          <div className="mt-1 z-10 shadow-md rounded-lg absolute bg-white w-[80%] overflow-hidden">
            <ul>
              {fromSuggestions.map(
                (suggestion, index) =>
                  suggestion.full_address && (
                    <li
                      key={index}
                      className="p-3 py-1 cursor-pointer text-sm hover:bg-gray-100"
                      onClick={() => getLatAndLngFromAdd(suggestion)}
                    >
                      {suggestion.full_address}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="toAddress"
          className="font-medium text-md text-gray-600"
        >
          Where To?
        </label>
        <input
          type="text"
          name="toAddress"
          value={toAddress}
          onClick={() => setFromSuggestions([])}
          onChange={(e) => {
            setToSelected(false); 
            setToAddress(e.target.value);
          }}
          className="p-2 text-sm shadow-md rounded-md border outline-none border-gray-200 w-full focus:bg-gray-50"
        />

        {toSuggestions.length > 0 && (
          <div className="mt-1 z-10 shadow-md rounded-lg absolute bg-white w-[80%] overflow-hidden">
            <ul>
              {toSuggestions.map(
                (suggestion, index) =>
                  suggestion.full_address && (
                    <li
                      key={index}
                      className="p-3 cursor-pointer text-xs hover:bg-gray-100"
                      onClick={() => getLatAndLngToAdd(suggestion)}
                    >
                      {suggestion.full_address}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
