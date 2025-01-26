import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { motion } from "framer-motion";
import TodoList from "./components/TodoList/TodoList.jsx";
import Modal from "./components/UI/Modal/Modal.jsx";
import AddBtn from "./components/AddBtn.jsx";
import { ModalContextProvider } from "./store/ModalContext.jsx";
import { ItemsStateValueContextProvider } from "./store/ItemsStateValueContext.jsx";

function App() {
  return (
    <ItemsStateValueContextProvider>
      <ModalContextProvider>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-2 min-h-[600px] relative flex flex-col items-center pb-16 dark:bg-[#252525]"
        >
          <h1 className="text-2xl font-bold mb-4 dark:text-[#F7F7F7]">
            TODO LIST
          </h1>
          <SearchBar />
          <TodoList />
          <AddBtn />
          <Modal />
        </motion.main>
      </ModalContextProvider>
    </ItemsStateValueContextProvider>
  );
}

export default App;
