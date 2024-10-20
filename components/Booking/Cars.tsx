import { carsList } from "@/constants";
import { DistanceDurationContext, PayingAmountContext } from "@/context/Context";
import Image from "next/image";
import { Router } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Cars = () => {
  const [price, setPrice] = useState<number>(0);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const { distanceDuration } = useContext(DistanceDurationContext);
  const { setPayingAmount } = useContext(PayingAmountContext);

  useEffect(() => {
    if (distanceDuration && distanceDuration.distance > 0) {
      console.log(distanceDuration);
      setPrice(distanceDuration.distance / 70);
    }
  }, [distanceDuration]);


  const widthOfCar = window.screen.width > 768 ? 100:50;

  return (
    <div>
      <h1 className="text-md mt-3">Pick Your Car..</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-2">
        {carsList.map((item) => (
          <div
            key={item.id}
            className={`border flex flex-col rounded-2xl gap-2 py-2 hover:bg-gray-50 px-2 cursor-pointer ${
              selectedCar === item.id
                ? "bg-green-50 border border-green-300"
                : ""
            }`}
            onClick={() => {
              setSelectedCar(item.id);
              setPayingAmount(price * item.charges);
            }}
          >
            <Image
              src={item.image}
              alt={`image of ${item.name}`}
              width={widthOfCar}
              height={50}
              className="md:w-full"
            />
            <div className="flex justify-between md:p-2 flex-row md:flex-col">
              <p className="text-xs text-gray-500 font-semibold">{item.name}</p>
              {price > 0 && (
                <p className="float-right text-green-700  text-sm font-semibold">
                  {(price * item.charges).toFixed(0)} ₹
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
