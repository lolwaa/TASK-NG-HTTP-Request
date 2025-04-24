import { Component, effect, inject, OnInit } from '@angular/core';
import { PetsHeaderComponent } from '../../components/pets-header/pets-header.component';
import { PetsListComponent } from '../../components/pets-list/pets-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [PetsHeaderComponent, PetsListComponent, HttpClientModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css',
})
export class PetsComponent {
  query = '';
  allPets : any[] = [];
  private http = inject(HttpClient);
  

  constructor() {
    effect(() => {
      this.http.get<[]>('https://pets-react-query-backend.eapi.joincoded.com/pets').subscribe((pets) => {
        this.allPets = pets;
      });
    });
  }

  setQuery(query: string) {
    this.query = query;
  }

  get filteredPets() {
    return this.allPets.filter((pet) =>
      pet.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }
}
