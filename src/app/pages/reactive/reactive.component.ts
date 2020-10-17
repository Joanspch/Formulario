import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

forma:FormGroup;


  constructor( private fb:FormBuilder,
               private validadores:ValidadoresService) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListener();

  }

  ngOnInit(): void {
  }

  get nombrenoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidonoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get usuarionoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched

  }

  get correonoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return ( pass1 === pass2) ? false:true;
  }

  get distritonoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadnoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

get pasatiempos(){
  return this.forma.get('pasatiempos') as FormArray;
}


  crearFormulario(){
    this.forma = this.fb.group({
      nombre  :['', [Validators.required, Validators.minLength(4)]],
      apellido:['', [Validators.required, this.validadores.noHerrera]],
      usuario :['', , this.validadores.existeUsuario ],
      correo  :['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1   :['', Validators.required],
      pass2   :['', Validators.required],
      direccion: this.fb.group({
        distrito:['',Validators.required],
        ciudad  :['',Validators.required],
      }),
      pasatiempos: this.fb.array([])
    },{
      validators:this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  crearListener(){
    // estado del formulario
    // this.forma.valueChanges.subscribe(valor=>{
    //   console.log(valor);
    // });
    // this.forma.statusChanges.subscribe(status=>
    //   console.log({status}))
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

cargarDataFormulario(){

  this.forma.reset({
  nombre:'joan',
  apellido:'Paredes',
  correo:'joan@hotmail.com',
  pass1:123,
  pass2:123,
  direccion: {
    distrito: 'santa anita',
    ciudad:'Lima'
  }
});
}

agregarPasatiempo(){
  this.pasatiempos.push(this.fb.control('',Validators.required));

}

borrarPasatiempo(i:number){
  this.pasatiempos.removeAt(i);
}

  guardar(){
   console.log(this.forma);
   if( this.forma.invalid ){
  return Object.values( this.forma.controls ).forEach( control => {
     if(control instanceof FormGroup){
     Object.values( control.controls ).forEach( control => control.markAsTouched() );
   }else {
       control.markAsTouched();
     }
     });
  }
  // Posteo de información
  this.forma.reset({
    nombre: 'Sin nombre'
  });
}

}
