import {Component} from "@angular/core";
import {LatestRace} from "./myClasses";
import {RacesService} from "./races.service";

@Component({
    moduleId: module.id,
    selector: 'sessions',
    templateUrl: 'latestRace.component.html',
    styleUrls: [],
    providers: [RacesService]
})
export class LatestRaceComponent {
    results: LatestRace[];

    constructor(private resultsService:RacesService) {
        this.resultsService.getLatestRace().subscribe(latestRace => {
            this.results = latestRace;
        });
    }
}


