import { useState } from "react";
import { IconSearch } from "../../assets/icons";

export function Search() {

  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={showSearch ? 'navSearch show' : 'navSearch'} >
      <div className="nSearchContent">
        <button onClick={()=> setShowSearch(!showSearch)}>
          <IconSearch />
        </button>
        <input type="text" placeholder="Buscar..."/>
      </div>
    </div>
  )
}
