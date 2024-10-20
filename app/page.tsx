"use client";
import Booking from "@/components/Booking/Booking";
import Map from "@/components/Map/Map";
import {
  DirectionDataContext,
  DistanceDurationContext,
  FromAddCoordsContext,
  PayingAmountContext,
  ToAddCoordsContext,
  UserLocationContext,
} from "@/context/Context";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [selectedFromCoordinates, setSelectedFromCoordinates] = useState<any>(
    {}
  );
  const [selectedToCoordinates, setSelectedToCoordinates] = useState<any>({});
  const [directionCoordinates, setDirectionCoordinates] = useState<any[]>([]);
  const [distanceDuration, setDistanceDuration] = useState<any>({});
  const [payingAmount, setPayingAmount] = useState<number>(0);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <FromAddCoordsContext.Provider
        value={{ selectedFromCoordinates, setSelectedFromCoordinates }}
      >
        <ToAddCoordsContext.Provider
          value={{ selectedToCoordinates, setSelectedToCoordinates }}
        >
          <DirectionDataContext.Provider
            value={{ directionCoordinates, setDirectionCoordinates }}
          >
            <DistanceDurationContext.Provider
              value={{ distanceDuration, setDistanceDuration }}
            >
              <PayingAmountContext.Provider
                value={{ payingAmount, setPayingAmount }}
              >
                <AnimatePresence>

                <Navbar/>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div>
                      <Booking />
                    </div>
                    <div className="col-span-2 order-first md:order-last">
                      <Map />
                    </div>
                  </div>
                </div>
                </AnimatePresence>
              </PayingAmountContext.Provider>
            </DistanceDurationContext.Provider>
          </DirectionDataContext.Provider>
        </ToAddCoordsContext.Provider>
      </FromAddCoordsContext.Provider>
    </UserLocationContext.Provider>
  );
}
