# Użyj oficjalnego obrazu Node.js jako bazowego
FROM node:20

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików aplikacji do katalogu roboczego
COPY . .

# Przejdź do katalogu src
WORKDIR /app/src

# Zbuduj aplikację Next.js
RUN npm run build

# Ustaw zmienną środowiskową dla Next.js
ENV NODE_ENV production

# Expose port 3000
EXPOSE 3000

# Uruchom aplikację Next.js
CMD ["npm", "start"]