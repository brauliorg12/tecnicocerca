import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from './services/db.service';
import Swal from 'sweetalert2';
import { find, pull } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('Fading', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 0.6 })),
      transition(':enter', animate('800ms ease-out')),
      transition(':leave', animate('100ms ease-in')),
    ])
  ],
})
export class AppComponent {
  title = 'tecnicocerca';

  public element = false;

  public Form: FormGroup;

  loading = 'ok';
  loadingE = 'ok';
  loadingData = '';
  disponible = false;
  disponibleE = false;
  disponibleData = false;

  tags: string[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private dbservice: DbService
  ) {

    this.Form = this.formBuilder.group({
      number: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      nombre: [''],
      telefono: [''],
      // img: ['', Validators.required],
      img: [''],
      tag: [undefined],

    });
  }


  alert(titles: string, texts: string, icons: any): void {
    Swal.fire({
      title: titles,
      text: texts,
      icon: icons,
      showCancelButton: false
    });
  }

  sendData(): void {
    if ((this.Form.valid) || (this.Form.get('email').valid && this.tags.length >= 1)) {
      this.loadingData = 'loading';
      this.disponibleData = false;

      this.dbservice.createRifa(this.Form.value).toPromise().then((resp: any) => {
        // console.log(resp);

        if (resp.ok) {
          this.Form.reset();
          this.tags = [];
          this.disponibleData = true;
          this.loadingData = 'ok';

          this.alert('¡Reserva Realizada!', 'Envíanos un email a fabianleon8526@gmail.com adjuntando el comprobante de pago para finalizar la reserva de los números, ¡Mucha Suerte!, Te enviamos un email con los números agregados', 'success');
        } else {
          this.disponibleData = false;
          this.loadingData = 'nodisponible';

          if (resp.err) {
            this.alert('¡Ocurrio un error!', 'Intente nuevamente quizás se ocupó uno o más números', 'error');
          } else {
            this.alert('¡Ocurrio un error!', 'Intente nuevamente quizás se ocupó uno o más números', 'error');
          }


        }
      });
    }
  }

}
