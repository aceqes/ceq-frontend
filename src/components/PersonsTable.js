import {useEffect, useState} from "react";

function PersonsTable({personslist, errMessage, onEditPerson, onDeletePerson}) {

    const [persons, setPersons] = useState([]);
    // const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setPersons(personslist);
    }, [personslist]);

    function editPerson(person) {
        onEditPerson(person);
    }

    function deletePerson(person) {
        onDeletePerson(person);
    }

    return (
        <table className="persons-table">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Date of birth</th>
                    <th>Country</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {persons.map(person =>
                    <tr key={person.id}>
                        <td>{person.first_name}</td>
                        <td>{person.last_name}</td>
                        <td>{person.date_of_birth}</td>
                        <td>{person.country != null ? person.country.name : ''}</td>
                        <td><a href="#" onClick={() => editPerson(person)}>Edit</a></td>
                        <td><a href="#" onClick={() => deletePerson(person)}>Delete</a></td>
                    </tr>
                )}
                {errMessage && <tr><td colSpan={6} className="error-message">{errMessage}</td></tr>}
                {(persons == null || persons.length == 0)  && <tr><td colSpan={6} className="warning-message">No persons found. Try changing your criteria</td></tr>}
            </tbody>
        </table>
    );
}

export default PersonsTable;