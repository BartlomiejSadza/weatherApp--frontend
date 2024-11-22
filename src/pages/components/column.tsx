import styles from '@/styles/column.module.css';


interface ColumnProps {
    date: string;
    weatherCode: number;
    temperature2mMax: number;
    temperature2mMin: number;
    estimatedEnergy: number;
};

export default function Column(columnProps: ColumnProps): JSX.Element {
  return <div className={styles.column}>
    <h2>{columnProps.date}</h2>
    <p>Weather Code: {columnProps.weatherCode}</p>
    <p>Max Temp: {columnProps.temperature2mMax}</p>
    <p>Min Temp: {columnProps.temperature2mMin}</p>
    <p>Estimated Energy: {columnProps.estimatedEnergy}</p>
  </div>;
}