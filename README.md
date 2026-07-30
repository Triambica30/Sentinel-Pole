# 🚨 Sentinel Pole – Smart Emergency Response System

Sentinel Pole is an IoT-based smart emergency response system designed to improve public safety in vulnerable and isolated locations such as bus stops, railway stations, parks, and poorly lit streets.

When an emergency is triggered, the smart pole immediately activates a **flashing LED** and **buzzer** to alert nearby people while simultaneously sending the incident to **Firebase Realtime Database**. The incident is then displayed on a **live monitoring dashboard**, where authorities can acknowledge and resolve it in real time.

---

## 📌 Problem Statement

During emergencies, victims may not be able to call for help due to panic, lack of mobile network, or the absence of nearby assistance. Existing emergency response systems often rely on personal mobile devices, resulting in delayed response.

Sentinel Pole provides an instantly accessible public emergency infrastructure that helps both nearby people and emergency responders react quickly.

---

## ✨ Features

- 🚨 One-touch SOS emergency activation
- 💡 Flashing LED to attract nearby attention
- 🔊 Buzzer alert for audible emergency indication
- 📡 Firebase Realtime Database integration
- 🖥️ Live emergency monitoring dashboard
- 📋 Incident acknowledgement and resolution
- 📜 Incident history management
- 📊 Dashboard statistics and pole health monitoring

---

## ⚙️ Technologies Used

### Hardware
- ESP32
- Push Button
- LED
- Buzzer

### Software
- HTML
- CSS
- JavaScript
- Firebase Realtime Database
- Wokwi Simulator

---

## 🏗️ System Workflow

```text
Emergency Button Pressed
          │
          ▼
      ESP32 Smart Pole
          │
   ┌──────┴──────────┐
   │                 │
   ▼                 ▼
Flashing LED      Buzzer
  (Alert Nearby People)
          │
          ▼
Firebase Realtime Database
          │
          ▼
Live Dashboard
          │
   Acknowledge / Resolve
```

---

## 📂 Project Structure

```
Sentinel-Pole/
│
├── Dashboard/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── firebase.js
│
├── Wokwi/
│   ├── sketch.ino
│   └── diagram.json
│
├── Images/
│
└── README.md
```

---

## 🚀 How to Run

### Dashboard

1. Open the **Dashboard** folder.
2. Launch the project using **Live Server** in VS Code.
3. Ensure Firebase is configured.
4. Open the dashboard in your browser.

### Wokwi Simulation

1. Open the Wokwi project.
2. Start the ESP32 simulation.
3. Press the SOS button to trigger an emergency.
4. Observe the LED, buzzer.

---

## 🔮 Future Enhancements

- AI-based scream detection
- GPS location tracking
- Camera integration
- GSM/LTE communication
- LoRa/Mesh communication for poor network areas
- Mobile application
- Direct police and ambulance notification
- Predictive analytics dashboard

---


Hackathon Project

**Project Title:** Sentinel Pole – Smart Emergency Response System

---

## 📄 License

This project is developed for educational and hackathon purposes.
