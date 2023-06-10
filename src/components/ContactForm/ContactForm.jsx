import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './ContactForm.module.css';

export default function ContactForm({ addingNewContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const changeHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        throw new Error('What a fuck?');
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    setName('');
    setNumber('');
    addingNewContact(e);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={css.form}>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
            className={css.input}
            pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={changeHandler}
            className={css.input}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  addingNewContact: PropTypes.func.isRequired,
};
