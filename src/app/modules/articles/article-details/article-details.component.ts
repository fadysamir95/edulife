import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../../shared/services/articles.services';
import { GTMService } from '../../../shared/services/gtm.service'; // Import GTMService

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  article: any = null;

  private route = inject(ActivatedRoute);
  private articlesService = inject(ArticlesService);
  private gtmService = inject(GTMService); // Inject GTMService

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.fetchArticleDetails(slug);
    }
  }

  fetchArticleDetails(slug: string): void {
    this.articlesService.getArticleBySlug(slug, 'en').subscribe({
      next: (response) => {
        this.article = response.data;

        // Track article view
        this.gtmService.sendGTMEvent('article_view', {
          articleName: this.article.name,
          articleSlug: slug,
        });
      },
      error: (error) => {
        console.error('Error fetching article details:', error);
      },
    });
  }

  // Track image click
  onImageClick(articleName: string): void {
    this.gtmService.sendGTMEvent('article_image_click', { articleName });
  }
}
