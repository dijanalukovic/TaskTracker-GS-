import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { TaskItem } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  newTask: TaskItem = {
    id: 0,
    naslov: '',
    opis: '',
    status: 'U toku',
    datumKreiranja: ''
  };
  editingTask: TaskItem | null = null;
  showForm = false;

  statusOptions = ['U toku', 'Završen', 'Otkazan'];

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('TaskListComponent initialized');
    this.loadTasks();
  }

  loadTasks(): void {
    console.log('Loading tasks from API...');
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        console.log('Tasks loaded:', tasks);
        console.log('Number of tasks:', tasks.length);
        this.tasks = [...tasks]; // Kreiraj novi array
        this.cdr.detectChanges(); // Forsiraj change detection
        console.log('this.tasks after assignment:', this.tasks);
      },
      error: (error) => {
        console.error('Greška pri učitavanju taskova:', error);
        alert('Greška pri učitavanju taskova: ' + error.message);
      }
    });
  }

  showAddForm(): void {
    console.log('showAddForm called');
    this.showForm = true;
    this.editingTask = null;
    this.newTask = {
      id: 0,
      naslov: '',
      opis: '',
      status: 'U toku',
      datumKreiranja: new Date().toISOString()
    };
    console.log('showForm set to:', this.showForm);
  }

  showEditForm(task: TaskItem): void {
    this.showForm = true;
    this.editingTask = { ...task };
    this.newTask = { ...task };
  }

  hideForm(): void {
    this.showForm = false;
    this.editingTask = null;
  }

  saveTask(): void {
    if (!this.newTask.naslov.trim()) {
      alert('Naslov je obavezan!');
      return;
    }

    if (this.editingTask) {
      // Ažuriranje postojećeg taska
      this.taskService.update(this.newTask).subscribe({
        next: () => {
          this.loadTasks();
          this.hideForm();
        },
        error: (error) => {
          console.error('Greška pri ažuriranju taska:', error);
        }
      });
    } else {
      // Dodavanje novog taska - ne šaljemo datumKreiranja jer backend automatski postavlja
      const taskToSend = {
        id: 0,
        naslov: this.newTask.naslov,
        opis: this.newTask.opis,
        status: this.newTask.status
      };
      
      console.log('Dodajem novi task:', taskToSend);
      this.taskService.add(taskToSend as TaskItem).subscribe({
        next: () => {
          this.loadTasks();
          this.hideForm();
        },
        error: (error) => {
          alert('Greška pri dodavanju taska: ' + error.message);
          console.error('Greška pri dodavanju taska:', error);
        }
      });
    }
  }

  deleteTask(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj task?')) {
      this.taskService.delete(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Greška pri brisanju taska:', error);
        }
      });
    }
  }

  updateStatus(task: TaskItem, newStatus: string): void {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.update(updatedTask).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Greška pri ažuriranju statusa:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('sr-RS') + ' ' + date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
  }
}