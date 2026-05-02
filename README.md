# 🌤️ Atmospheric Intelligence Dashboard
**IoT-Based Realtime Weather Station Monitoring System**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![Three.js](https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white)

A high-performance, real-time environmental monitoring dashboard designed for precision and aesthetics. This system integrates hardware edge computing (ESP32) with a modern web frontend featuring a futuristic "Anti-Gravity" Glassmorphism design and interactive 3D visualizations.

---

## ✨ Features

- ⚡ **Real-Time Telemetry:** Instantaneous data fetching from ESP32 sensors via Supabase real-time subscriptions.
- 🎨 **Anti-Gravity UI:** A stunning, premium glassmorphism interface powered by Tailwind CSS and Framer Motion for organic, levitating micro-animations.
- 🗺️ **3D Campus Map:** Interactive 3D visualization using React Three Fiber.
- 📊 **Dynamic Data Aggregation:** Historical logs and trend charts updated dynamically at consistent intervals.
- 📱 **Fully Responsive:** Bento-grid layout that adapts perfectly from large desktop screens to mobile devices.

## 📊 Database Schema

### `sensor_readings` — Scheduled Routine Telemetry

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `created_at` | `timestamptz` | Timestamp |
| `temp_bme` | `float` | Temperature from BME280 (°C) |
| `hum_bme` | `float` | Humidity from BME280 (%) |
| `pressure` | `float` | Atmospheric pressure (hPa) |
| `temp_dht` | `float` | Temperature from DHT22 (°C) |
| `hum_dht` | `float` | Humidity from DHT22 (%) |
| `lux` | `float` | Light intensity (lx) |
| `is_raining` | `boolean` | Rain detection flag |
| `rainfall_mm` | `float` | Accumulated rainfall (mm) |
| `wind_speed` | `float` | Wind speed (km/h) |
| `wind_direction` | `varchar` | Wind direction (N, NE, E, …) |
| `pm1_0` | `float` | PM1.0 concentration (µg/m³) |
| `pm2_5` | `float` | PM2.5 concentration (µg/m³) |
| `pm10` | `float` | PM10 concentration (µg/m³) |

### `vibration_events` — Event-Driven Anomaly Log

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `created_at` | `timestamptz` | Timestamp |
| `vibration_intensity` | `float` | Intensity reading |
| `status` | `varchar` | Classification (e.g., `LOW`, `MEDIUM`, `HIGH`) |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        ESP32 (Edge)                         │
│                                                             │
│  [BME280] [DHT22] [BH1750] [PMS5003] [Wind] [Rain] [Vibe]   │
│       ↓                                        ↓            │
│   Routine Telemetry                   Anomaly Detection     │
│   (every N seconds)                  (immediate trigger)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP POST (Wi-Fi)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase (Cloud)                         │
│                                                             │
│  ┌──────────────────┐               ┌──────────────────┐    │
│  │  sensor_readings │               │ vibration_events │    │
│  │  (routine data)  │               │  (event-driven)  │    │
│  └────────┬─────────┘               └────────┬─────────┘    │
│           │        PostgreSQL Realtime       │              │
└───────────┼──────────────────────────────────┼──────────────┘
            │          WebSocket / REST        │
            ▼                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js (Frontend)                       │
│                                                             │
│              Dashboard  ←→  Real-time Alert                 │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

**Frontend Architecture:**
- **Core:** React 19, Vite
- **Styling:** Tailwind CSS, Framer Motion, Lucide Icons
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Routing & Charts:** React Router v7, Recharts

**Backend & Hardware:**
- **Database:** Supabase (PostgreSQL)
- **Edge Computing:** ESP32 Microcontroller

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CyberTecno/IoT_Realtime_Monitoring_Weather_Station.git
   cd IoT_Realtime_Monitoring_Weather_Station
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials. **(Ensure `.env` is listed in your `.gitignore` file)**
   ```env
   VITE_SUPABASE_URL=https://your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 🌐 Deployment (Netlify)

This project is optimized for Single Page Application (SPA) deployment on Netlify. It includes a `public/_redirects` file to handle React Router navigation.

1. Push your repository to GitHub.
2. Log into [Netlify](https://www.netlify.com/) and click **Add new site** -> **Import an existing project**.
3. Select your GitHub repository.
4. Use the following build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Go to **Site configuration** -> **Environment variables** and add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Click **Deploy Site** (or trigger a re-deploy if you added environment variables later).

## 📄 License

This project is under the [MIT License](LICENSE).

Author : 
CyberTecno ~ Nata
