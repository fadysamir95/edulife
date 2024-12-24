import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.services';
import { GTMService } from '../../shared/services/gtm.service'; // Import GTMService
import { NotificationService } from '../../shared/services/notification.service'; // Import NotificationService

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  parentMessage: string = 'مقالات';
  articles: any[] = [];
  article: any = null;

  constructor(
    private articlesService: ArticlesService,
    private gtmService: GTMService, // Inject GTMService
    private notificationService: NotificationService // Inject NotificationService
  ) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articlesService.getAllArticles('en').subscribe({
      next: (response) => {
        this.articles = response.data;
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      },
    });
  }

  fetchArticleDetails(slug: string): void {
    this.articlesService.getArticleBySlug(slug, 'ar').subscribe({
      next: (response) => {
        this.article = response.data;
      },
      error: (error) => {
        console.error('Error fetching article details:', error);
      },
    });
  }

  // Track article clicks
  onArticleClick(articleName: string): void {
    this.gtmService.sendGTMEvent('article_click', { articleName });
  }

  // Handle newsletter form submission
  onNewsletterSubmit(event: Event, email: string): void {
    event.preventDefault(); // Prevent default form submission behavior

    if (!email.trim()) {
      this.notificationService.showError('يرجى إدخال البريد الإلكتروني', 'خطأ');
      return;
    }

    this.gtmService.sendGTMEvent('Articles_Subscription', { email });
    this.notificationService.showSuccess('تم الإرسال بنجاح', 'نجاح');
  }
}
