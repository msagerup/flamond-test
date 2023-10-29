import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const event = await request.json();
  let eventDetails;
  // Handle the event
  switch (event?.type) {
    // Normally you would connect a db here, and store
    // what values you want, and then fetch them on the front end.
    // let's say eventDetails is our "DB" here in the example.
    case 'payment_intent.succeeded':
      eventDetails = event.data.object;
      break;
    case 'invoice.paid':
      eventDetails = event.data.object;
      break;
    case 'payment_intent.payment_failed':
      eventDetails = event.data.object;

    // We could store other values also, there's a lot of events ;D.

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ eventDetails });
};
