import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    // Retrieve stashed trip code
    const tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn't find the trip code!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('Trip code:', tripCode);

    // Initialize the form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Fetch trip details
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        if (!value || value.length === 0) {
          this.message = 'No Trip Retrieved!';
        } else {
          this.trip = value[0];
          this.editForm.patchValue(this.trip);
          this.message = `Trip: ${tripCode} retrieved successfully`;
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error fetching trip:', error);
      }
    });
  }

  // Submit the form
  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: any) => {
          console.log('Trip updated:', value);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error updating trip:', error);
        }
      });
    }
  }

  // Quick access to form fields
  get f() {
    return this.editForm.controls;
  }
}
