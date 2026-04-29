import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-section-header',
  imports: [ButtonModule],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
})
export class SectionHeader {
  @Input({ required: true }) titleHeader: string = '';
  @Input({ required: true }) description: string = '';
  @Input({ required: true }) icons: string = '';

  goBack() {
    window.history.back();
  }
}
