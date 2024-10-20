import React, { useContext } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import PaymentMethods from "./PaymentMethods";
import { useRouter } from "next/navigation";
import { PayingAmountContext } from "@/context/Context";
import {motion} from 'framer-motion'

const Booking = () => {
  const router: any = useRouter();
  const { payingAmount } = useContext(PayingAmountContext);

  
  return (
    <motion.div className="px-5 pt-3 rounded-lg m-5 h-[85vh] border border-gray-200 bg-gray-50 shadow-md"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5, ease: "easeInOut" }}
     exit={{ opacity: 0 }}

    >
      <h2 className="text-2xl font-semibold">Booking</h2>
      <AutoCompleteAddress />
      <Cars />
      <PaymentMethods />
      <button
        className={`w-full text-center font-bold py-1 rounded-full text-lg  transition-all ${
          payingAmount ? "bg-green-300 hover:bg-green-400" : "bg-gray-300"
        }`}
        disabled={!payingAmount}
        onClick={() => router.push(`/payment?amount=${parseFloat(payingAmount)}`)}
      >
        Book your Ride
      </button>
    </motion.div>
  );
};

export default Booking;
