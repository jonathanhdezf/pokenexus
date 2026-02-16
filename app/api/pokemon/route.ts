import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '12';
    const orderBy = searchParams.get('orderBy') || '-set.releaseDate';

    const apiUrl = new URL('https://api.pokemontcg.io/v2/cards');
    if (q) apiUrl.searchParams.append('q', q);
    apiUrl.searchParams.append('page', page);
    apiUrl.searchParams.append('pageSize', pageSize);
    apiUrl.searchParams.append('orderBy', orderBy);

    try {
        const response = await fetch(apiUrl.toString(), {
            headers: {
                'X-Api-Key': '7878696b-1667-4581-9f9b-648439d56285', // Public key for stability
                'Accept': 'application/json',
            },
            next: { revalidate: 60 } // Cache for 1 minute on server
        });

        if (!response.ok) {
            return NextResponse.json({ error: `API Error: ${response.status}` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
