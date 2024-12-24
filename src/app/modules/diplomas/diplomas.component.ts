import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CoursesService } from '../../shared/services/courses.service';
import { Router, NavigationEnd } from '@angular/router';
import { GTMService } from '../../shared/services/gtm.service'; // Import GTMService
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-diplomas',
  templateUrl: './diplomas.component.html',
  styleUrls: ['./diplomas.component.scss'],
})
export class DiplomasComponent implements OnInit {
  coursesService = inject(CoursesService);
  router = inject(Router);
  gtmService = inject(GTMService);

  courses: any[] = [];
  selectedCourseDetails: any = null;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 20,
    navText: [
      '<span class="custom-prev">‹</span>',
      '<span class="custom-next">›</span>',
    ],
    rtl: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getCourses();

    // Listen for navigation events to track GTM events
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.trackNavigation(url);
    });
  }

  // Fetch all courses
  getCourses(): void {
    this.coursesService.getAllCourses('ar').subscribe({
      next: (response) => {
        this.courses = response?.data;
        if (this.courses?.length > 0) this.fetchCourseDetails(this.courses?.[0]?.id);
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
    });
  }

  // Fetch details of the selected course
  fetchCourseDetails(id: number): void {
    this.coursesService.getCoursesById(id, 'ar').subscribe({
      next: (response) => {
        this.selectedCourseDetails = response.data;
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      },
    });
  }

  // Track course click
  onCourseClick(course: any): void {
    this.gtmService.sendGTMEvent('course_select', { courseName: course.name });
  }

  // Track sub-course click
  onSubCourseClick(subCourse: any): void {
    this.gtmService.sendGTMEvent('sub_course_select', { subCourseName: subCourse.name });
  }

  // Track navigation events
  private trackNavigation(url: string): void {
    this.gtmService.sendGTMEvent('navigation', { url });
  }
}
