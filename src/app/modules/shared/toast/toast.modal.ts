export class ToastModal{

    public visible:boolean;
    public message?: string;
    public type?: ToastType;

    constructor(visible: boolean){
        this.visible = visible;
    }

}

export enum ToastType{
    success = 'toast-success',
    error = 'toast-error'
}