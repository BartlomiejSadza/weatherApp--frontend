import styles from "@/styles/Home.module.css";

interface ParametrProps {
  parametr: number | string;
  ikonka: string;
  tytuł: string;
}

export default function Parametr({ parametr, ikonka, tytuł }: ParametrProps) {
  let sformatowanyParametr;

  if (tytuł === "Nasłonecznienie") {
    const totalMinutes = Math.floor((parametr as number) / 60);
    const godziny = Math.floor(totalMinutes / 60);
    const minuty = totalMinutes % 60;
    sformatowanyParametr = `${godziny}h ${minuty}min`;
  } else if (tytuł === "Dni opadów") {
    sformatowanyParametr = `${(parametr as number).toFixed(0)} dni`;
  } else {
    // Domyślna obsługa dla pozostałych parametrów
    sformatowanyParametr = typeof parametr === 'number' ? parametr.toFixed(1) : parametr;
  }

  return (
    <div className={styles.parametr}>
      <h3>{tytuł}</h3>
      <img src={ikonka} alt={tytuł} />
      <h6>{sformatowanyParametr}</h6>
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