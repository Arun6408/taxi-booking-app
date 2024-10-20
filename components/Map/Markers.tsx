import {
  FromAddCoordsContext,
  ToAddCoordsContext,
  UserLocationContext,
} from "@/context/Context";
import React, { useContext, useEffect } from "react";
import { Marker } from "react-map-gl";

const Markers = () => {
  const { selectedFromCoordinates } = useContext(FromAddCoordsContext);
  const { selectedToCoordinates } = useContext(ToAddCoordsContext);
  const { userLocation } = useContext(UserLocationContext);

  
  return (
    <div>
        {
            userLocation?.lat && userLocation?.lng? (
              <Marker
                longitude={userLocation.lng}
                latitude={userLocation.lat}
                anchor="bottom"
              >
                <img src={"/user-pin.png"} alt="user-pin" className="w-10" />
              </Marker>
            ) : null
        }
      {!isNaN(selectedFromCoordinates.lng) ? (
        <Marker
          longitude={selectedFromCoordinates?.lng}
          latitude={selectedFromCoordinates?.lat}
          anchor="bottom"
        >
          <img src={"/pin.png"} alt="pin" className="w-10" />
        </Marker>
      ):null}
      {!isNaN(selectedToCoordinates.lng) ? (
        <Marker
          longitude={selectedToCoordinates?.lng}
          latitude={selectedToCoordinates?.lat}
          anchor="bottom"
        >
          <img src={"/pin.png"} alt="pin" className="w-10" />
        </Marker>
      ):null}
    </div>
  );
};

export default Markers;
