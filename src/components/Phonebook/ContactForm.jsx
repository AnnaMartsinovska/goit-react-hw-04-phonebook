import React, { useState } from 'react';
import {
  StyledForm,
  StyledText,
  StyledInput,
  StyledButton,
} from './Phonebook.styled';
import { nanoid } from 'nanoid';
import propTypes from 'prop-types';

const ContactForm = ({ contacts, onAddContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeInput = e => {
    const { target } = e;
    const { value, name } = target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    if (!name.trim()) {
      return;
    }

    onAddContacts(contact);

    setName('');
    setNumber('');

    e.target.reset();
  };

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <StyledText>Name</StyledText>
      <StyledInput
        onChange={handleChangeInput}
        type="text"
        name="name"
        required
      />
      <StyledText>Number</StyledText>
      <StyledInput
        onChange={handleChangeInput}
        type="tel"
        name="number"
        required
      />
      <StyledButton type="submit">Add contact</StyledButton>
    </StyledForm>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  contacts: propTypes.array.isRequired,
  onAddContacts: propTypes.func.isRequired,
};
