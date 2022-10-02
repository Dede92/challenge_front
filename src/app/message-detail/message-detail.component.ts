import { Component, OnInit, Input, createPlatform } from '@angular/core';
import { Message } from '../message';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent implements OnInit {
  @Input() message?: Message;

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.form = this.formBuilder.group(
      {
        content: ['', Validators.required],
        tags: [''],
        icon: [''],
        link: ['', Validators.pattern(urlRegex)],
        deadline: [''],
      },
      {}
    );

    if (!this.isAddMode) {
      this.messageService
        .getMessageById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  private createUser() {
    this.messageService
      .addMessage({
        ...this.form.value,
        tags: this.form.value.tags.trim()
          ? this.form.value.tags
              .trim()
              .split(',')
              .map((tag: string) => tag.trim())
          : [],
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/messages']);
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }

  private updateUser() {
    this.messageService
      .updateMessage(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/messages']);
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }
}
