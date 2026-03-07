import { NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN || '',
        }),
        next: { revalidate: 3600 },
    });

    return response.json();
};

const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 0 },
    });
};

export async function GET() {
    // If credentials are not set (local dev), return MOCK data
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        return NextResponse.json({
            isPlaying: true,
            title: 'High School in Jakarta',
            artist: 'NIKI',
            album: 'Nicole',
            albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273b06b26ec58ac107d3fcbe076',
            songUrl: 'https://open.spotify.com/track/1a2f082d-72a2-b281-0081-8b9cad0e1f20',
        });
    }

    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ isPlaying: false });
        }

        const song = await response.json();

        if (song.item === null) {
            return NextResponse.json({ isPlaying: false });
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        return NextResponse.json({
            album,
            albumImageUrl,
            artist,
            isPlaying,
            songUrl,
            title,
        });
    } catch (error) {
        console.error('Error fetching Spotify currently playing', error);
        return NextResponse.json({ isPlaying: false }, { status: 500 });
    }
}
