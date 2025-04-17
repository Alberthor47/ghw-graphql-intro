import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class TasksComponent {
  tasks: any[] = [];
  newTask = { title: '', description: '' };

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(): void {
    if (this.newTask.title && this.newTask.description) {
      this.tasksService.createTask(
        this.newTask.title,
        this.newTask.description
      ).subscribe(() => {
        this.newTask = { title: '', description: '' };
        this.loadTasks();
      });
    }
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleTaskCompletion(task: any): void {
    this.tasksService.updateTask(
      task.id,
      task.completed
    ).subscribe(() => {
      this.loadTasks();
    });
  }
}
