import { ToastType } from "../models/toast-type.enum";


export const TOAST_TYPE_CONFIG: Record<ToastType, { icon: string; iconColorClass: string; borderColorClass: string }> = {
    [ToastType.Success]: {
        icon: 'check_circle',
        iconColorClass: 'text-green-500',
        borderColorClass: 'border-green-500',
    },
    [ToastType.Error]: {
        icon: 'error',
        iconColorClass: 'text-red-500',
        borderColorClass: 'border-red-500',
    },
    [ToastType.Warning]: {
        icon: 'warning',
        iconColorClass: 'text-yellow-500',
        borderColorClass: 'border-yellow-500',
    },
    [ToastType.Info]: {
        icon: 'info',
        iconColorClass: 'text-blue-500',
        borderColorClass: 'border-blue-500',
    },
    [ToastType.None]: {
        icon: 'notifications',
        iconColorClass: 'text-gray-500',
        borderColorClass: 'border-gray-400',
    },
};
