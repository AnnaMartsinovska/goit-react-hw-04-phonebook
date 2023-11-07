import React from 'react';
import {
  StyledForm,
  StyledText,
  StyledInput,
  StyledButton,
} from './Phonebook.styled';
import { nanoid } from 'nanoid';
import propTypes from 'prop-types';

class ContactForm extends React.Component {
  static propTypes = {
    contacts: propTypes.array.isRequired,
    onAddContacts: propTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChangeInput = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const { contacts, onAddContacts } = this.props;
    const contact = {
      id: nanoid(),
      name: this.state.name.trim(),
      number: this.state.number.trim(),
    };

    if (!this.state.name.trim()) {
      return;
    }

    onAddContacts(contact);

    this.setState({
      contacts: [contact, ...contacts],
    });

    e.target.reset();
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleOnSubmit}>
        <StyledText>Name</StyledText>
        <StyledInput
          onChange={this.handleChangeInput}
          type="text"
          name="name"
          required
        />
        <StyledText>Number</StyledText>
        <StyledInput
          onChange={this.handleChangeInput}
          type="tel"
          name="number"
          required
        />
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
    );
  }
}

export default ContactForm;
