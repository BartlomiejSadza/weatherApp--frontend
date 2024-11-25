import styles from '@/styles/column.module.css';
import ikonki from '@/utils/ikonki'

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
    const maxTemp = columnProps.temperature2mMax.toFixed(1);
    const minTemp = columnProps.temperature2mMin.toFixed(1);
    const estimatedEnergy = columnProps.estimatedEnergy.toFixed(2);  

    const ikonka = ikonki[weatherCode];

  return <div className={styles.column}>
    <h2>{formatDaty(date)}</h2>
    <img src={ikonka} alt={`ikonka dla weather code: ${weatherCode}`}/>
    <p>Max Temp: {maxTemp}</p>
    <p>Min Temp: {minTemp}</p>
    <p>Ilość energii: {estimatedEnergy} kWh</p>
  </div>;
}