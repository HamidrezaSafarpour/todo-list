import { createContext, useEffect, useState } from "react";

const ItemsStateValueContext = createContext({
  items: [],
  searchItems: {
    searchValue: "",
    items: [],
  },
  filterText: "",
  setItems: () => {},
  setSearchItems: () => {},
  setFilterText: () => {},
});

export function ItemsStateValueContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState({
    items: [],
    searchValue: "",
  });
  const [filterText, setFilterText] = useState("ALL");

  useEffect(() => {
    console.log({ items });
  }, [items]);
  useEffect(() => {
    console.log({ searchItems });
  }, [searchItems.items]);

  useEffect(() => {
    let itemsFromLocalStorage = [];
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));

    if (itemsFromLocalStorage) {
      setSearchItems((prev) => ({ ...prev, items: itemsFromLocalStorage }));
      setItems(itemsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (searchItems.searchValue === "") {
      setSearchItems((prev) => ({ ...prev, items: items }));
    } else {
      const searched = items.filter((item) => {
        item.title.includes(searchItems.searchValue);
      });
      setSearchItems({ items: searched, value: searchItems.searchValue });
    }
  }, [items]);

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
    filterText,
    setItems: handleSetItems,
    setSearchItems: handleSearchItems,
    setFilterText: handleFilterTextChange,
  };

  return (
    <ItemsStateValueContext.Provider value={ItemsStateValueCtx}>
      {children}
    </ItemsStateValueContext.Provider>
  );
}

export default ItemsStateValueContext;
