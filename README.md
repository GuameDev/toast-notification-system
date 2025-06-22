# Angular 20 Toast Notification System

A clean, modern, and fully customizable **toast notification system** built in **Angular 20+** using **standalone components**, **signals**, **Tailwind CSS**, and **Material Icons**.

> ✅ Ideal for mentoring, professional portfolios, or real-world Angular architecture demos.

---

## ✨ Features

* ✅ **Standalone Angular 20+ architecture**
* ✅ **Reactive toast service** using `signal()`
* ✅ **Auto-dismiss with countdown**
* ✅ **Progress bar animation**
* ✅ **Customizable toast type, position, duration, message, and title**
* ✅ **Material Icons** with Tailwind styling
* ✅ **Clean, industry-grade code structure**

---

## 📸 Demo

![Toast Demo UI Screenshot](docs/screenshot.png) <!-- Optional -->

---

## 🚀 Quick Start

```bash
# Clone the repo
https://github.com/your-org/angular-toast-demo.git

cd angular-toast-demo

# Install dependencies
npm install

# Run locally
ng serve
```

Then open: [http://localhost:4200](http://localhost:4200)

---

## 🧱 Architecture Overview

### 🔹 Toast Service (`ToastService`)

* Built with Angular `signal()` for reactive UI updates
* Exposes `toastMessage: Signal<ToastMessage | null>`
* Accepts options: `title`, `message`, `type`, `position`, `duration`
* Handles auto-dismiss via `setTimeout`

### 🔹 Toast Component (`ToastComponent`)

* Standalone component with Tailwind styling
* Displays the toast with position and type awareness
* Progress bar tracks dismissal time in real-time
* Configurable icon and color per toast type

### 🔹 Home Page

* Playground form to create toasts
* Includes inputs for all toast properties
* Great for demos and testing

---

## 🧠 Tech Stack

* **Angular 20+** (standalone components, signals)
* **Tailwind CSS** (utility-first styling)
* **Material Icons** via Google Fonts

---

## 📁 Project Structure

```sh
src/
├── app/
│   ├── home/                  # Demo playground
│   └── shared/
│       └── toast/
│           ├── components/    # ToastComponent
│           ├── models/        # ToastMessage, ToastType, ToastPosition
│           └── services/      # ToastService
```

---

## 📦 Toast Types

```ts
export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  None = 'none'
}
```

## 🧭 Toast Positions

```ts
export enum ToastPosition {
  TopRight = 'position-top-right',
  TopLeft = 'position-top-left',
  BottomRight = 'position-bottom-right',
  BottomLeft = 'position-bottom-left',
  Center = 'position-center',
}
```

Handled via a Tailwind-friendly mapping in the component.

---

## 📌 Example Usage

```ts
this.toastService.show(
  'Upload Complete',
  'Your files were successfully uploaded.',
  5,
  ToastType.Success,
  ToastPosition.BottomRight
);
```

---

## 🤝 Contributing

Want to improve this or extend it (queueing, stacking, animations)?
Pull requests are welcome — just fork the repo and go!

---

## 📄
