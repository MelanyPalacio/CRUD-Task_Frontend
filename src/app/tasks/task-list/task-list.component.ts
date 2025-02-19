import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterStatus = new FormControl('');
  searchTitle = new FormControl('');

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => console.error('Error loading tasks:', error)
    );
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  createTask(): void { 
    window.location.href = '/tasks/new';
  }

  completeTask(task: Task): void {
    task.status = 'Completada';
    this.taskService.updateTask(task.id, task).subscribe(() => {
      this.loadTasks();
    });
  }

  editTask(id: number): void {
    window.location.href = `/tasks/edit/${id}`;
  }
}
