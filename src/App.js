import './App.css';
import Spinner from 'react-bootstrap/Spinner';
import getRates from './getRates';
import { useEffect, useState } from 'react';
import ControlledTabs from './components/ControlledTabs';

function App() {
  const [currentCurrencies, setCurrentCurrencies] = useState({});
  let [loading, setLoading] = useState(true);

  const currencies = ['usd', 'eur', 'aud', 'cad', 'chf', 'nzd', 'bgn'];

  const getCurrentCurrencies = async () => {
    let allCurrenciesAndTheirValuesObj = {};

    for (let i = 0; i < currencies.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        const initialRates = await getRates(currencies[i], currencies[j]);

        if (i === j) {
          continue;
        }

        if (!allCurrenciesAndTheirValuesObj.hasOwnProperty(currencies[i])) {
          allCurrenciesAndTheirValuesObj[currencies[i]] = {
            less: [],
            equal: [],
            more: []
          };
        }
        for (let k = 0; k < initialRates.length; k++) {
          const currencyAndItsRate = initialRates[k];
          const currencyCurrentAmount = Object.entries(currencyAndItsRate)[0][1];
          const currencyCurrentType = currencies[i];

          if (currencyCurrentAmount < 1) {
            allCurrenciesAndTheirValuesObj[currencyCurrentType].less.push(currencyAndItsRate);
          } else if (currencyCurrentAmount >= 1 && currencyCurrentAmount < 1.5) {
            allCurrenciesAndTheirValuesObj[currencyCurrentType].equal.push(currencyAndItsRate);
          } else {
            allCurrenciesAndTheirValuesObj[currencyCurrentType].more.push(currencyAndItsRate);
          }
        }
      }
    }
    setCurrentCurrencies(currentCurrencies => Object.assign(currentCurrencies, allCurrenciesAndTheirValuesObj));

    if (Object.entries(currentCurrencies).length !== 0) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCurrentCurrencies();
  }, [loading]);

  if (loading) {
    return <Spinner animation="border" variant="info" />;
  }

  return (
    <ControlledTabs currencies={currentCurrencies} />
  );
}

export default App;
