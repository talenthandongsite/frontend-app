import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ftt-model',
	templateUrl: './ftt-model.component.html',
	styleUrls: ['./ftt-model.component.scss']
})
export class FttModelComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {

	}

	onLoad(obj) {
		setTimeout(() => {
			obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
		}, 3000);
	}
}
