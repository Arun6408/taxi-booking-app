"use client";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<string | null>(null);
  const [eta, setEta] = useState<string | null>(null);

  useEffect(() => {
    const amountPaid = searchParams.get("amount");
    const estimatedTime = searchParams.get("eta");

    setAmount(amountPaid);
    setEta(estimatedTime);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex items-center flex-grow">
        <div className="bg-white p-8 mx-2 md:p-10 shadow-lg rounded-xl text-center max-w-lg">
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 mx-auto text-green-600 animate-pulse"
          >
            <path
              fill="currentColor"
              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.373 17.627l-4.545-4.546 1.732-1.732 2.813 2.813L16.84 6.767l1.732 1.732-8.945 8.945z"
            />
          </svg>
          <div className="mt-6 text-2xl font-bold text-gray-900">
            Payment Successful!
          </div>
          <p className="text-gray-700 mt-4">
            Thank you for your payment! Your transaction has been successfully
            processed.
          </p>

          {amount && (
            <div className="mt-6 text-lg font-semibold text-green-700">
              You paid{" "}
              <span className="font-bold text-2xl">
                ₹{Math.floor(parseFloat(amount))}
              </span>
            </div>
          )}
          {eta && (
            <div className="mt-4 text-lg text-gray-600">
              Your cab will arrive in{" "}
              <span className="font-semibold">{eta} min</span>.
            </div>
          )}

          <div className="py-10 text-center">
            <a
              href="/"
              className="px-10 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Go Back Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
