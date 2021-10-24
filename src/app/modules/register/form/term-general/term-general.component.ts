import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-term-general',
	templateUrl: './term-general.component.html',
	styleUrls: ['./term-general.component.scss']
})
export class TermGeneralComponent implements OnInit {
	@Output() nextButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>()
	consent: boolean = false;

	constructor() { }

	ngOnInit(): void {
		
	}

	runNextStep () {
		if (this.consent) {
			this.nextButtonClick.emit(true);
		}
	}
}
