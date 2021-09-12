// export default async (currency1, currency2) => {
//     let promise = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1}/${currency2}.json`, {
//         method: 'GET',
//     });
//     let response = await promise.json();
//     let result = await response;

//     return result;
// }
export default (currency1, currency2) => {
    let currArray = Promise.all([
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1}/${currency2}.json`, {
            method: 'GET',
        }),
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency2}/${currency1}.json`, {
            method: 'GET',
        })
    ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([currency, oppositeCurrency]) => {
            let keyCurrency = {};
            let oppositeKeyCurrency = {};
            
            keyCurrency[`${currency1}-${currency2}`] = currency[`${currency2}`];
            oppositeKeyCurrency[`${currency2}-${currency1}`] = oppositeCurrency[`${currency1}`];

            return [keyCurrency, oppositeKeyCurrency]
        });
    return currArray;
}