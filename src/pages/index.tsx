import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Column from "./components/column";
import { useEffect, useState } from "react";
import Parametr from "./components/parametry";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface WeatherData {
  date: string;
  weatherCode: number;
  temperature2mMax: number;
  temperature2mMin: number;
  estimatedEnergy: number;
}

interface WeeklyData {
  averagePressure: number;
  averageSunshineDuration: number;
  maxTemperature: number;
  minTemperature: number;
  precipitationDays: number;
  weatherSummary: string;
  windAverage: number;
}

export async function getServerSideProps() {
  let lat = 30;
  let lon = 20;
  const res = await fetch(`https://backend-weatherapp-2oet.onrender.com/endpoint1?lat=${lat}&lon=${lon}`);
  const data: WeatherData[] = await res.json();
  const res2 = await fetch(`https://backend-weatherapp-2oet.onrender.com/endpoint2?lat=${lat}&lon=${lon}`);
  const data2: WeeklyData = await res2.json();

  return {
    props: {
      weatherData: data,
      weeklyData: data2,
    },
  };
}

interface HomeProps {
  weatherData: WeatherData[];
  weeklyData: WeeklyData;
}

export default function Home({ weatherData, weeklyData }: HomeProps): JSX.Element {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [updatedWeatherData, setUpdatedWeatherData] = useState<WeatherData[]>(weatherData);
  const [updatedWeeklyData, setUpdatedWeeklyData] = useState<WeeklyData>(weeklyData);
  const [darkMode, setDarkMode] = useState(false);

  console.log(styles);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.className = newMode ? "dark" : "light";
      return newMode;
    });
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    document.body.className = prefersDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: parseFloat(position.coords.latitude.toFixed(3)),
          lon: parseFloat(position.coords.longitude.toFixed(3)),
        });
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          const res = await fetch(`/api/endpoint1?lat=${location.lat}&lon=${location.lon}`);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data: WeatherData[] = await res.json();
          setUpdatedWeatherData(data);
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        }
      };
      fetchWeatherData();
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      const fetchWeeklyData = async () => {
        try {
          const res = await fetch(`/api/endpoint2?lat=${location.lat}&lon=${location.lon}`);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data: WeeklyData = await res.json();
          setUpdatedWeeklyData(data);
        } catch (error) {
          console.error("Failed to fetch weekly data:", error);
        }
      };
      fetchWeeklyData();
    }
  }, [location]);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather forecast app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${darkMode ? styles.dark : styles.light}`}>
        <button
          className={darkMode ? styles.darkModeButton : styles.lightModeButton}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Tryb Jasny" : "Tryb Ciemny"}
        </button>
        <header className={styles.header}>
          <h1>{`Miasto: ${location ? "Twoje lokalne miasto" : "Nieznane"}`}</h1>
          <p>{`Aktualna temperatura: ${updatedWeatherData[0]?.temperature2mMax || "-"}°C`}</p>
        </header>
        <main className={styles.main}>
          <div className={styles.columnsContainer}>
            {updatedWeatherData.map((data) => (
              <Column
                key={data.date}
                date={data.date}
                weatherCode={data.weatherCode}
                temperature2mMax={data.temperature2mMax}
                temperature2mMin={data.temperature2mMin}
                estimatedEnergy={data.estimatedEnergy}
              />
            ))}
          </div>
          <footer className={styles.weeklySummary}>
            <Parametr parametr={updatedWeeklyData.averagePressure} ikonka="/icons/pressure.png" tytuł="Ciśnienie" />
            <Parametr parametr={updatedWeeklyData.averageSunshineDuration} ikonka="/icons/sun.png" tytuł="Nasłonecznienie" />
            <Parametr parametr={updatedWeeklyData.maxTemperature} ikonka="/icons/temp-high.png" tytuł="Temp. maksymalna" />
            <Parametr parametr={updatedWeeklyData.minTemperature} ikonka="/icons/temp-low.png" tytuł="Temp. minimalna" />
            <Parametr parametr={updatedWeeklyData.precipitationDays} ikonka="/icons/rain.png" tytuł="Dni opadów" />
            <Parametr parametr={updatedWeeklyData.windAverage} ikonka="/icons/wind.png" tytuł="Prędkość wiatru" />
          </footer>
        </main>
      </div>
    </>
  );
}
