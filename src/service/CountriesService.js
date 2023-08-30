import axios from "axios";

class CountriesService {

    constructor() {
        this.countriesUrl = `${process.env.REACT_APP_BASE_URL}/api/countries`;
    }

    loadCountries() {
        return axios.get(this.countriesUrl);
    }

}

export default CountriesService;