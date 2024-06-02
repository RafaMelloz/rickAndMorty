import { Component, inject } from '@angular/core';
import { RickApiService } from '../../service/rickapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],

})

export class PaginationComponent  {
  public rickApiService = inject(RickApiService); // Alterado para público

  onNextPage() {
    this.rickApiService.setPage(this.rickApiService.page + 1);
  }

  onPreviousPage() {
    if (this.rickApiService.page > 1) {
      this.rickApiService.setPage(this.rickApiService.page - 1);
    }
  }
}
