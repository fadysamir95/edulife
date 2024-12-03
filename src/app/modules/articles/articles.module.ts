import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
  {
    path: ':slug',
    component: ArticleDetailsComponent
  },
];

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ArticlesModule {}
