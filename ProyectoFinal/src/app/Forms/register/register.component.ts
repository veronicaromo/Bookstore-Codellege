import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/Services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Variables
  titleB:string = '';
  authorB:string = '';
  genreB:string = '';
  yearB:number = 0;
  pagesB:number = 0;
  descriptionB:string = '';
  priceB:number = 0;
  unitsB:number = 0;

  constructor(private formBuilder: FormBuilder, private BooksB:BooksService) { 
    
  }

  registerForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    genre: ['', [Validators.required]],
    year: ['', [Validators.required]],
    pages: ['', [Validators.required]],
    description: ['', Validators.required],
    price: ['', [Validators.required]],
    units: ['', [Validators.required]]
  })


  

  ngOnInit(): void {
  }

  submit(){
    if(this.registerForm.valid){
      console.log("Válido");
      console.log(this.registerForm.value);
      this.BooksB.addBook(this.titleB, this.authorB, this.genreB,  this.yearB, this.pagesB, this.descriptionB,this.priceB,this.unitsB);
      alert(`The book ${this.titleB} has been added.`);
      this.limpiar();
    }
    else{
      console.log("Inválido");
    }

  }

  limpiar(){
    this.registerForm.patchValue({
      title: '',
      author: '',
      genre: '',
      year: '',
      pages: '',
      description: '',
      price: '',
      units: ''
    })
  }

  //Get
  get title(){return this.registerForm.get('title')}
  get author(){return this.registerForm.get('author')}
  get genre(){return this.registerForm.get('year')}
  get year(){return this.registerForm.get('pages')}
  get price(){return this.registerForm.get('price')}

  //Agregar
  

}
