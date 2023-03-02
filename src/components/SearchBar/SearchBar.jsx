import PropTypes from 'prop-types';
import { CiSearch } from "react-icons/ci";
import {
  SearchBox,
  SearchForm,
  Button,
  Label,
  Input,
} from './SearchBar.styled';

export function SearchBar({ onSubmit }) {
  return (
    <SearchBox>
      <SearchForm onSubmit={onSubmit}>
        <Button type="submit">
        <CiSearch size={24} />
          <Label>Search</Label>
        </Button>
        <Input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBox>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

