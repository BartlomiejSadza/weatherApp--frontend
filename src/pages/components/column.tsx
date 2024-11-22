import styles from '@/styles/column.module.css';


interface ColumnProps {
    date: string;
    weatherCode: number;
    temperature2mMax: number;
    temperature2mMin: number;
    estimatedEnergy: number;
};

function formatDaty(dataString: string): string {
    const data = new Date(dataString);
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth()+1).padStart(2, '0');
    const year = String(data.getFullYear());
    return `${day}/${month}/${year}`;
}
export default function Column(columnProps: ColumnProps): JSX.Element {
    const date = (columnProps.date);
    const weatherCode = columnProps.weatherCode;
    const maxTemp = columnProps.temperature2mMax;
    const minTemp = columnProps.temperature2mMin;
    const estimatedEnergy = columnProps.estimatedEnergy;  

  return <div className={styles.column}>
    <h2>{formatDaty(date)}</h2>
    <p>Weather Code: {weatherCode}</p>
    <p>Max Temp: {}</p>
    <p>Min Temp: {}</p>
    <p>Estimated Energy: {}</p>
  </div>;
}