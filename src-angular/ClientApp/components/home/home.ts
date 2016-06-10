import * as ng from '@angular/core';
import { ServiceWorkerService } from '../../services/service-worker.service';

@ng.Component({
  selector: 'home',
  template: require('./home.html')
})
export class Home implements ng.OnInit {
    constructor(
        private serviceWorkerService: ServiceWorkerService
    ) {
    }



    ngOnInit() {
        this.serviceWorkerService.register();
    }
}
