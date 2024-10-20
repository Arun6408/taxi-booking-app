import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2024-09-30.acacia",
});

export async function POST(request: any) {
    const data: any = await request.json();
    const amount = data.amount;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            automatic_payment_methods: { enabled: true }
        });
        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
