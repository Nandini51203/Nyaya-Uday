# Nyaya‑Uday – Design Document

## 1. Overview

Nyaya‑Uday is a lightweight, mobile‑first web app designed to help students explore judicial careers through personalized roadmaps, interactive simulations, and a voice/chat assistant. The design prioritizes simplicity, accessibility, and performance on low‑end devices.

---

## 2. Design Goals

- Simple and beginner‑friendly user experience
- Fast loading and smooth performance
- Mobile‑first responsive design
- Accessibility for low‑bandwidth and low‑end devices
- Clear visual hierarchy and intuitive navigation

---

## 3. System Architecture

Nyaya‑Uday follows a **client‑side architecture**:

- HTML: Structure of the interface
- CSS: Responsive styling and layout
- JavaScript: Logic for roadmap generation, simulation, and assistant
- Local data storage using JSON objects
- Browser Web Speech API for voice input

No external backend or paid APIs are required.

---

## 4. User Interface Design

### Home Screen
- Clean landing interface
- State and education selection inputs
- Quick access to roadmap and simulation

### Roadmap View
- Step‑by‑step career path display
- Simple cards and progress indicators

### Simulation Interface
- Case scenario presentation
- Multiple choice decision options
- Instant feedback and scoring

### Assistant Interface
- Floating chat button
- Text and voice input support
- Rule‑based response system

---

## 5. Interaction Flow

1. User selects state and education level
2. App generates a personalized roadmap
3. User attempts simulation scenarios
4. System calculates aptitude score
5. Assistant provides additional guidance

---

## 6. Performance Considerations

- Lightweight assets and minimal dependencies
- Optimized JavaScript execution
- Mobile‑friendly responsive layout
- Works offline or with minimal internet

---

## 7. Future Design Enhancements

- Expanded simulation library
- Additional language support
- Improved UI animations
- Advanced progress tracking
