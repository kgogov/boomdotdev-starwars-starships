import Starship from "./Starship";

export default class StarWarsUniverse {
    constructor() {
        this.starships = [];
    }

    get theBestStarship() {
        if (this.starships.length === 0) return undefined;

        let max = Number.MIN_SAFE_INTEGER;
        let current = 0;

        for (let index = 0; index < this.starships.length; index++) {

            if (this.starships[index].maxDaysInSpace > max) {

                max = this.starships[index].maxDaysInSpace;
                current = index;
            }
        }

        return this.starships[current];
    }

    _validateData(starship) {
        const isConsumablesValid = starship.consumables !== null &&
            starship.consumables !== undefined &&
            starship.consumables !== 'unknown';

        const isPassangersValid = starship.passengers !== null &&
            starship.passengers !== undefined &&
            starship.passengers !== 'n/a' &&
            starship.passengers !== '0';

        return isConsumablesValid && isPassangersValid;
    }

    async _createStarships(data) {
        const starshipsCount = data.count;

        for (let i = 1; i <= starshipsCount; i++) {
            try {
                const starship = await this.fetchAndDecode(`https://swapi.boom.dev/api/starships/${i}/`);

                if (!starship) continue;

                if (this._validateData(starship)) {
                    this.starships.push(new Starship(starship.name, starship.consumables, starship.passengers));
                }

            } catch (error) {

            }
        }
    }

    async fetchAndDecode(url) {

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();

        } catch (error) {

        }
    }

    async _getStarshipCount() {
        return await this.fetchAndDecode('https://swapi.boom.dev/api/starships');
    }

    async init() {
        const starshipCount = await this._getStarshipCount();
        const createStarships = await this._createStarships(starshipCount);
    }
}