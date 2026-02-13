<div align="center">

# 🛺 Auto Fare App

### *Know the real fare. Ride with confidence.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**A web-based auto-rickshaw fare calculator for major Indian cities.**
**Verify your meter reading instantly — no more overcharging.**

---

[**View Demo**](#-getting-started) · [**Report Bug**](https://github.com/immortalfoodie/auto-fare-app/issues) · [**Request Feature**](https://github.com/immortalfoodie/auto-fare-app/issues) · [**Give Feedback**](https://docs.google.com/forms/d/e/1FAIpQLSd7FQjk4Wx5sXNpvk7xmBIw7NIL8GWsz5jS2bLT2vv7hq5Vxw/viewform?usp=dialog)

</div>

---

## 📌 The Problem

Every day, millions of auto-rickshaw passengers across India face the same question:

> *"Is the meter running correctly? Am I being overcharged?"*

Passengers have **no quick, reliable way** to verify whether the fare being charged matches the actual distance traveled and waiting time. This leads to disputes, frustration, and — more often than not — passengers simply paying whatever is asked.

## 💡 The Solution

**Auto Fare App** is a lightweight, instant fare calculator preloaded with **official fare structures** of major Indian cities. Just enter the distance and waiting time — the app calculates exactly what you should be paying, with a full transparent breakdown.

### How It Works

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   1️⃣  Select your city                          │
│   2️⃣  Enter distance (km) from the meter        │
│   3️⃣  Enter waiting time (optional)             │
│   4️⃣  Get instant fare breakdown ✅              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏙️ **Multi-City Support** | Preloaded fare data for **7 major Indian cities** |
| 🧮 **Transparent Breakdown** | See base fare, distance charge, and waiting charge separately |
| 🌙 **Day/Night Rates** | Mumbai supports separate day and night fare calculation |
| 📏 **Minimum Distance** | Automatically handles city-specific minimum fare distances |
| 📱 **Responsive Design** | Works perfectly on mobile, tablet, and desktop |
| ⚡ **Instant Calculation** | No loading, no API calls — everything runs client-side |
| 🎨 **Modern UI** | Clean, intuitive interface with shadcn/ui components |

---

## 🏙️ Supported Cities & Fare Chart

| City | Base Fare (₹) | Per Km (₹) | Waiting (₹/min) | Min Distance |
|:----:|:-------------:|:----------:|:----------------:|:------------:|
| **Mumbai** | 26 (Day) / 33 (Night) | 17.14 | 1.42 | 1.5 km |
| **Delhi** | 30 | 11.00 | 0.75 | 1.5 km |
| **Bangalore** | 30 | 15.00 | 0.50 | 2.0 km |
| **Chennai** | 50 | 18.00 | 1.50 | 1.8 km |
| **Kolkata** | 30 | 15.00 | 1.00 | 2.0 km |
| **Hyderabad** | 20 | 11.00 | 0.50 | 1.6 km |
| **Pune** | 25 | 17.00 | 1.42 | 1.5 km |

> [!NOTE]
> Fare rates are based on publicly available government-regulated tariffs. Mumbai is the only city with separate day and night (12 AM–5 AM) fare structures.

---

## 🧮 Fare Calculation Logic

The fare is computed using the following formula:

```
Total Fare = Base Fare + Distance Charge + Waiting Charge
```

| Component | Formula |
|-----------|---------|
| **Base Fare** | Fixed starting fare for the selected city |
| **Distance Charge** | `max(0, (Distance − Min Distance)) × Per Km Rate` |
| **Waiting Charge** | `Waiting Time (min) × Per Minute Rate` |
| **Total** | Sum of all components, **rounded up** to the nearest ₹ |

### Example

> **City:** Mumbai (Day) · **Distance:** 5 km · **Waiting:** 10 min
>
> | Component | Calculation | Amount |
> |-----------|-------------|--------|
> | Base Fare | — | ₹26.00 |
> | Distance | (5 − 1.5) × 17.14 | ₹59.99 |
> | Waiting | 10 × 1.42 | ₹14.20 |
> | **Total** | | **₹101.00** |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:----------:|---------|
| [**Next.js 15**](https://nextjs.org/) | React framework with App Router |
| [**React 19**](https://react.dev/) | UI library |
| [**TypeScript**](https://www.typescriptlang.org/) | Type-safe development |
| [**Tailwind CSS**](https://tailwindcss.com/) | Utility-first styling |
| [**shadcn/ui**](https://ui.shadcn.com/) | Accessible UI components (Radix UI) |
| [**Lucide React**](https://lucide.dev/) | Icon library |
| **Inter** | Google Font for clean typography |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18+**
- [pnpm](https://pnpm.io/) (recommended) or npm / yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/immortalfoodie/auto-fare-app.git

# 2. Navigate into the project
cd auto-fare-app

# 3. Install dependencies
pnpm install

# 4. Start the development server
pnpm dev
```

Then open [**http://localhost:3000**](http://localhost:3000) in your browser. 🎉

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
auto-fare-app/
│
├── app/
│   ├── globals.css          # Global styles & CSS custom properties
│   ├── layout.tsx           # Root layout (metadata, fonts, theme)
│   └── page.tsx             # Main calculator page (core logic + UI)
│
├── components/
│   └── theme-provider.tsx   # Light/dark theme context provider
│
├── hooks/
│   ├── use-mobile.tsx       # Mobile viewport detection hook
│   └── use-toast.ts         # Toast notification hook
│
├── lib/
│   └── utils.ts             # Shared utility functions (cn, etc.)
│
├── public/                  # Static assets (logos, placeholders)
├── styles/
│   └── globals.css          # Additional global styles
│
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies & scripts
└── pnpm-lock.yaml           # Lockfile
```

---

## 🗺️ Roadmap

- [x] Fare calculation for 7 major Indian cities
- [x] Mumbai day/night rate differentiation
- [x] Detailed fare breakdown display
- [x] Responsive mobile-first design
- [ ] Add more cities (Ahmedabad, Jaipur, Lucknow, etc.)
- [ ] GPS-based automatic distance calculation
- [ ] Fare history / trip log
- [ ] PWA support for offline use
- [ ] Fare comparison with Uber / Ola estimates

---

## 🤝 Contributing

Contributions are welcome! If you'd like to help improve the app:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/add-new-city`)
3. **Commit** your changes (`git commit -m 'Add fare data for Jaipur'`)
4. **Push** to the branch (`git push origin feature/add-new-city`)
5. **Open** a Pull Request

### Ways to Contribute

- 🏙️ Add fare data for your city
- 🐛 Report bugs or inaccuracies
- 💡 Suggest new features
- 📝 Improve documentation

---

## ⚠️ Disclaimer

> [!CAUTION]
> Fares are calculated based on publicly available rate information and may vary slightly from actual meter readings. This tool is intended for **reference purposes only**. The developers do **not** take any responsibility for inaccuracies or discrepancies. Please do not engage in disputes with auto-rickshaw drivers based solely on this calculator.

---

## 📬 Feedback

Found an incorrect fare or have a suggestion? We'd love to hear from you!

👉 [**Submit Feedback**](https://docs.google.com/forms/d/e/1FAIpQLSd7FQjk4Wx5sXNpvk7xmBIw7NIL8GWsz5jS2bLT2vv7hq5Vxw/viewform?usp=dialog)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ for every auto-rickshaw passenger in India**

⭐ Star this repo if you found it useful!

</div>
