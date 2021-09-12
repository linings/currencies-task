import { useEffect, useState } from 'react';
import styles from './index.module.css';

const DisplayCurrency = ({ currencyToDisplay, keyValue, currency, setCounter }) => {
    const [arrayOfAllCombinedValues, setArrayOfAllCombinedValues] = useState([]);

    useEffect(() => {
        const combineAllValues = (value) => {
            for (let i = 0; i < Object.entries(Object.entries(currency)[1][1][value]).length; i++) {
                let v = (Object.entries(Object.entries(currency)[1][1][value][i])[0][1]).toFixed(1);

                if (arrayOfAllCombinedValues.includes(v)) {
                    break;
                }
                setArrayOfAllCombinedValues(arrayOfAllCombinedValues => arrayOfAllCombinedValues.concat(v));

            }
        }

        if (currency[0] === keyValue) {
            const values = ['equal', 'less', 'more'];

            for (let i = 0; i < values.length; i++) {
                combineAllValues(values[i]);

                arrayOfAllCombinedValues.sort((a, b) => b - a);
            }
        }
        let unique = [...new Set(arrayOfAllCombinedValues)];

        if (unique.length > 0) {
            let counter = 0;
            for (let i = 0; i < unique.length - 1; i++) {
                const diff = Number((unique[i] - unique[i + 1]).toFixed(1));

                if (diff > 0.5) {
                    counter = 0;
                    continue;
                }
                counter++;
            }
            setCounter(counter);
        }
    }, [arrayOfAllCombinedValues, keyValue]);

    return (
        <div>
            <br />
            {currencyToDisplay[1].map((element, i) => {
                element = Object.entries(element);

                return <div key={i}>{element[0][0]}: {element[0][1]}</div>
            })}
            <div>Count: {currencyToDisplay[1].length}</div>
        </div>
    )
}

export default DisplayCurrency;