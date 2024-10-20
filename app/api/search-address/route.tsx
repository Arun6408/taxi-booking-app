import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('q');
    
    const sessionToken = uuidv4();

    const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchText}&language=en&limit=5&session_token=${sessionToken}&proximity=77.2090,28.6139&country=IN&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": 'application/json'
        }
    });
    const data = await response.json();

    return NextResponse.json({ data });
}
