import React, { useState } from "react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Bars } from "react-loader-spinner";

const CheckOutForm = ({ amount }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const eta = Math.floor(Math.random() * 20 + 5);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage("Error submitting payment details: " + submitError.message);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.floor(amount * 100), currency: "inr" }),
    });

    const { clientSecret } = await res.json();

    console.log(window.location.origin);

    const { error } = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${amount}&eta=${eta}`,
      },
    });

    if (error) {
      setErrorMessage("Payment confirmation error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center mt-6 p-4">
      <div className="flex flex-col justify-center items-center">
        {loading && (
          <div className="w-full h-[70vh] flex items-center justify-center">
            <Bars
              height="50"
              width="50"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className={`${
            loading
              ? "opacity-0"
              : "border border-gray-200 p-4 rounded-lg relative"
          }`}
        >
          <PaymentElement />
          <button
            type="submit"
            className="w-full rounded-full bg-yellow-400 p-2 mx-2 mt-4"
            disabled={!stripe || !elements || loading}
          >
            Pay
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CheckOutForm;
