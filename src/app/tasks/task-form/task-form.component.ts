import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  task: any = {};

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['Pendiente', Validators.required],
      dueDate: ['']
    });

    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(Number(taskId)).subscribe((task) => {
        this.task = task;
        this.taskForm.patchValue(task);
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.task.id) {
        this.taskService.updateTask(this.task.id, this.taskForm.value).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
