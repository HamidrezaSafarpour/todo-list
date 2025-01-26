import { createContext, useEffect, useState } from "react";

const ItemsStateValueContext = createContext({
  items: [],
  searchItems: [],
  filteredItems: [],
  status: "",
  filterText: "",
  setItems: () => {},
  setSearchItems: () => {},
  setFilteredItems: () => {},
  setStatus: () => {},
  setFilterText: () => {},
});

export function ItemsStateValueContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [status, setStatus] = useState("base");
  const [filterText, setFilterText] = useState("ALL");

  useEffect(() => {
    console.log({ items });
  }, [items]);

  useEffect(() => {
    let itemsFromLocalStorage = [];
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));

    if (itemsFromLocalStorage) {
      setItems(itemsFromLocalStorage);
    }
  }, []);

  function handleSetItems(value) {
    setItems(value);
  }
  function handleSearchItems(value) {
    setSearchItems(value);
  }
  function handleFilteredItems(value) {
    setFilteredItems(value);
  }
  function handleStatus(value) {
    setStatus(value);
  }
  function handleFilterTextChange(text) {
    setFilterText(text);
  }

  const ItemsStateValueCtx = {
    items,
    searchItems,
    filteredItems,
    status,
    filterText,
    setItems: handleSetItems,
    setSearchItems: handleSearchItems,
    setFilteredItems: handleFilteredItems,
    setStatus: handleStatus,
    setFilterText: handleFilterTextChange,
  };

  return (
    <ItemsStateValueContext.Provider value={ItemsStateValueCtx}>
      {children}
    </ItemsStateValueContext.Provider>
  );
}

export default ItemsStateValueContext;
