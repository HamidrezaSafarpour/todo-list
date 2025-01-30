import { createContext, useEffect, useState } from "react";

const ItemsStateValueContext = createContext({
  items: [],
  searchItems: {},
  setItems: () => {},
  setSearchItems: () => {},
});

export function ItemsStateValueContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState({
    items: [],
    searchValue: "",
    status: "All",
  });

  useEffect(() => {
    console.log({ searchItems });
  }, [searchItems, items]);

  useEffect(() => {
    let itemsFromLocalStorage = [];
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));

    if (itemsFromLocalStorage) {
      setSearchItems((prev) => ({ ...prev, items: itemsFromLocalStorage }));
      setItems(itemsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    setSearchItems(({ searchValue, status }) => ({
      searchValue,
      items: items.filter(({ title, isChecked }) =>
        status === "All"
          ? title.includes(searchValue)
          : status === "Complete"
          ? isChecked && title.includes(searchValue)
          : !isChecked && title.includes(searchValue)
      ),
      status,
    }));
  }, [items]);

  const ItemsStateValueCtx = {
    items,
    searchItems,
    setItems,
    setSearchItems,
  };

  return (
    <ItemsStateValueContext.Provider value={ItemsStateValueCtx}>
      {children}
    </ItemsStateValueContext.Provider>
  );
}

export default ItemsStateValueContext;
