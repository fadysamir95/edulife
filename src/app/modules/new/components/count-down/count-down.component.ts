import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.scss'
})
export class CountDownComponent implements OnInit, OnDestroy {
  days: string = '01';
  hours: string = '12';
  minutes: string = '58';
  seconds: string = '50';
  isSticky: boolean = false;
  private originalOffset: number = 0;

  private countdownDate: number;
  private intervalId: any;

  constructor(private el: ElementRef) {
    // Set the target date (can be modified as needed)
    this.countdownDate = this.getTargetTimestamp();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Get the vertical scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Check if we should make the component sticky
    if (!this.originalOffset) {
      this.originalOffset = this.el.nativeElement.offsetTop;
    }

    // Toggle sticky state based on scroll position
    this.isSticky = scrollPosition > this.originalOffset;
  }

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private getTargetTimestamp(): number {
    // Use localStorage to persist the target date across page reloads
    const storedDate = localStorage.getItem('countdownTarget');
    
    if (storedDate) {
      return parseInt(storedDate, 10);
    }

    // If no stored date, create a new target date (e.g., 30 days from now)
    const newTargetDate = new Date();
    newTargetDate.setDate(newTargetDate.getDate() + 50);
    
    localStorage.setItem('countdownTarget', newTargetDate.getTime().toString());
    
    return newTargetDate.getTime();
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.countdownDate - now;

    if (distance < 0) {
      // Countdown finished, reset target date
      localStorage.removeItem('countdownTarget');
      this.countdownDate = this.getTargetTimestamp();
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // Pad with zero if less than 10
    this.days = d.toString().padStart(2, '0');
    this.hours = h.toString().padStart(2, '0');
    this.minutes = m.toString().padStart(2, '0');
    this.seconds = s.toString().padStart(2, '0');
  }


  // Countdown properties
  // targetDate: Date = new Date('2025-03-31T00:00:00'); // Set the target date for the offer
  // days: number = 0;
  // hours: number = 0;
  // minutes: number = 0;
  // seconds: number = 0;

  // // Sticky class flag
  // isSticky: boolean = false;

  // // Available information
  // available: number = 11;
  // registered: number = 29;
  // seats: number = 40;

  // countdownSubscription: any; // To hold the countdown interval

  // constructor() { }

  // ngOnInit(): void {
  //   this.startCountdown();
  // }

  // ngOnDestroy(): void {
  //   if (this.countdownSubscription) {
  //     clearInterval(this.countdownSubscription); // Clean up the interval when the component is destroyed
  //   }
  // }

  // // Start countdown
  // startCountdown() {
  //   this.countdownSubscription = setInterval(() => {
  //     const now = new Date().getTime();
  //     const distance = this.targetDate.getTime() - now;

  //     if (distance <= 0) {
  //       clearInterval(this.countdownSubscription); // Stop the countdown when it reaches 0
  //       this.days = 0;
  //       this.hours = 0;
  //       this.minutes = 0;
  //       this.seconds = 0;
  //     } else {
  //       this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //       this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //       this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //       this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     }
  //   }, 1000);
  // }

  // // Check if the offer container should be sticky based on scroll position
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const offset = window.pageYOffset;
  //   this.isSticky = offset > 200; // Change 200 to the scroll position where you want to trigger the sticky behavior
  // }
}