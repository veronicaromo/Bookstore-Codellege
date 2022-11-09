import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Forms/register/register.component';
import { AboutComponent } from './Pages/about/about.component';
import { BooksComponent } from './Pages/books/books.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { InicioComponent } from './Pages/inicio/inicio.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'books', component: BooksComponent},
  {path: 'register', component:RegisterComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
