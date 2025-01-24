import plus from "./assets/plus.png";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import TodoListItem from "./components/TodoList/TodoListItem";
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
  const [items, setItems] = useState();
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  // console.log(items);

  function handleUpdateLocalStorage() {
    setUpdateLocalStorage(!updateLocalStorage);
  }

  useEffect(() => {
    const itemsFromLocalStorage = [];
    Object.keys(localStorage).forEach((key) => {
      if (key !== "count") {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          itemsFromLocalStorage.unshift(item);
        } catch (error) {
          console.error(`Error parsing item with key ${key}:`, error);
        }
      }
    });
    setItems(itemsFromLocalStorage);
  }, [updateLocalStorage]);
  function handleAddModalOpen() {
    setIsAddModalOpen(true);
  }
  function handleAddModalClose() {
    setIsAddModalOpen(false);
  }
  function handleEditModalOpen(value, isChecked) {
    setEditModal({
      isOpen: true,
      value: value,
      isChecked: isChecked,
    });
  }

  function handleEditNote(updatedValue) {
    Object.keys(localStorage).map((key) => {
      console.log("test: " + key);

      if (key === editModal.value) {
        const updatedItem = {
          id: Number(key),
          isChecked: editModal.isChecked,
          title: updatedValue,
        };
        try {
          localStorage.setItem(key, JSON.stringify(updatedItem));
        } catch (error) {
          console.error(`Error parsing item with key ${key}:`, error);
        }
      }
    });
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
  // console.log(isAddModalOpen);

  return (
    <main className="p-2 h-[600px] relative flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">TODO LIST</h1>
      <SearchBar />
      {items &&
        items.map((item) => (
          <TodoListItem
            onEdit={handleEditModalOpen}
            title={item.title}
            key={item.id}
          />
        ))}
      <button className="rounded-full bg-[#6C63FF] text-white absolute w-10 h-10 bottom-4 right-4 p-2 ">
        <img src={plus} onClick={handleAddModalOpen} />
      </button>
      {isAddModalOpen && (
        <AddModal
          open={isAddModalOpen}
          onClose={handleAddModalClose}
          onUpdate={handleUpdateLocalStorage}
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
