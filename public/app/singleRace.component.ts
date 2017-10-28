import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RacesService} from "./races.service";
import {RaceResult} from "./myClasses";


@Component({
    moduleId: module.id,
    selector: 'results',
    templateUrl: 'singleRace.component.html',
    providers: [RacesService]

})
export class SingleRaceComponent implements OnInit, OnDestroy {
    raceResults: RaceResult[];
    private sub: any;
    sessionId: number;

    constructor(private route: ActivatedRoute, private racesService: RacesService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.sessionId = +params['sessionId'];
        });

        this.racesService.getOneRace(this.sessionId).subscribe(results => {
            this.raceResults = results;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}