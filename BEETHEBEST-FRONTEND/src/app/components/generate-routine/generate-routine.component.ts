import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-routine',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-routine.component.html',
  styleUrl: './generate-routine.component.css'
})
export class GenerateRoutineComponent implements OnInit {

  routineService = inject(RoutineService);
  router = inject(Router);
  form!: FormGroup;
  weekDays: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      week: new FormControl('', Validators.required),
      tareas: new FormArray([])
    });
    this.addTask(); //Para añadir al menos una tarea al formulario
  }

  get tasks(): FormArray {
    return this.form.get('tareas') as FormArray;
  }


  createTaskGroup(): FormGroup {
    return new FormGroup({
      task: new FormControl('', Validators.required),
      weekDay: new FormControl('', Validators.required),
      initTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required)
    });
  }

  addTask(): void {
    this.tasks.push(this.createTaskGroup());
    console.log(this.tasks)
  }


  removeTask (id: number): void {
    this.tasks.removeAt(id);
  }

  onSubmit():void{
    if (this.form.invalid){
      alert('Rellena todos los campos')
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value;
    console.log('Rutina a enviar:', data);
    //Llamo al servicio routine para crear la rutina
    this.routineService.createRoutine(data).subscribe({
      next: (response) => {
        console.log('Rutina creada:', response);
        alert('Rutina creada con éxito');
        this.router.navigate(['/routine']);
      },
      error: (err) => {
        console.error('Error al crear la rutina:', err);
        alert('Error al crear la rutina');
      }
    })
  }

  goBackButton (): void {
    this.router.navigate(['/routine']);
  }
}
