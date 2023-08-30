import axios from "axios";

class PersonsService {


    constructor() {
        this.personsUrl = `${process.env.REACT_APP_BASE_URL}/api/persons`;
    }

    searchPersons(from, to) {
        return axios.get(`${this.personsUrl}?from=${from}&to=${to}`)
    }

    createPerson(person) {
        return axios.post(this.personsUrl, person);
    }

    updatePerson(person) {
        return axios.put(`${this.personsUrl}/${person.id}`, person);
    }

    deletePerson(person) {
        return axios.delete(`${this.personsUrl}/${person.id}`);
    }

}

export default PersonsService;