import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Credentials } from '../models/credentials';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public formError: string = '';
    submitted = false;
    
    public credentials: Credentials = {
        email: '',
        password: ''
    };

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {}

    public onLoginSubmit(): void {
        this.formError = '';
        if (!this.credentials.email || !this.credentials.password) {
            this.formError = 'All fields are required, please try again';
            return;
        } 
        this.doLogin();
    }

    private doLogin(): void {
        this.authenticationService.login(this.credentials)
            .then(() => this.router.navigateByUrl('list-trips'))
            .catch((message) => this.formError = message);
    }
}