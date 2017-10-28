export class apiURL {
    public isDevBuild: boolean = false; //

    public getApiUrl() {
        if (this.isDevBuild) {
            return "http://localhost:3000/api/";
        } else {
            return "http://jordanmalish.com/api/";
        }
    }
}

export class Currency {
    public id: number;
    public sessionId: number;
    public driverId: number;
    public reason: string;
    public currencyAdjustment: number;
    public driverName: string;
    public track: string;
    public startTime: string;
}

export class Driver {
    public driverId: number;
    public driverName: string;
}

export class RaceResult {
    public id: number;
    public sessionId: number;
    public finPos: number;
    public carId: number;
    public car: string;
    public carClassId: number;
    public carClass: string;
    public teamId: number;
    public custId: number;
    public name: string;
    public startPos: number;
    public carNum: number;
    public outId: number;
    public out: string;
    public interval: string;
    public lapsLed: number;
    public qualifyTime: string;
    public averageLapTime: string;
    public fastestLapTime: number;
    public fastLapNum: number;
    public lapsComp: number;
    public inc: number;
    public leaguePoints: number;
    public maxFuelFillPerc: number;
    public weightPenaltyKg: number;
}

export class raceDetails {
    id: number;
    sessionId: string;
    startTime: string;
    Track: string;
    leagueName: string;
    leagueId: string;
    leagueSeason: string;
    leagueSeasonId: string;
}

export class Standings {
    public driverId: number;
    public driverName: string;
    public driverTotal: number;
}

export class LatestRace {
    public finPos: number;
    public carNum: number;
    public driverName: string;
    public startPos: number;
    public interval: string;
    public inc: number;
    public totalFunds: number;
    public raceEarnings: number;
    public driverId: number;
}

export class User {
    public email: string;
    public power: number;
}