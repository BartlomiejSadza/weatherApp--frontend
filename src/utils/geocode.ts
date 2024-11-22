

async function getCoordinates(place: string): Promise<{ lat: number; lon: number }> {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(place)}&limit=1&appid=078039429123e11aefe7e8215a938288`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.length === 0) {
    throw new Error('Nima takiego miejsca');
  }

  const { lat, lon } = data[0];
  return { lat, lon };
}

async function testGetCoordinates() {
    try {
      const place = 'krakow';
      const coords = await getCoordinates(place);
      console.log(`Koordynaty dla: ${place}:`, coords);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  testGetCoordinates();