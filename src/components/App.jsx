import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './Contacts/Contacts';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addingNewContact = e => {
    const { name, number } = e.currentTarget;
    let isTaken = false;
    for (let contact of contacts) {
      if (contact.name.toLowerCase() === name.value.toLowerCase()) {
        isTaken = true;
        continue;
      }
    }

    if (!isTaken) {
      const contactId = shortid.generate();
      const newContact = {
        id: contactId,
        name: name.value,
        number: number.value,
      };

      setContacts(prevState => [newContact, ...prevState]);
    } else {
      alert(`${name.value} is already in contacts.`);
    }
  };

  const appChangeHandler = (name, value) => {
    setFilter(value);
  };

  const deleteContact = e => {
    const itemToDelete = e.currentTarget.id;
    setContacts(prevState =>
      prevState.filter(contact => contact.name !== itemToDelete)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        fontFamily: 'Roboto',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addingNewContact={addingNewContact} />
      <h2>Contacts</h2>
      <Filter appChangeHandler={appChangeHandler} filter={filter} />
      {contacts.length > 0 ? (
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={deleteContact}
        />
      ) : (
        'Add some contacts'
      )}
    </div>
  );
}
