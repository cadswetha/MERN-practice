import { useState } from "react";

const Search = (props) => {
    const baseURL = 'http://localhost:8080/api/customer'
    const [searchInput, setSearchInput] = useState('')
    const onChangeHandler = (e)=>{
        setSearchInput(e.target.value)
    }
    const onClickHandler = async ()=>{
        const path = `${baseURL}/${searchInput}`
        await fetch(path , {
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            props.setDisplayVisible(true);
            props.setSearchResultFn(res);
        })
        .catch(err =>{
            console.log(err);
        });
    }
  return (
    <div>
      <input type="text" value={searchInput} onChange={onChangeHandler}/>
      <button onClick={onClickHandler}>Search</button>
    </div>
  );
}

export default Search;
