import { Component, inject, OnInit } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routine',
  imports: [CommonModule, FormsModule],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent implements OnInit {
  routineService = inject(RoutineService);
  router = inject(Router);

  
  activeForm: string | null = null; // Rutina a la que se está añadiendo la tarea
  newTask: any = {
    task: '',
    weekDay: '',
    initTime: '',
    endTime: '',
    Description: ''
  };

  public taskName: String ='';
  public weekDay: String ='';
  public initTime: String ='';
  public endTime: String ='';
  public description: String ='';
  data: any;
  tasks: any[] = [];
  groupedRoutines: { [key: string]: any } = {};
  
  ngOnInit(): void {
    this.routineService.seeRoutine()
    .subscribe({next: (response) => {
      console.log('Nombre de la rutina:', response.data);
      console.log('Taskname:', response.data[0].name);
      const routines = response.data;
      const result: { [key: string]: any[] } = {};

      for (let i = 0; i < routines.length; i++) {
        const routine = routines[i];
        const name = routine.name
        if (!result[name]) {
          result[name] = [];
        }
        result[name].push(routine);
      }
      console.log('Rutinas agrupadas por nombre:', result);
      this.groupedRoutines = result;
    },
    error: (err) => {
      console.error('Error al obtener el listado de rutinas:', err);
    }});
  }

  groupByName(rutinas: any){
    const resultado: any = {};
    for (let i = 0; i < rutinas.length; i++) {
      const rutina = rutinas[i];
      if (!resultado[rutina]) {
        resultado[rutina] = [];
      }
      resultado[rutina].push(rutina);
    }
    return resultado;
  }

  goBackButton () {
    this.router.navigate(['/profile']);
  }

  createRoutineButton () {
    this.router.navigate(['/routine/generate']);
  }

  toggleForm(routineName: string): void {
    this.activeForm = this.activeForm === routineName ? null : routineName;
    this.resetForm();
  }

  resetForm(): void {
    this.newTask = {
      task: '',
      weekDay: '',
      initTime: '',
      endTime: '',
      Description: ''
    };
  }

  addTask(routineName: string): void {
    const tareas = this.groupedRoutines[routineName];
    const rutina = tareas[0]; // Cualquier tarea contiene los datos de la rutina, incluido su id

    const taskToSend = {
      ...this.newTask,
      IdRoutine: rutina.Routine_id
    };

    console.log('Tarea a enviar:', taskToSend);

    this.routineService.addTask(taskToSend).subscribe({
      next: () => {
        alert('Tarea añadida con éxito');
        this.routineService.seeRoutine(); // Recargar datos
        this.activeForm = null;
      },
      error: (err) => {
        console.error('Error al añadir tarea:', err);
        alert('Error al añadir tarea');
      }
    });
  }

}
