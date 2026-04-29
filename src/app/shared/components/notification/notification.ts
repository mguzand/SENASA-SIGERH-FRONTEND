import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [RouterLink],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  data: any;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.data = this.config.data;
  }

  closeModal(): void {
    this.ref.close();
  }
}
