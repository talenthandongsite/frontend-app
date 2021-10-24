import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-term-scrap',
	templateUrl: './term-scrap.component.html',
	styleUrls: ['./term-scrap.component.scss']
})
export class TermScrapComponent implements OnInit {
	
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
