import styles from '@/styles/column.module.css';
import ikonki from '@/utils/ikonki';

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
    const { date, weatherCode, temperature2mMax, temperature2mMin, estimatedEnergy } = columnProps;

    // Użycie opcjonalnego łańcuchowania, aby uniknąć błędów, jeśli wartości są undefined
    const maxTemp = temperature2mMax?.toFixed(1) ?? "N/D";
    const minTemp = temperature2mMin?.toFixed(1) ?? "N/D";
    const estimatedEnergyFormatted = estimatedEnergy?.toFixed(2) ?? "N/D";  

    const ikonka = ikonki[weatherCode];

    return (
        <div className={styles.column}>
            <h2>{formatDaty(date)}</h2>
            <img src={ikonka} alt={`Ikona dla weather code: ${weatherCode}`}/>
            <p>Max Temp: {maxTemp}°C</p>
            <p>Min Temp: {minTemp}°C</p>
            <p>Ilość energii: {estimatedEnergyFormatted} kWh</p>
        </div>
    );
}