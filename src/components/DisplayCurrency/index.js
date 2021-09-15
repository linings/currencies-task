import styles from './index.module.css';

const DisplayCurrency = ({ currencyToDisplay}) => {

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