import { Fragment, useContext } from "react";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";
import TodoListItem from "./TodoListItem";
import emptyLight from "../../assets/empty-light.png";
import emptyDark from "../../assets/empty-dark.png";
import { motion } from "framer-motion";

export default function TodoList() {
  const { items, searchItems, filteredItems, status, dark } = useContext(
    ItemsStateValueContext
  );

  return (
    <>
      {items.length > 0 ? (
        status === "base" &&
        items.map((item) => (
          <Fragment key={item.id}>
            <TodoListItem
              title={item.title.toUpperCase()}
              key={item.id}
              id={item.id}
              isChecked={item.isChecked}
            />
            {item.id !== items[items.length - 1].id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-0.5 w-[calc(100%_-_40px)] bg-[#b2aeff] rounded-md m-2"
              ></motion.div>
            )}
          </Fragment>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="m-10"
        >
          <img src={dark ? emptyDark : emptyLight} />
          <span className="text-[#252525] dark:text-[#F7F7F7]">Empty...</span>
        </motion.div>
      )}
      {status === "searching" &&
        searchItems.map((item) => (
          <Fragment key={item.id}>
            <TodoListItem
              title={item.title.toUpperCase()}
              key={item.id}
              id={item.id}
              isChecked={item.isChecked}
            />
            {item.id !== searchItems[searchItems.length - 1].id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-0.5 w-[calc(100%_-_40px)] bg-[#b2aeff] rounded-md m-2"
              ></motion.div>
            )}
          </Fragment>
        ))}
      {(status === "filtering" || status === "progressing") &&
        filteredItems.map((item) => (
          <Fragment key={item.id}>
            <TodoListItem
              title={item.title.toUpperCase()}
              key={item.id}
              id={item.id}
              isChecked={item.isChecked}
            />
            {item.id !== filteredItems[filteredItems.length - 1].id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-0.5 w-[calc(100%_-_40px)] bg-[#b2aeff] rounded-md m-2"
              ></motion.div>
            )}
          </Fragment>
        ))}
    </>
  );
}
