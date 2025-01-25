import plus from "./assets/plus.png";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import TodoListItem from "./components/TodoList/TodoListItem.jsx";
import AddModal from "./components/UI/AddModal";
import EditModal from "./components/UI/EditModal";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    const count = localStorage.getItem("count");
    {
      count === isNaN && localStorage.setItem("count", 0);
    }
  }, []);
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

  //add search function, set status state to searching and filter items with that includes search value
  function handleSearch(event) {
    if (event.target.value === "") {
      setStatus("base");
      return;
    }
    const searched = items.filter((item) =>
      item.title.includes(event.target.value)
    );
    setStatus("searching");
    setSearchItems(searched);
  }

  //add filter function, set status state to filtering and filter items that isChecked

  function handleFilter(isFilter) {
    if (isFilter) {
      const filtered = items.filter((item) => item.isChecked);
      setStatus("filtering");
      setFilteredItems(filtered);
    } else {
      setStatus("base");
    }
  }

  return (
    <main className="p-2 h-[600px] relative flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">TODO LIST</h1>
      <SearchBar onSearch={handleSearch} />
      {items.length > 0 &&
        status === "base" &&
        items.map((item) => (
          <TodoListItem
            onEdit={handleEditModalOpen}
            title={item.title}
            key={item.id}
            id={item.id}
            onDelete={handleDeleteItem}
          />
        ))}
      {status === "searching" &&
        searchItems.map((item) => (
          <TodoListItem
            onEdit={handleEditModalOpen}
            title={item.title}
            key={item.id}
            id={item.id}
            onDelete={handleDeleteItem}
          />
        ))}
      <button
        className="rounded-full bg-[#6C63FF] text-white absolute w-10 h-10 bottom-4 right-4 p-2 "
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
