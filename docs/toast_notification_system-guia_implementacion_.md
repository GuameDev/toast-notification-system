# Guía de Implementación: Toast Notifications en Angular + Tailwind + Signals

Este documento es una guía paso a paso para implementar un sistema de notificaciones tipo "toast" en Angular, usando las nuevas **signals** de Angular, **TailwindCSS** para estilos, y una arquitectura **escalable y limpia**.

---

## 🎯 Objetivo

Crear un servicio de Toast reutilizable y flexible que:

- Soporte múltiples notificaciones concurrentes
- Use signals reactivas para un rendimiento óptimo
- Permita personalizar tipo, duración y posición
- Incorpore barra de progreso y animaciones

---

## 🧱 Estructura del Proyecto

```txt
src/app/shared/toast/
├── components/
│   └── toast-component/       # Componente visual de toasts
├── constants/
│   └── toast.constants.ts     # Constantes reutilizables
├── models/
│   ├── toast-message.model.ts
│   ├── toast-position.enum.ts
│   ├── toast-type.enum.ts
│   └── show-toast-options.model.ts
└── services/
    └── toast-service/         # Lógica central de toasts
```

---

## ⚙️ Lógica del Servicio: `ToastService`

El servicio expone un `signal` de tipo `ToastMessage[]` para manejar múltiples toasts:

```ts
export class ToastService {
  private readonly _toasts = signal<ToastMessage[]>([]);
  readonly toasts = computed(() => this._toasts());

  show(options: ShowToastOptions): void {
    const duration = options.durationInSeconds ?? DEFAULT_TOAST_DURATION_SECONDS;
    const toast = new ToastMessage({ ...options, visible: true, durationInSeconds: duration, startTime: Date.now() });
    this._toasts.update(prev => [...prev, toast]);

    setTimeout(() => this.dismiss(toast.id), duration * TOAST_TIMEOUT_MS_MULTIPLIER);
  }

  dismiss(id: string): void {
    this._toasts.update(prev => prev.filter(t => t.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
```

---

## 🧠 Modelo de Toast

```ts
export class ToastMessage {
  id: string = crypto.randomUUID();
  visible: boolean;
  title: string;
  message: string;
  durationInSeconds: number;
  position: ToastPosition;
  type: ToastType;
  startTime?: number;

  constructor(params: Partial<ToastMessage>) {
    Object.assign(this, {
      visible: true,
      title: DEFAULT_TOAST_TITLE,
      message: DEFAULT_TOAST_MESSAGE,
      durationInSeconds: DEFAULT_TOAST_DURATION_SECONDS,
      position: ToastPosition.Center,
      type: ToastType.Info,
      ...params
    });
  }
}
```

---

## 🎨 Vista del Toast (`toast-component.html`)

```html
<div
  *ngFor="let toast of toasts()"
  class="fixed z-50 w-96 shadow-lg rounded-md p-4 bg-white border-l-4"
  [ngClass]="[
    getPositionClasses(toast.position),
    toast.visible ? 'animate-fade-in' : 'animate-fade-out',
    toast.type === toastType.Success ? 'border-green-500' : '',
    ...
  ]"
>
  <!-- contenido del toast con icono, título, mensaje y botón cerrar -->
</div>
```

---

## 📊 Lógica del progreso

```ts
getProgress(toast: ToastMessage): number {
  if (!this.progressMap.has(toast.id)) {
    const progress = signal<number>(PROGRESS_INITIAL_PERCENT);
    this.progressMap.set(toast.id, progress);

    const interval = setInterval(() => {
      const elapsed = Date.now() - (toast.startTime ?? 0);
      const pct = 100 - (elapsed / (toast.durationInSeconds * TOAST_TIMEOUT_MS_MULTIPLIER)) * 100;
      progress.set(Math.max(0, pct));
      if (pct <= 0) clearInterval(interval);
    }, PROGRESS_UPDATE_INTERVAL_MS);
  }

  return this.progressMap.get(toast.id)?.() ?? 0;
}
```

---

## ⚙️ Constantes

```ts
export const DEFAULT_TOAST_DURATION_SECONDS = 5;
export const DEFAULT_TOAST_TITLE = 'Toast Title';
export const DEFAULT_TOAST_MESSAGE = 'This is a sample toast message';
export const TOAST_TIMEOUT_MS_MULTIPLIER = 1000;
export const PROGRESS_INITIAL_PERCENT = 100;
export const PROGRESS_UPDATE_INTERVAL_MS = 100;
```

---

## ✅ Funcionalidad Incluida

- ✅ Soporte de múltiples toasts
- ✅ Animaciones fade-in/fade-out con Tailwind
- ✅ Barra de progreso con actualizaciones reactivas
- ✅ Cierre automático o manual
- ✅ Personalización de título, duración, tipo y posición

