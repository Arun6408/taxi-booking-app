"use client";
import CheckOutForm from "@/components/payment/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

const Payment = () => {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<number | null>(null);

  const [isTimerEnd, setIsTimerEnd] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimerEnd(true);
    }, 7000);
    return () => clearTimeout(timer); // Clear timeout on unmount
  }, []);

  useEffect(() => {
    const amountParam = searchParams.get("amount");
    if (amountParam) {
      const parsedAmount = parseFloat(amountParam);
      setAmount(parsedAmount);
    }
  }, [searchParams]);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any
  );

  const stripeOptions: any = {
    mode: "payment",
    currency: "inr",
    amount: amount ? Math.round(amount * 100) : 0,
  };

  return amount !== null ? (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <CheckOutForm amount={amount} />
    </Elements>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center">
      {!isTimerEnd ? (
        // Show loading spinner before timer ends
        <Bars
          height="50"
          width="50"
          color="#427ab2"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        // Show error message after timer ends
        <div className="text-center">
          <p>Couldn't Fetch Payment Details</p>
          <a href="/" className="text-blue-500 underline">Go to home</a>
        </div>
      )}
    </div>
  );
};
export default Payment;
