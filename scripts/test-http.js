async function test() {
    try {
        const res = await fetch('https://ejpppchjwzvrlpizldbi.supabase.co/rest/v1/', {
            headers: { 'apikey': 'invalid' }
        });
        console.log('Status:', res.status);
        console.log('Headers:', res.headers.get('x-supabase-id'));
    } catch (e) {
        console.error('Fetch Error:', e.message);
    }
}
test();
