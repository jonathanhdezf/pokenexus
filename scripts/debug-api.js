async function test() {
    const url = 'https://api.pokemontcg.io/v2/cards?q=set.id:base1&pageSize=1';
    console.log('Fetching:', url);
    const res = await fetch(url);
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body start:', text.substring(0, 200));
}
test();
