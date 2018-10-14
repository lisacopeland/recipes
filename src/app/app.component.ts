import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * App Component (Root) of the Recipes app. Holds the Header, footer, and router outlet
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Recipe App!';
  currentMenuItem = 'Recipes';

  constructor(private route: ActivatedRoute, private router: Router) {}

  /**
   * Initialize firebase
   *
   * @memberof AppComponent
   */
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBey6Rm-bKr890lWBy_BRw-pbD7fjOw4Dg',
      authDomain: 'recipe-book-98480.firebaseapp.com'
    });
  }

  /**
   * Highlights the current menu item and navigates to that item
   *
   * @param {{ menuItem: string }} eventData
   * @memberof AppComponent
   */
  onMenuClicked(eventData: { menuItem: string }) {
    console.log('Menu item clicked - ' + eventData.menuItem);
    this.currentMenuItem = eventData.menuItem;
    if (this.currentMenuItem === 'Recipes') {
      this.router.navigate(['recipes'], {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
      });
    } else {
      this.router.navigate(['shopping-list'], {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
      });
    }
  }
}
