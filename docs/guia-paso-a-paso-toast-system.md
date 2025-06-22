# Guía Paso a Paso: Sistema de Notificaciones Toast en Angular 20

Esta guía te explica paso a paso cómo desarrollamos un sistema de notificaciones tipo **toast** moderno, reutilizable y profesional en **Angular 20+**, utilizando:

* Componentes standalone
* `signal()` de Angular para reactividad
* TailwindCSS para el estilo visual
* Material Icons para los íconos

---

## ✅ Objetivo

Crear un componente de notificaciones tipo toast que permita mostrar mensajes personalizados con:

* Título, mensaje y duración
* Ícono y color por tipo (éxito, error, info, etc.)
* Posición configurable (esquina, centro, etc.)
* Barra de progreso animada

---

## 🧱 Paso 1: Crear el Proyecto

```bash
npm install -g @angular/cli
ng new toast-demo --standalone
cd toast-demo
```

> Recomendado: Angular CLI 17+ o 20 con standalone y routing habilitado.

---

## 🎨 Paso 2: Instalar TailwindCSS

Sigue la guía oficial: [https://tailwindcss.com/docs/guides/angular](https://tailwindcss.com/docs/guides/angular)

Pasos clave:

1. Instalar dependencias:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. Configurar `tailwind.config.js`
3. Agregar las directivas en `styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🔔 Paso 3: Crear la Infraestructura de Toast

### Modelos

```ts
export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  None = 'none'
}

export enum ToastPosition {
  TopRight = 'position-top-right',
  TopLeft = 'position-top-left',
  BottomRight = 'position-bottom-right',
  BottomLeft = 'position-bottom-left',
  Center = 'position-center'
}

export class ToastMessage {
  visible: boolean = false;
  title = '';
  message = '';
  durationInSeconds = 5;
  position: ToastPosition = ToastPosition.TopRight;
  type: ToastType = ToastType.Info;
  startTime?: number;
  constructor(visible: boolean) { this.visible = visible; }
}
```

### Servicio

```ts
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toastMessage = signal<ToastMessage | null>(null);
  toastMessage = computed(() => this._toastMessage());

  show(title: string, message: string, duration: number, type: ToastType, position: ToastPosition) {
    const toast = new ToastMessage(true);
    toast.title = title;
    toast.message = message;
    toast.durationInSeconds = duration;
    toast.type = type;
    toast.position = position;
    toast.startTime = Date.now();

    this._toastMessage.set(toast);
    setTimeout(() => this._toastMessage.set({ ...toast, visible: false }), duration * 1000);
  }
}
```

---

## 🧩 Paso 4: Componente Toast

### Template

Usamos Tailwind para estructura, color e íconos de Material:

```html
@if (toastMessage()?.visible) {
  <div class="fixed z-50 w-96 p-4 bg-white rounded shadow border-l-4"
       [ngClass]="[positionClasses, ...]">

    <div class="flex gap-3">
      <mat-icon>info</mat-icon>
      <div>
        <h3>{{ toastMessage()?.title }}</h3>
        <p>{{ toastMessage()?.message }}</p>
      </div>
    </div>

    <div class="mt-4 h-1 bg-gray-200 rounded">
      <div class="h-full bg-blue-500" [style.width.%]="progress()"></div>
    </div>
  </div>
}
```

### Componente TS

```ts
@Component({ ... })
export class ToastComponent {
  toastService = inject(ToastService);
  toastMessage = this.toastService.toastMessage;
  progress = signal(100);

  get positionClasses(): string {
    switch (this.toastMessage()?.position) {
      case 'position-top-left': return 'top-4 left-4';
      case 'position-bottom-right': return 'bottom-4 right-4';
      case 'position-center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default: return 'top-4 right-4';
    }
  }

  constructor() {
    effect(() => {
      const toast = this.toastMessage();
      if (!toast?.visible || !toast.startTime) return;
      const interval = setInterval(() => {
        const elapsed = Date.now() - toast.startTime!;
        const pct = 100 - (elapsed / (toast.durationInSeconds * 1000)) * 100;
        this.progress.set(Math.max(0, pct));
        if (pct <= 0) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    });
  }

  close() {
    const current = this.toastMessage();
    if (current) this.toastService['_toastMessage'].set({ ...current, visible: false });
  }
}
```

---

## 🧪 Paso 5: Página Principal con Formulario

Creamos un formulario para probar toasts en tiempo real:

```html
<div class="max-w-xl mx-auto p-8 bg-white rounded-xl shadow space-y-6">
  <h1 class="text-2xl font-bold text-slate-800">Toast Playground</h1>

  <!-- Inputs: Tipo, Posición, Título, Mensaje, Duración -->

  <button class="w-full bg-blue-600 text-white py-2 rounded" (click)="showToast()">
    Mostrar Toast
  </button>
</div>
```

---

## 🎁 Resultado

Un sistema completamente funcional, que:

* Se puede reutilizar y escalar
* Usa las mejores prácticas modernas de Angular
* Sirve como ejemplo profesional o de portafolio

---

## 📚 ¿Qué aprendiste aquí?

* Cómo usar `signal()` y `computed()` para manejar estado reactivo sin RxJS
* Cómo aplicar Tailwind para UI dinámica con clases condicionales
* Cómo separar lógica de presentación (servicio vs componente)
* Cómo trabajar con componentes standalone de Angular 20+

---

## ✅ ¿Qué podrías agregar?

* Soporte para múltiples toasts simultáneos
* Animaciones con `@angular/animations` o `Tailwind transitions`
* Queuing de mensajes
* Pausar temporizador al hacer hover

---

¡Listo! Ahora tienes un sistema de notificaciones moderno, profesional y mantenible 🧑‍💻
