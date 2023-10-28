import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  console.log('hello');

  return NextResponse.json('hello');
};
