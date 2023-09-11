import { BaseModal } from "../../shared/models/base-modal";

export class OrderDetailModal extends BaseModal {

	public title?: string;
	public items?: any;

	constructor(visible: boolean){
		super(visible)
	}
}
