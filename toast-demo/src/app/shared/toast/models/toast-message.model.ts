import { ToastPosition } from "./toast-position.enum";
import { ToastType } from "./toast-type.enum";


export class ToastMessage {
    public visible: boolean;
    public title: string;
    public message: string;
    public durationInSeconds: number;
    public position: ToastPosition;
    public type: ToastType;
    public startTime?: number;

    constructor(visible: boolean) {
        this.visible = visible;
        this.message = '';
        this.title = '';
        this.durationInSeconds = 5;
        this.position = ToastPosition.Center;
        this.type = ToastType.Info;
    }
}
