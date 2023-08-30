import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import CountriesPieChart from "../components/CountriesPieChart";
import PersonsTable from "../components/PersonsTable";
import PersonsService from "../service/PersonsService";
import CountriesService from "../service/CountriesService";

function Chart() {

    const ERROR_LOADING_PERSONS = 'Error reading data from server. Please check your filter criteria';
    const ERROR_SAVING_PERSON = 'Error saving person. Please check your inputs';

    // consts
    const EMPTY_PERSON = {first_name: '', last_name: '', date_of_birth: '', countries_id: ''};

    const personsService = new PersonsService();
    const countriesService = new CountriesService();

    // state variables
    const [errorMessage, setErrorMessage] = useState('');
    const [persons, setPersons] = useState([]);
    const [countries, setCountries] = useState([]);

    const [from, setFrom] = useState('1970-12-31');
    const [to, setTo] = useState('2022-12-31');

    const [modalOpen, setModalOpen] = useState(false);
    const [modalPerson, setModalPerson] = useState(EMPTY_PERSON);
    const [modalErrorMessage, setModalErrorMessage] = useState('');

    useEffect(() => {
        countriesService
            .loadCountries()
            .then(r => {
                setCountries(r.data);
            });
    }, []);

    useEffect(() => {
        reloadPersons();
    }, [from, to]);

    function reloadPersons() {
        personsService
            .searchPersons(from, to)
            .then(r => {
                setErrorMessage('');
                setPersons(r.data);
            })
            .catch(reason => {
                setPersons([]);
                setErrorMessage(ERROR_LOADING_PERSONS);
            });
    }

    function changeFrom(event) {
        setFrom(event.target.value);
    }

    function changeTo(event) {
        setTo(event.target.value);
    }

    function addPerson() {
        setModalPerson(EMPTY_PERSON);
        setModalOpen(true);
    }

    function editPerson(person) {
        setModalPerson(person);
        setModalOpen(true);
    }

    function deletePerson(person) {
        if (window.confirm(`Do you really want to delete this person? (${person.first_name} ${person.last_name})`)) {
            personsService
                .deletePerson(person)
                .then(r => {
                    setModalErrorMessage('');
                    closeModal();
                    reloadPersons();
                })
                .catch(reason => {
                    setModalErrorMessage(ERROR_SAVING_PERSON);
                });
        }
    }

    function savePerson(person) {
        if (person.id == null) {
            personsService
                .createPerson(person)
                .then(r => {
                    setModalErrorMessage('');
                    closeModal();
                    reloadPersons();
                })
                .catch(reason => {
                    setModalErrorMessage(ERROR_SAVING_PERSON);
                });
        } else {
            personsService
                .updatePerson(person)
                .then(r => {
                    setModalErrorMessage('');
                    closeModal();
                    reloadPersons();
                })
                .catch(reason => {
                    setModalErrorMessage(ERROR_SAVING_PERSON);
                });
        }
    }

    function closeModal() {
        setModalPerson(EMPTY_PERSON);
        setModalOpen(false);
    }

    return (
        <div className="chart-wrapper">
            <div id="filter">
                Date of birth (from):&nbsp;
                <input type="date" name="from" placeholder="From" onChange={changeFrom} value={from} min="1970-01-01" max="2022-12-31" />
                &nbsp;
                Date of birth (to):&nbsp;
                <input type="date" name="to" placeholder="To" onChange={changeTo} value={to} min="1970-01-01" max="2022-12-31" />
            </div>

            <CountriesPieChart personslist={persons} />

            <PersonsTable personslist={persons} errMessage={errorMessage} onEditPerson={editPerson} onDeletePerson={deletePerson} />

            <a href="#" onClick={addPerson}>Add person</a>

            {modalOpen && <Modal person={modalPerson} countries={countries} onSavePerson={savePerson} onCloseModal={closeModal} modalErrorMessage={modalErrorMessage}  />}
        </div>
    );
}

export default Chart;
