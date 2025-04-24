import { Component , effect, inject, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent {
  pet: any = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    
    effect(() => {
      const petId = this.route.snapshot.paramMap.get('id'); 

      if (petId) {
        this.isLoading = true;
        this.http.get(`https://pets-react-query-backend.eapi.joincoded.com/pets/${petId}`)
          .subscribe({
            next: (pet) => {
              this.pet = pet; 
              this.isLoading = false; 
            },
            error: () => {
              this.errorMessage = 'Error fetching pet details!';
              this.isLoading = false; 
              this.router.navigate(['/pets']); 
            },
          });
      } else {
        this.errorMessage = 'Pet ID not found in the URL'; 
        this.isLoading = false;
        this.router.navigate(['/pets']); 
      }
    });
  }
}



