import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Add HttpHeaders
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;

  // Add method to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      this.tripUrl, 
      formData,
      { headers: this.getAuthHeaders() }  // Add auth headers
    );
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripUrl}/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.tripUrl}/${formData.code}`, 
      formData,
      { headers: this.getAuthHeaders() }  // Add auth headers
    );
  }

  public login(credentials: Credentials): Promise<any> {
    return this.makeAuthApiCall('login', credentials);
  }

  public register(user: User): Promise<any> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, payload: Credentials | User): Promise<any> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, payload)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}