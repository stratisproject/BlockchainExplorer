import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfigService } from '@core/services/app-config.service';
import { Log } from '@shared/logger.service';

@Component({
   selector: 'app-menu-bar',
   templateUrl: './menu-bar.component.html',
   styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
   title = 'Stratis Explorer';

   @Input() public searchText = '';
   @Input() public links: { title: string, url: string };

   @Output() public find = new EventEmitter<string>();
   @Output() public sidenavToggle = new EventEmitter();

   constructor(private appConfig: AppConfigService, private log: Log) {
      this.title = `${appConfig.getConfiguration().networkName} Explorer`;
   }

   ngOnInit(): void {
   }

   enterPressed() {
      this.log.info("search for", this.searchText);
      this.find.emit(this.searchText);
   }

   public onToggleSidenav = () => {
      this.sidenavToggle.emit();
   }
}