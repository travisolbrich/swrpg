import {Component} from "@angular/core";
import {StandingsService} from "./standings.service";
import {Standings} from "./myClasses";

@Component({
    moduleId: module.id,
    selector: 'driver',
    templateUrl: 'standings.component.html',
    providers: [StandingsService]
})
export class StandingsComponent {
    standings: Standings[];

    constructor(private standingsService:StandingsService) {
        this.standingsService.getCurrentStandings().subscribe(standings => {
            this.standings = standings;
        });
    }
}