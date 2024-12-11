import { Inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { BROWSER_STORAGE } from '../storage';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

constructor(
  @Inject(BROWSER_STORAGE) private storage: Storage,
  private tripDataService: TripDataService
) { }

public getToken(): string  | null{
  return this.storage.getItem('travlr-token');
}

public saveToken(token: string): void {
  this.storage.setItem('travlr-token', token);
}

public login(credentials: Credentials): Promise<any> {
  return this.tripDataService.login(credentials)
    .then((authResp: AuthResponse) => this.saveToken(authResp.token));
}

public register(user: User): Promise<any> {
  return this.tripDataService.register(user)
.then((authResp: AuthResponse) => this.saveToken(authResp.token));
}

public logout(): void {
  this.storage.removeItem('travlr-token');
}

public isLoggedIn(): boolean {
  const token = this.getToken();
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > (Date.now() / 1000);
  }
  return false;
}

public getCurrentUser(): User | null {  // Add return type to include null
  if (this.isLoggedIn()) {
    const token = this.getToken();
    if (token) {  // Add null check
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
  }
  return null;  // Add explicit return
}
}