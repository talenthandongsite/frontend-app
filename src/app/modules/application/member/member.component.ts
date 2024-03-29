import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data/data.service';

@Component({
	selector: 'app-member',
	templateUrl: './member.component.html',
	styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.dataService.listMember().toPromise().then(result => {
			console.log(result);
		});
	}

}
