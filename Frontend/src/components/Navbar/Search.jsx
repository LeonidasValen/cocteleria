import { IconSearch } from "../../assets/icons";

export function Search() {
  return (
    <div className="navSearch">
      <div className="nSearchContent">
        <button>
          <IconSearch />
        </button>
        <input type="text" placeholder="Buscar..."/>
      </div>
    </div>
  )
}
