import plus from "./assets/plus.png";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import TodoListItem from "./components/TodoList/TodoListItem";
import AddModal from "./components/UI/AddModal";
import EditModal from "./components/UI/EditModal";
import { useEffect, useState } from "react";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    value: "",
  });
  const [items, setItems] = useState([]);
  useEffect(() => {
    Object.keys(localStorage).forEach((key) =>
      setItems((prev) => [...prev, JSON.parse(localStorage.getItem(key))])
    );
  }, [localStorage]);

  function handleAddModalOpen() {
    setIsAddModalOpen(true);
  }
  function handleAddModalClose() {
    setIsAddModalOpen(false);
  }
  function handleEditModalOpen(value) {
    setEditModal({
      isOpen: true,
      value: value,
    });
  }
  function handleEditModalClose() {
    setEditModal({
      isOpen: false,
      value: "",
    });
  }
  console.log(isAddModalOpen);

  return (
    <main className="p-2 h-[600px] relative flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">TODO LIST</h1>
      <SearchBar />
      {items.map((item) => (
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
        <AddModal open={isAddModalOpen} onClose={handleAddModalClose} />
      )}
      {editModal.isOpen && (
        <EditModal
          value={editModal.value}
          open={editModal.isOpen}
          onClose={handleEditModalClose}
        />
      )}
    </main>
  );
}

export default App;
