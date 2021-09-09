import styles from './index.module.css';

const DisplayCurrency = ({ i, currency, currencyToDisplay }) => {
    return (
        <div>
            <div className={styles.group}>Group {i + 1}</div>
            {currencyToDisplay[1].map((element, i) => {
                return <div key={i}>{currency.toUpperCase()}-{element[0].toUpperCase()}: {element[1].toFixed(4)}</div>
            })}
            <div>Count: {currencyToDisplay[1].length}</div>
        </div>
    )
}

export default DisplayCurrency;