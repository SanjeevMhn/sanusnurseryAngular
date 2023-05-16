import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';

interface Message{
  date: string | undefined,
  name: string,
  contact: number,
  email: string,
  message: string,
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  errorFtName: boolean = false;
  errorLtName: boolean = false;
  errorPhone: boolean = false;
  errorEmail: boolean = false;
  errorMessage: boolean = false;

  errorFtNameMsg: string = '';
  errorLtNameMsg: string = '';
  errorPhoneMsg: string = '';
  errorEmailMsg: string = '';
  errorMessageMsg: string = '';

  messageDate?: string;

  userMessageForm!: FormGroup;

  // userMessage?: Message;

  constructor(private fb: FormBuilder, private toastService: ToastService) { }

  loginImg: string = "./assets/images/contact.jpg";

  ngOnInit(): void {
    let date = new Date();
    this.messageDate = `${(1 + date.getMonth()).toString()}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
    this.userMessageForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(/[\S]/g)]],
      last_name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(/[\S]/g)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), Validators.pattern(/[\S]/g)]]
    })
  }

  markInvalidField(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    })
  }

  sendMessage() {
    this.errorFtName = false;
    this.errorLtName = false;
    this.errorPhone = false;
    this.errorEmail = false;
    this.errorMessage = false;

    if (this.userMessageForm.invalid) {

      //mark invalid fields

      //user first name validation
      if (this.userMessageForm.controls['first_name'].errors?.['required']) {
        this.errorFtName = true;
        this.errorFtNameMsg = "Please enter your first name";
      }

      if (this.userMessageForm.controls['first_name'].errors?.['minlength']) {
        this.errorFtName = true;
        this.errorFtNameMsg = "Invalid first name, should contain atleast 3 characters";
      }

      if (this.userMessageForm.controls['first_name'].errors?.['maxlength']) {
        this.errorFtName = true;
        this.errorFtNameMsg = "Invalid first name, should not contain more than 50 characters";
      }

      if (this.userMessageForm.controls['first_name'].errors?.['pattern']) {
        this.errorFtName = true;
        this.errorFtNameMsg = "Cannot contain only whitespaces";
      }

      //user last name validation
      if (this.userMessageForm.controls['last_name'].errors?.['required']) {
        this.errorLtName = true;
        this.errorLtNameMsg = "Please enter your last name";
      }

      if (this.userMessageForm.controls['last_name'].errors?.['minlength']) {
        this.errorLtName = true;
        this.errorLtNameMsg = "Invalid last name, should contain atleast 3 characters";
      }

      if (this.userMessageForm.controls['last_name'].errors?.['maxlength']) {
        this.errorLtName = true;
        this.errorLtNameMsg = "Invalid last name, should not contain more than 50 characters";
      }

      if (this.userMessageForm.controls['last_name'].errors?.['pattern']) {
        this.errorLtName = true;
        this.errorLtNameMsg = "Cannot contain only whitespaces";
      }

      //user phone number validation
      if (this.userMessageForm.controls['phone'].errors?.['required']) {
        this.errorPhone = true;
        this.errorPhoneMsg = "Please enter your contact number";
      }

      if (this.userMessageForm.controls['phone'].errors?.['pattern']) {
        this.errorPhone = true;
        this.errorPhoneMsg = "Invalid phone number";
      }

      //user email validation
      if (this.userMessageForm.controls['email'].errors?.['required']) {
        this.errorEmail = true;
        this.errorEmailMsg = "Please enter your email";
      }

      if (this.userMessageForm.controls['email'].errors?.['email']) {
        this.errorEmail = true;
        this.errorEmailMsg = "Invalid email";
      }

      //user message validation
      if (this.userMessageForm.controls['message'].errors?.['required']) {
        this.errorMessage = true;
        this.errorMessageMsg = "Please enter your message";
      }

      if (this.userMessageForm.controls['message'].errors?.['minlength']) {
        this.errorMessage = true;
        this.errorMessageMsg = "Must contain atleast 10 characters";
      }

      if (this.userMessageForm.controls['message'].errors?.['maxlength']) {
        this.errorMessage = true;
        this.errorMessageMsg = "Too many characters in the message";
      }

      if (this.userMessageForm.controls['message'].errors?.['pattern']) {
        this.errorMessage = true;
        this.errorMessageMsg = "Cannot contain only white spaces";
      }

      this.markInvalidField(this.userMessageForm);
      this.toastService.show("Error while entering form details", ToastType.error);
    }else{
      let val = this.userMessageForm.value;
      let username = `${val.first_name} ${val.last_name}`;
      let userMessage:Message = {
        date: this.messageDate,
        name: username,
        contact: val.phone,
        email: val.email,
        message: val.message
      }

      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let url = 'https://script.google.com/macros/s/AKfycbzuGczsGEdYbTL0Co0hjVHuL-_kJLX01vDKO2TzHrgiefrH5RE2PxewtwHn7iNGVq0H/exec';

      fetch(url,{
        method: "POST",
        mode: "no-cors",
        headers: headers,
        body: JSON.stringify(userMessage)
      }).then(res => { 
        return res.text()
      }).then(data => {

        this.toastService.show("Your message has been sent!!", ToastType.success);
        this.userMessageForm.reset();
      }).catch(error => console.error(error));

    }
  }
}
