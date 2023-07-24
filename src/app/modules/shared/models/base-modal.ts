export class BaseModal {
    public visible: boolean;
    public message?: string;
    constructor(visible: boolean) {
        this.visible = visible;
    }
}

