import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Recipe App!';
  currentMenuItem = 'Recipes';

constructor(  private route: ActivatedRoute,
  			  private router: Router) { }

  onMenuClicked(eventData: {menuItem: string}) {
  	console.log("Menu item clicked - "+eventData.menuItem);
  	this.currentMenuItem = eventData.menuItem;
  	if (this.currentMenuItem === 'Recipes') {
  		this.router.navigate(['recipes'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  	} else { 
  		this.router.navigate(['shopping-list'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  	}
  	
  }
}
