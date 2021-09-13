import { useEffect, useState } from 'react';
import styles from './index.module.css';

const DisplayCurrency = ({ currencyToDisplay, clickedCurrency, currencyAndItsValues, setCounter }) => {
    const [arrayOfAllCombinedValues, setArrayOfAllCombinedValues] = useState([]);

    useEffect(() => {
        if (currencyAndItsValues[0] === clickedCurrency) {
            const values = ['equal', 'less', 'more'];

            for (let i = 0; i < values.length; i++) {
                combineAllValues(values[i]);

                arrayOfAllCombinedValues.sort((a, b) => b - a);
            }
        }

        getLengthOfLongestArray(arrayOfAllCombinedValues);

    }, [arrayOfAllCombinedValues, clickedCurrency]);

    const getLengthOfLongestArray = () => {
        let uniqueArray = [...new Set(arrayOfAllCombinedValues)];

        if (uniqueArray.length > 0) {
            let counter = 0;
            for (let i = 0; i < uniqueArray.length - 1; i++) {
                const diff = Number((uniqueArray[i] - uniqueArray[i + 1]).toFixed(1));

                if (diff > 0.5) {
                    counter = 0;
                    continue;
                }
                counter++;
            }
            setCounter(counter);
        }
    }

    const combineAllValues = (value) => {
        const currencies = Object.entries(Object.entries(currencyAndItsValues)[1][1][value]);

        for (let i = 0; i < currencies.length; i++) {

            let fixedValue = (Object.entries(Object.entries(currencyAndItsValues)[1][1][value][i])[0][1]).toFixed(1);

            if (arrayOfAllCombinedValues.includes(fixedValue)) {
                break;
            }
            setArrayOfAllCombinedValues(arrayOfAllCombinedValues => arrayOfAllCombinedValues.concat(fixedValue));
        }
    }

    return (
        <div className={styles['single-currency']}>
            {currencyToDisplay[1].map((currencyAndItsValue, i) => {
                currencyAndItsValue = Object.entries(currencyAndItsValue);

                return <div key={i}>{currencyAndItsValue[0][0]}: {currencyAndItsValue[0][1]}</div>
            })}
            <div>Count: {currencyToDisplay[1].length}</div>
        </div>
    )
}

export default DisplayCurrency;