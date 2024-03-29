import React from 'react';
import './Search.css';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
const Search = (props) =>{
    console.log("SEARCH",props);
  return(
      <form type="submit" className="Search">
          <Input
          typeInput={props.type}
          styleInput={props.styleInput}
          value={props.query}
          onChange={props.onChange}
          placeholder={props.placeholder}
          />
          <Button
              typeBtn={props.typeBtn}
              onClick={props.onClick}
          >
              Search!
          </Button>
      </form>
  )

};
export default Search;