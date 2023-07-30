import { NextResponse } from "next/server";
import { inputSchema } from "../../../../types";

export async function POST(request:Request) {
    const body = await request.json();
    
    try {
        const {ipAddress} = inputSchema.parse(body);

        const result = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEOLOCATION_API_KEY}&ipAddress=${ipAddress}`).then(res => res.json())
        console.log(result);
        return NextResponse.json(result);
    } catch (error) {
        return new Response("Invalid ip address");
    }

}