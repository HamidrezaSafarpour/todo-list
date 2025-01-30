import { createContext, useEffect, useState } from "react";

const ItemsStateValueContext = createContext({
  items: [],
  searchItems: {},
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
    console.log({ searchItems, items, filterText });
  }, [searchItems, items, filterText]);

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
        return item.title.includes(searchItems.searchValue);
      });
      setSearchItems({ items: searched, searchValue: searchItems.searchValue });
    }
  }, [items]);

  const ItemsStateValueCtx = {
    items,
    searchItems,
    filterText,
    setItems,
    setSearchItems,
    setFilterText,
  };

  return (
    <ItemsStateValueContext.Provider value={ItemsStateValueCtx}>
      {children}
    </ItemsStateValueContext.Provider>
  );
}

export default ItemsStateValueContext;
