import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CoursesService } from '../../shared/services/courses.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-diplomas',
  templateUrl: './diplomas.component.html',
  styleUrls: ['./diplomas.component.scss']
})
export class DiplomasComponent implements OnInit {
  coursesService = inject(CoursesService);
  sanitizer = inject(DomSanitizer);

  courses: any[] = [];
  selectedCourseDetails: any = null;
  sanitizedShortDescription: SafeHtml | null = null;


  parentMessage: string = "مسارات تعليمية";

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 20,
    navText: ['<span class="custom-prev">‹</span>', '<span class="custom-next">›</span>'],
    rtl: true,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: true
  };

  ngOnInit(): void {
    this.getCourses();
  }

  // Fetch all courses
  getCourses(): void {
    this.coursesService.getAllCourses('ar').subscribe({
      next: (response) => {
        console.log(response, 'the data')
        this.courses = response.data;
        if (this.courses.length > 0) {
          this.fetchCourseDetails(this.courses[0].id);
        }
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
        console.log(response, 'the selected data')
        this.selectedCourseDetails = response.data[0];
        this.sanitizeShortDescription(); // Sanitize the HTML content

      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      }
    });
  }

  sanitizeShortDescription(): void {
    this.sanitizedShortDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.selectedCourseDetails?.short_description
    );
  }

  // Handle course selection
  onCourseSelect(course: any): void {
    this.fetchCourseDetails(course.id); // Fetch details of the clicked course
  }
}
