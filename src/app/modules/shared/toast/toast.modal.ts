import { BaseModal } from "../models/base-modal";

export class ToastModal extends BaseModal {

    public type?: ToastType;

    constructor(visible: boolean) {
        super(visible);
    }

}

export enum ToastType {
    success = 'toast-success',
    error = 'toast-error'
}