import { Component, inject, OnInit } from '@angular/core'; 
import { RoutineService } from '../../services/routine.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent implements OnInit {
  routineService = inject(RoutineService);
  router = inject(Router);

  weekDaysOrder: string[] = [
    'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
  ];

  allRoutines: any[] = []; // Almacena lso nombres de rutinas para hacer un select después

  orderedGroupedRoutines: { day: string, tasks: any[] }[] = [];

  activeForm: string | null = null;

  newTask: any = {
    task: '',
    weekDay: '',
    initTime: '',
    endTime: '',
    Description: ''
  };
  //El key son los días de la semana. Para organizar por días
  groupedRoutines: { [key: string]: any[] } = {};

  routineNames: string[] = []; // Almacena los nombres de rutinas para hacer un select después

  ngOnInit(): void {
    this.routineService.seeRoutine().subscribe({
      next: (response) => {
        const routines = response.data;
        console.log('Routines:', routines);
        for (const r of routines) {
          // Si el nombre no está ya en el array, lo añadimos
          if (!this.routineNames.includes(r.name)) {
            this.routineNames.push(r.name);
          }

        this.allRoutines = routines;
        }
        console.log('RoutineName:', this.routineNames);

        // creo un objeto result donde key es el día
        const result: { [key: string]: any[] } = {};
        for (const day of this.weekDaysOrder) {
          result[day] = []; // Inicializa todos los días con arrays vacíos
        }
        
        // Rellenar los días con las tareas reales
        for (const routine of routines) {
          const day = routine.weekDay;
          if (!result[day]) {
            result[day] = [];
          }
  
          // Incluye el nombre de la rutina en la tarea
          result[day].push({
            ...routine,
            routineName: routine.name
          });
        }

        // Ordenar las tareas por hora de inicio dentro de cada día
        for (const day in result) {
          result[day].sort((a, b) => a.initTime.localeCompare(b.initTime));
        }

        // Reordenar los días según el orden de la semana
        const sorted: { [key: string]: any[] } = {};
        
        for (const day of this.weekDaysOrder) {
          if (result[day]) {
            sorted[day] = result[day];
          }
        }

        this.groupedRoutines = sorted;
        //Creo un array que transforma cada dñia en un objeto con el día y las tareas
        this.orderedGroupedRoutines = this.weekDaysOrder
        .filter(day => sorted[day])
        .map(day => ({ day, tasks: sorted[day] }));

        //Creo objeto con los días ordenados
        this.groupedRoutines = sorted;
        this.allRoutines = routines;
      },
      error: (err) => {
        console.error('Error al obtener las rutinas:', err);
      }
    });
  }

  toggleForm(weekDay: string): void {
    // Si el formulario ya está abierto para este día, lo cerramos
    if (this.activeForm === weekDay) {
      this.activeForm = null;
    } else {
      // Si no está abierto, lo abrimos y valores vacíos
      this.activeForm = weekDay;
      this.resetForm();
      // Dejo incluido el día
      this.newTask.weekDay = weekDay;
    }
  }
  //Para limpiar el formulario
  resetForm(): void {
    this.newTask = {
      task: '',
      weekDay: '',
      initTime: '',
      endTime: '',
      Description: '',
      routineName: ''
    };
  }


  addTask(weekDay: string): void {
    //Busco en el array que el nombre del formulario coincida con el del array
    const matchingRoutine = this.allRoutines.find(
      r => r.name === this.newTask.routineName
      
    );
    console.log('this.newTask.name:', this.newTask.routineName);
    console.log('matchingRoutine', matchingRoutine);
    console.log(this.allRoutines);
    if (!matchingRoutine || !matchingRoutine.idRoutine) {
      alert('No se encontró la rutina seleccionada');
      return;
    }

    const taskToSend = {
      ...this.newTask,
      weekDay,
      IdRoutine: matchingRoutine.idRoutine,
    };
    delete taskToSend.routineName; //Elimino el nombre de la rutina

    console.log('taskToSend:', taskToSend);
    //Añado a la BBDD la nueva tarea
    this.routineService.addTask(taskToSend).subscribe({
      next: () => {
        alert('Tarea añadida con éxito');
        this.ngOnInit(); // Recargar datos
        this.activeForm = null;
      },
      error: (err) => {
        console.error('Error al añadir tarea:', err);
        alert('Error al añadir tarea');
      }
    });
  }
  

  goBackButton(): void {
    this.router.navigate(['/profile']);
  }

  createRoutineButton(): void {
    this.router.navigate(['/routine/generate']);
  }

  editingTask: any = null;

startEdit(task: any): void {
  // Creamos una copia del objeto tarea para evitar modificar el original directamente
  this.editingTask = { ...task };
}

cancelEdit(): void {
  this.editingTask = null;
}

saveEdit(): void {
  const taskId = this.editingTask.id_tasks;
  this.routineService.updateTask(taskId, this.editingTask).subscribe({
    next: () => {
      alert('Tarea actualizada con éxito');
      this.editingTask = null;
      this.ngOnInit(); // Refresca las tareas
    },
    error: (err) => {
      console.error('Error al editar la tarea:', err);
      alert('Error al editar la tarea');
    }
  });
}

deleteTask(id: number): void {
  if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;

  this.routineService.deleteTask(id).subscribe({
    next: () => {
      alert('Tarea eliminada con éxito');
      this.ngOnInit(); // Recarga la vista
    },
    error: (err) => {
      console.error('Error al eliminar la tarea:', err);
      alert('Error al eliminar la tarea');
    }
  });
}

}
