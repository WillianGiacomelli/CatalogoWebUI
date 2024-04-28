import { AuthenticationService } from './../../../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { User } from '../../../../../model/user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;
  protected isLoadingResults: boolean = false;
  protected dataSource!: User;
  public isCreatingAccountRoute: boolean = false;

  constructor(
    private authLogin: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const currentRoute = this.route.snapshot.routeConfig!.path;
    if (currentRoute === 'login/create') {
      this.isCreatingAccountRoute = true;
      this.loginForm = this.formBuilder.group({
        email: [
          '',
          Validators.compose([Validators.email, Validators.required]),
        ],
        password: [
          '',
          Validators.compose([Validators.minLength(6), Validators.required]),
        ],
        confirmPassword: [
          '',
          Validators.compose([Validators.minLength(6), Validators.required]),
        ],
      });
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  public verifyPasswords(): void {
    const passwordsAreTheSame =
      this.loginForm.get('password')!.value ===
      this.loginForm.get('confirmPassword')!.value;
    if (!passwordsAreTheSame) {
      this.loginForm
        .get('confirmPassword')
        ?.setErrors({ passwordConfirmIsNotTheSame: true });
      return;
    }
    this.loginForm
      .get('passwordConfirm')
      ?.setErrors({ passwordConfirmIsNotTheSame: false });
  }

  protected handleLogin(e: any): void {
    e.preventDefault();
    this.isLoadingResults = true;
    this.authLogin.login(this.loginForm.value).subscribe(
      (user: User) => {
        this.dataSource = user;
        localStorage.setItem('token', this.dataSource.token!);
        this.isLoadingResults = false;
        this.router.navigate(['categorie']);
      },
      (err) => {
        this.isLoadingResults = false;
      }
    );
  }

  protected handleCreate(e: any): void {
    e.preventDefault();
    this.authLogin.create(this.loginForm.value).subscribe(
      (user: User) => {
        this.dataSource = user;
        localStorage.setItem('token', this.dataSource.token!);
        this.isLoadingResults = false;
        this.router.navigate(['categorie']);
      },
      (err) => {
        this.isLoadingResults = false;
      }
    );
  }
}
