import { Component, OnInit, Input, createPlatform } from '@angular/core';
import { Message } from '../message/message';

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
        .subscribe((x) => {
          let deadlineStr = '';
          if (x.deadline) {
            let deadlineDate = new Date(x.deadline);
            const offset = deadlineDate.getTimezoneOffset();
            deadlineDate = new Date(
              deadlineDate.getTime() - offset * 60 * 1000
            );
            deadlineStr = deadlineDate.toISOString().split('T')[0];
          }
          return this.form.patchValue({ ...x, deadline: deadlineStr });
        });
    }
  }

  onSubmit() : void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createMessage();
    } else {
      this.updateMessage();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  private createMessage(): void {
    this.messageService
      .addMessage({
        ...this.form.value,
        tags: this.form.value.tags.trim()
          ? this.form.value.tags
              .trim()
              .split(',')
              .map((tag: string) => tag.trim())
          : [],
        deadline: this.form.value.deadline
          ? new Date(this.form.value.deadline).toISOString()
          : '',
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

  private updateMessage(): void {
    let tagsParsed = [];
    if (Array.isArray(this.form.value.tags)) {
      tagsParsed = this.form.value.tags;
    } else if (this.form.value.tags.trim()) {
      tagsParsed = this.form.value.tags
        .trim()
        .split(',')
        .map((tag: string) => tag.trim());
    }

    this.messageService
      .updateMessage(this.id, {
        ...this.form.value,
        tags: tagsParsed,
        deadline: this.form.value.deadline
          ? new Date(this.form.value.deadline).toISOString()
          : '',
      })
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
