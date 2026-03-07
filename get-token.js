const fs = require('fs');

async function getRefreshToken() {
    const CLIENT_ID = 'isi_client_id_disini';
    const CLIENT_SECRET = 'isi_client_secret_disini';
    const AUTH_CODE = '0f1d67fd9aa44b63bbd4c30ca297b79a'; // Code yang baru kamu kirim

    console.log("Sedang mencoba mendapatkan Refresh Token...");

    if (CLIENT_ID === 'isi_client_id_disini') {
        console.log("\n❌ ERROR: Kamu belum mengisi CLIENT_ID dan CLIENT_SECRET di file ini!");
        console.log("👉 Buka file get-token.js ini di VS Code, lalu ganti tulisan 'isi_client_id_disini' dan 'isi_client_secret_disini' dengan kode aslimu.\n");
        return;
    }

    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: AUTH_CODE,
                redirect_uri: 'http://localhost:3000'
            })
        });

        const data = await response.json();

        if (data.error) {
            console.log("\n❌ YAH GAGAL! Error dari Spotify: ", data.error_description || data.error);
            console.log("⚠️ Kemungkinan besar Authorization Code (0f1d...) sudah KADALUARSA (Expired). Kode itu hanya tahan 1 menit!");
            console.log("👉  Solusi: Ulangi proses mendapatkan URL 'code=' di browser lagi, copy kode yang baru, lalu update file ini.\n");
            return;
        }

        console.log("\n✅ BERHASIL! Ini Rahasia .env.local untuk kamu:\n");
        console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
        console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
        console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
        console.log("👉 Sekarang Bikin file baru bernama `.env.local` di folder portofolio-rspaa");
        console.log("👉 Copy-Paste ke-3 baris di atas, save, lalu restart `npm run dev` kamu!\n");

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

getRefreshToken();
