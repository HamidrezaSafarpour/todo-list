import plus from "./assets/plus.png";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import TodoListItem from "./components/TodoList/TodoListItem.jsx";
import AddModal from "./components/UI/AddModal";
import EditModal from "./components/UI/EditModal";
import { useEffect, useState } from "react";

function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem("dark"));
    if (isDark) {
      setDark(isDark);
    }
  }, []);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    value: "",
    isChecked: false,
  });
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  const [status, setStatus] = useState("base");
  const [filterText, setFilterText] = useState("ALL");

  function handleUpdateLocalStorage() {
    setUpdateLocalStorage(!updateLocalStorage);
  }

  useEffect(() => {
    let itemsFromLocalStorage = [];
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));

    if (itemsFromLocalStorage) {
      setItems(itemsFromLocalStorage);
    }
  }, [updateLocalStorage]);

  function handleDarkMode() {
    setDark(!dark);
    localStorage.setItem("dark", JSON.stringify(!dark));
    document.documentElement.classList.toggle("dark");
  }

  function handleAddModalOpen() {
    setIsAddModalOpen(true);
  }
  function handleAddModalClose() {
    setIsAddModalOpen(false);
  }
  function handleEditModalOpen(value, isChecked, id) {
    setEditModal({
      isOpen: true,
      value: value,
      isChecked: isChecked,
      id: id,
    });
  }

  function handleEditNote(updatedValue) {
    const editedItems = items.map((item) => {
      if (item.id === editModal.id) {
        return { ...item, title: updatedValue };
      }
      return item;
    });

    setItems(editedItems);
    localStorage.setItem("items", JSON.stringify(editedItems));

    handleUpdateLocalStorage();
    handleEditModalClose();
  }

  function handleEditModalClose() {
    setEditModal({
      isOpen: false,
      value: "",
      isChecked: false,
    });
  }

  function handleDeleteItem(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    console.log("updated Items: " + JSON.stringify(updatedItems));

    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    handleUpdateLocalStorage();
  }

  function handleChecked(event, id) {
    const updateChecked = items.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: event.target.checked };
      }
      return item;
    });
    if (status === "filtering") {
      const filtered = updateChecked.filter((item) => item.isChecked);
      setFilteredItems(filtered);
    }
    if (status === "progressing") {
      const filtered = updateChecked.filter((item) => !item.isChecked);
      setFilteredItems(filtered);
    }
    setItems(updateChecked);
    localStorage.setItem("items", JSON.stringify(updateChecked));
    handleUpdateLocalStorage();
  }

  function handleFilterTextChange(text) {
    setFilterText(text);
  }

  function handleSearch(event) {
    if (event.target.value === "") {
      if (filterText === "ALL") {
        setStatus("base");
      } else if (filterText === "Complete") {
        setStatus("filtering");
      } else {
        setStatus("progressing");
      }
      return;
    }
    const searched = items.filter((item) =>
      item.title.includes(event.target.value)
    );
    setStatus("searching");
    setSearchItems(searched);
  }

  function handleFilter(status) {
    if (status === "filtering") {
      const filtered = items.filter((item) => item.isChecked);
      setStatus(status);
      setFilteredItems(filtered);
    } else if (status === "progressing") {
      const filtered = items.filter((item) => !item.isChecked);
      setStatus(status);
      setFilteredItems(filtered);
    } else {
      setStatus("base");
    }
  }

  return (
    <main className="p-2 min-h-[600px] relative flex flex-col items-center pb-16 dark:bg-[#252525]">
      <h1 className="text-2xl font-bold mb-4 dark:text-[#F7F7F7]">TODO LIST</h1>
      <SearchBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        onTextChange={handleFilterTextChange}
        onChangeTheme={handleDarkMode}
        dark={dark}
      />
      {items.length > 0 &&
        status === "base" &&
        items.map((item) => (
          <>
            <TodoListItem
              onEdit={handleEditModalOpen}
              title={item.title.toUpperCase()}
              key={item.id}
              id={item.id}
              onDelete={handleDeleteItem}
              isChecked={item.isChecked}
              onChecked={handleChecked}
            />
            {item.id !== items[items.length - 1].id && (
              <div className="h-0.5 w-[calc(100%_-_40px)] bg-[#b2aeff] rounded-md m-2"></div>
            )}
          </>
        ))}
      {status === "searching" &&
        searchItems.map((item) => (
          <>
            <TodoListItem
              onEdit={handleEditModalOpen}
              title={item.title.toUpperCase()}
              key={item.id}
              id={item.id}
              onDelete={handleDeleteItem}
              isChecked={item.isChecked}
              onChecked={handleChecked}
            />
            {item.id !== searchItems[searchItems.length - 1].id && (
              <div className="h-0.5 w-[calc(100%_-_40px)] bg-[#b2aeff] rounded-md m-2"></div>
            )}
          </>
        ))}
      {(status === "filtering" || status === "progressing") &&
        filteredItems.map((item) => (
          <>
            <TodoListItem
              onEdit={handleEditModalOpen}
              title={item.title.toUpperCase()}
              key={item.id}
              id={item.id}
              onDelete={handleDeleteItem}
              isChecked={item.isChecked}
              onChecked={handleChecked}
            />
            {item.id !== filteredItems[filteredItems.length - 1].id && (
              <div className="h-0.5 w-[calc(100%_-_40px)] bg-[#b2aeff] rounded-md m-2"></div>
            )}
          </>
        ))}
      <button
        className="rounded-full bg-[#6C63FF] text-white absolute w-10 h-10 bottom-4 right-4 p-2 focus:outline-none"
        onClick={handleAddModalOpen}
      >
        <img src={plus} />
      </button>
      {isAddModalOpen && (
        <AddModal
          open={isAddModalOpen}
          onClose={handleAddModalClose}
          onUpdate={handleUpdateLocalStorage}
          items={items}
        />
      )}
      {editModal.isOpen && (
        <EditModal
          value={editModal.value}
          open={editModal.isOpen}
          onClose={handleEditModalClose}
          onApply={handleEditNote}
        />
      )}
    </main>
  );
}

export default App;
