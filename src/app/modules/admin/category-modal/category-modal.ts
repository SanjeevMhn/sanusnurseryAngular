import { BaseModal } from "../../shared/models/base-modal";

export class CategoryModal extends BaseModal {

	public mode:string = 'add';
	public id?:number;

	constructor(visible: boolean){
		super(visible);
	}

	submit(){
		if(this.mode === 'add'){

		}else{

		}
	}

}
