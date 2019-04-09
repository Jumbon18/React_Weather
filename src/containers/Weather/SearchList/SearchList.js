import  React from 'react';
import './SearchList.css';
import SearchItem from './SearchItem/SearchItem';
import {connect} from "react-redux";
import Loader from "../../../components/UI/Loader/Loader";

const SearchList = props =>{
  console.log("LIST",props);
    return(
              <ul className={'SearchList'}>
                {props.searchLoader || !props.searchList ? <Loader/>
                    :
                props.searchList.length > 0 ?
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
function mapDispatchToProps(dispatch) {
  return{

  }
}
function mapStateToProp(state) {
  return{
    searchLoader:state.weather.searchLoader,
    searchList:state.weather.searchList
  }
}
export default connect(mapStateToProp,mapDispatchToProps)(SearchList);
