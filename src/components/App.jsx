import React from 'react';
import {
  StyledTitle,
  StyledText,
  StyledWrap,
} from './Phonebook/Phonebook.styled';
import ContactForm from './Phonebook/ContactForm';
import { ContactList } from './Phonebook/ContactList';
import { Filter } from './Phonebook/Filter';

class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleAddContacts = contact => {
    const copy = this.state.contacts.find(item => item.name === contact.name);

    copy
      ? alert(`${contact.name} is already in contacts.`)
      : this.setState({
          contacts: [contact, ...this.state.contacts],
        });
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteretData = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(item => item.id !== id),
    }));
  };

  render() {
    return (
      <StyledWrap>
        <StyledTitle>Phonebook</StyledTitle>
        <ContactForm
          contacts={this.state.contacts}
          onAddContacts={this.handleAddContacts}
        />
        <StyledTitle>Contacts</StyledTitle>
        <StyledText>Find contacts by name</StyledText>
        <Filter setFilter={this.handleChangeFilter} />
        <ContactList
          filterData={this.getFilteretData()}
          onDelete={this.handleDelete}
        />
      </StyledWrap>
    );
  }
}

export const App = () => {
  return (
    <div>
      <Phonebook />
    </div>
  );
};
