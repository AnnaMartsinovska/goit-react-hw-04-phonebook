import React, { useEffect, useState } from 'react';
import {
  StyledTitle,
  StyledText,
  StyledWrap,
} from './Phonebook/Phonebook.styled';
import ContactForm from './Phonebook/ContactForm';
import { ContactList } from './Phonebook/ContactList';
import { Filter } from './Phonebook/Filter';

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleAddContacts = contact => {
    const copy = contacts.find(item => item.name === contact.name);

    copy
      ? alert(`${contact.name} is already in contacts.`)
      : setContacts([...contacts, contact]);
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteretData = () => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (contacts?.length) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <StyledWrap>
      <StyledTitle>Phonebook</StyledTitle>
      <ContactForm contacts={contacts} onAddContacts={handleAddContacts} />
      <StyledTitle>Contacts</StyledTitle>
      <StyledText>Find contacts by name</StyledText>
      <Filter setFilter={handleChangeFilter} />
      <ContactList filterData={getFilteretData()} onDelete={handleDelete} />
    </StyledWrap>
  );
};

export const App = () => {
  return (
    <div>
      <Phonebook />
    </div>
  );
};
