import {Component} from "@angular/core";
import {raceDetails} from "./myClasses";
import {RacesService} from "./races.service";

@Component({
    moduleId: module.id,
    selector: 'sessions',
    templateUrl: 'races.component.html',
    styleUrls: [],
    providers: [RacesService]
})
export class RacesComponent {
    races: raceDetails[];

    constructor(private racesService:RacesService) {
        this.racesService.getAllRaces().subscribe(racesDetails => {
            this.races = racesDetails;
        });
    }
}