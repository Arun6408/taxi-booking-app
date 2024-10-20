import { paymentMethods } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

const PaymentMethods = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState<number | null>(
    null
  );
  return (
    <div className="py-2">
      <h1 className="text-md">Choose your payment: </h1>
      <div className="flex justify-evenly py-2">
        {paymentMethods.map((item) => (
          <div
            key={item.id}
            onClick={()=>setActivePaymentMethod(item.id)}
            className={`border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50 hover:scale-110 cursor-pointer transition-all ${activePaymentMethod === item.id ? 'bg-green-50 border-green-300' : ''}`}
          >
            <Image src={item.image} alt={item.name} width={35} height={15} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
