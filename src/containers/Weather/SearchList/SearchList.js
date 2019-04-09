import  React from 'react';
import './SearchList.css';
import SearchItem from './SearchItem/SearchItem';

const SearchList = props =>{
  console.log("LIST",props);
    return(
    <ul className={'SearchList'}>
        {props.searchList.length > 0 ?
            props.searchList.map((answer,index)=>{
                    return (
                        <SearchItem
                            key={index}
                            onClick={props.clickedSearch}
                            element={answer}
                        >
                            {answer.title}
                        </SearchItem>
                    )
                })
        :
            // TODO: Recreate error handler!!!!!
            <h1 className="Error">NO RESULT</h1>
        }

    </ul>
)};
export default SearchList;
