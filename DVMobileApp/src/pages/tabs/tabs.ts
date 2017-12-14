import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SummaryPage } from '../summary/summary';
import { ArchivePage } from '../archive/archive';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = SummaryPage;
    tab3Root: any = ArchivePage;

  constructor() {

  }
}
