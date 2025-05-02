import { Component, inject, OnInit } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routine',
  imports: [CommonModule],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent implements OnInit {
  routineService = inject(RoutineService);
  router = inject(Router);

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

      /*for (let i = 0; i < response.data.length; i++) {
        let arrayRoutines = [];
        const rutina = response.data;
        
        if (rutina[i].idRoutine)
        this.taskName = rutina.tasks[0].taskName;
        this.weekDay = rutina.tasks[0].weekDay;
        this.initTime = rutina.tasks[0].initTime;
        this.endTime = rutina.tasks[0].endTime;
        this.description = rutina.tasks[0].description;
      };
      this.tasks = response.data;
      this.groupedRoutines = this.groupByName(response.data);
      console.log('Grouped Routines:', this.groupedRoutines);*/
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

  goBack () {
    this.router.navigate(['/profile']);
  }

}
