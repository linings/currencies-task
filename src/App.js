import './App.css';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import getRates from './getRates';
import { useEffect, useState } from 'react';
import ControlledTabs from './components/ControlledTabs';

function App() {
  const [currentCurrencies, setCurrentCurrencies] = useState({});
  let [loading, setLoading] = useState(true);

  const currencies = ['usd', 'eur', 'aud', 'cad', 'chf', 'nzd', 'bgn'];

  const getCurrentCurrencies = async () => {
    let currenciesObj = {};

    for (let i = 0; i < currencies.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        let rates = await getRates(currencies[i], currencies[j]);

        if (i === j) {
          continue;
        }
        if (!currenciesObj.hasOwnProperty(currencies[i])) {
          currenciesObj[currencies[i]] = {
            less: [],
            equal: [],
            more: []
          };
        }
        if (Object.entries(rates)[1][1] < 1) {
          currenciesObj[currencies[i]].less.push(Object.entries(rates)[1]);
        } else if (Object.entries(rates)[1][1] >= 1 && Object.entries(rates)[1][1] < 1.5) {
          currenciesObj[currencies[i]].equal.push(Object.entries(rates)[1]);
        } else {
          currenciesObj[currencies[i]].more.push(Object.entries(rates)[1]);
        }
      }
    }
    setCurrentCurrencies(currentCurrencies => Object.assign(currentCurrencies, currenciesObj));

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
