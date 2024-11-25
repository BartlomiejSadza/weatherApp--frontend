import styles from "@/styles/Home.module.css";

interface ParametrProps {
  parametr: number | string;
  ikonka: string;
  tytuł: string;
}

export default function Parametr({ parametr, ikonka, tytuł }: ParametrProps) {
  return (
    <div className={styles.parametr}>
      <h3>{tytuł}</h3>
      <img src={ikonka} alt={tytuł} />
      <h6>{typeof parametr === 'number' ? parametr.toFixed(1) : parametr}</h6>
    </div>
  );
}

/**
 * interface WeeklyData {
    averagePressure: number,
    averageSunshineDuration: number,
    maxTemperature: number,
    minTemperature: number,
    precipitationDays: number,
    weatherSummary: string,
    windAverage: number
}
 */