import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DisplayCurrency from '../DisplayCurrency';

import styles from './index.module.css';

function ControlledTabs(currentCurrencies) {
    const [key, setKey] = useState('usd');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            {Object.entries(currentCurrencies.currencies).map((currency, i) => {
                return <Tab key={i} eventKey={currency[0]} title={currency[0].toUpperCase()}>
                    <div>{Object.entries(currency[1]).map((currencyToDisplay, i) => {
                        return <DisplayCurrency key={i} i={i} currency={currency[0]} currencyToDisplay={currencyToDisplay} />
                    })}</div>
                </Tab>
            })}
        </Tabs>
    );
}

export default ControlledTabs;