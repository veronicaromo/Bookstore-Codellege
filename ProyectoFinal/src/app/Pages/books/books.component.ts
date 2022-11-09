import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/Services/books.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksCollection:BooksService) { }
  books:any = []; 
  ngOnInit(): void {
    this.booksCollection.getBooks().subscribe((data:any)=>{
      this.books = data.books;
      console.log(this.books);
    });
  }

  delete(id:any){
    let name;
    let response = this.booksCollection.deleteBook(id).subscribe((data:any)=>{
      console.log(data);
    });
    alert("The book has been deleted.");
    window.location.reload();
  }

  
  
}
