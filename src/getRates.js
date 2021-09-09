export default async (currency1, currency2) => {
    let promise = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1}/${currency2}.json`,{
        method: 'GET', 
    });
    let response = await promise.json();
    let result = await response;

    return result;
}