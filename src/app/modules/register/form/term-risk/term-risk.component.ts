import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-term-risk',
	templateUrl: './term-risk.component.html',
	styleUrls: ['./term-risk.component.scss']
})
export class TermRiskComponent implements OnInit {
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
