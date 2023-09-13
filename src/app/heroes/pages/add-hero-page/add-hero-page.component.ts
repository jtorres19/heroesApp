import { Component } from '@angular/core';

@Component({
  selector: 'app-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styleUrls: ['./add-hero-page.component.css']
})
export class AddHeroPageComponent {
 public publishers = [
   {id: 'DC Comics', desc: 'DC - Comics'},
   {id: 'Marvel Comics', desc: 'Marvel - Comics'},
 ];
}
