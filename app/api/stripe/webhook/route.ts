import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const event = await request.json();
  let eventDetails;
  // Handle the event
  switch (event?.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
     console.log(paymentIntent)
      break;
    case 'invoice.paid':
      eventDetails = event.data.object;
      console.log(eventDetails)
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ eventDetails });
};
