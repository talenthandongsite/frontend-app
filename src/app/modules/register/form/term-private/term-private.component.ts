import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-term-private',
	templateUrl: './term-private.component.html',
	styleUrls: ['./term-private.component.scss']
})
export class TermPrivateComponent implements OnInit {

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
