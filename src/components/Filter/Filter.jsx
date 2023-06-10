import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default function Filter({ appChangeHandler, filter }) {
  const filterChangeHandler = e => {
    const { name, value } = e.currentTarget;
    appChangeHandler(name, value);
  };

  return (
    <label className={css.label}>
      Find contacts by name:
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={filterChangeHandler}
        className={css.input}
        placeholder="Filter by.."
      />
    </label>
  );
}

Filter.propTypes = {
  appChangeHandler: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
