import { createContext, useEffect, useState } from "react";

const ItemsStateValueContext = createContext({
  dark: false,
  items: [],
  searchItems: [],
  filteredItems: [],
  status: "",
  filterText: "",
  setDark: () => {},
  updateLocalStorageFn: () => {},
  setItems: () => {},
  setSearchItems: () => {},
  setFilteredItems: () => {},
  setStatus: () => {},
  setFilterText: () => {},
});

export function ItemsStateValueContextProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [status, setStatus] = useState("base");
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  const [filterText, setFilterText] = useState("ALL");

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem("dark"));
    setDark(isDark);
  }, []);
  console.log(dark);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function handleUpdateLocalStorage() {
    setUpdateLocalStorage(!updateLocalStorage);
  }

  function handleDarkMode() {
    setDark(!dark);
    localStorage.setItem("dark", JSON.stringify(!dark));
    document.documentElement.classList.toggle("dark");
  }

  useEffect(() => {
    let itemsFromLocalStorage = [];
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));

    if (itemsFromLocalStorage) {
      setItems(itemsFromLocalStorage);
    }
  }, [updateLocalStorage]);

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
    dark,
    items,
    searchItems,
    filteredItems,
    status,
    filterText,
    setDark: handleDarkMode,
    updateLocalStorageFn: handleUpdateLocalStorage,
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
