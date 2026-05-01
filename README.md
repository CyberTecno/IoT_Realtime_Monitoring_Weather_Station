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



## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Author : 
CyberTecno ~ Nata

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
