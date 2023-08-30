import {useEffect, useState} from "react";

function Modal({person, countries, onSavePerson, onCloseModal, modalErrorMessage}) {

    const [id, setId] = useState(undefined);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        setPersonModel(person);
    }, [person]);

    function setPersonModel(person) {
        setId(person.id);
        setFirstName(person.first_name);
        setLastName(person.last_name);
        setDateOfBirth(person.date_of_birth);
        setCountry(person.countries_id);
    }

    function changeFirstName(event) {
        setFirstName(event.target.value);
    }

    function changeLastName(event) {
        setLastName(event.target.value);
    }

    function changeDateOfBirth(event) {
        setDateOfBirth(event.target.value);
    }

    function changeCountry(event) {
        setCountry(event.target.value);
    }

    function isSaveButtonDisabled() {
        return !firstName || !lastName || !dateOfBirth || !country;
    }

    function save() {
        const personToSave = {
            id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            countries_id: country,
        }
        onSavePerson(personToSave);
    }

    return (
        <div id="myModal" className="modal">

            <div className="modal-content">
                <span className="close" onClick={onCloseModal}>&times;</span>
                <h2>Edit person</h2>
                {modalErrorMessage && <span className="error-message">{modalErrorMessage}</span>}

                <table>
                    <tbody>
                        <tr>
                            <td>First name:</td>
                            <td><input type="text" name="first_name" value={firstName} onChange={changeFirstName} required={true} maxLength={100} /></td>
                        </tr>
                        <tr>
                            <td>Last name:</td>
                            <td><input type="text" name="last_name" value={lastName} onChange={changeLastName} required={true} maxLength={100} /></td>
                        </tr>
                        <tr>
                            <td>Date of birth:</td>
                            <td><input type="date" name="date_of_birth" value={dateOfBirth} onChange={changeDateOfBirth} required={true} min="1970-01-01" max="2022-12-31" /></td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>
                                <select name="country" value={country} onChange={changeCountry} required={true} >
                                    <option key={0}>Select</option>
                                    {countries ? countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>) : ''}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type={"button"} onClick={save} value="Save" disabled={isSaveButtonDisabled()} /></td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    );

}

export default Modal;