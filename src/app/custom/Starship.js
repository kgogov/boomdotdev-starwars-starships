export default class Starship {
    constructor(consumables, passengers) {
        this._consumables = this.parseConsumables(consumables);
        this._passengers = this.parsePassengers(passengers);
    }

    set consumables(newConsumables) {
        this._consumables = newConsumables;
    }

    set passengers(newPassengers) {
        this._passengers = newPassengers;
    }

    get maxDaysInSpace() {
        return this._consumables / this._passengers;
    }

    parseConsumables(consumables) {
        let result = null;

        const data = consumables.split(' ');

        if (data[1] === 'years' || data[1] === 'year') result = data[0] * 365;
        if (data[1] === 'months' || data[1] === 'month') result = data[0] * 30;
        if (data[1] === 'weeks' || data[1] === 'week') result = data[0] * 7;
        if (data[1] === 'days' || data[1] === 'day') result = data[0] * 1;

        return result;
    }

    parsePassengers(passengers) {
        return parseInt(passengers.replace(/,/g, ''));
    }
}