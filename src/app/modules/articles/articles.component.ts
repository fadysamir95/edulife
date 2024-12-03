import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.services';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  parentMessage: string = 'مقالات';
  articles: any[] = []; // Store fetched articles

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articlesService.getAllArticles('en').subscribe({
      next: (response) => {
        this.articles = response.data;
        console.log('Fetched articles:', this.articles);
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      },
    });
  }
}
