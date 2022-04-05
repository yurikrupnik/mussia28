import { render } from "solid-js/web";
import { For, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";

// const [store, setStore] = createStore({ todos: [] });

// const addTodo = (text) => {
//   setStore('todos', (todos) => [...todos, { id: ++todoId, text, completed: false }]);
// };
// const toggleTodo = (id) => {
//   setStore('todos', (t) => t.id === id, 'completed', (completed) => !completed);
// };

interface Todo {
  id: number;
  text: string;
  completed: boolean
}

interface Todos {
  todos: Array<Todo>
}

const App = () => {
  let input: any;
  const [store, setStore] = createStore<Todos>({ todos: [] } as Todos)
  let todoId = 0;
  const addTodo = (text:string) => {
    setStore(
      'todos',
      produce((todos) => {
        console.log('todos', todos);
        console.log('todos', typeof todos);
        console.log('length', todos.length);
        if (Array.isArray(todos)) {
        todos.push({ id: ++todoId, text, completed: false });
        }
      }),
    );
  };
  const addTodoa = (text:string) => {
    // setStore("todos", todos => [...todos, { id: ++todoId, text, completed: false }]);
    setStore("todos", (todos) => {
      return todos.concat({ id: ++todoId, text, completed: false } as Todo);
    });
  }
  const toggleTodo = (id: number) => {
    setStore("todos", todo => todo.id === id, "completed", completed => !completed);
  }

  return (
    <>
      <div>
        <input ref={input} />
        <button
          onClick={(e) => {
            if (!input.value.trim()) return;
            addTodo(input.value);
            input.value = "";
          }}
        >
          Add Todo
        </button>
      </div>
      <For each={store.todos}>
        {(todo) => {
          const { id, text } = todo;
          console.log(`Creating ${text}`)
          return <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onchange={[toggleTodo, id]}
            />
            <span
              style={{ "text-decoration": todo.completed ? "line-through" : "none"}}
            >{text}</span>
          </div>
        }}
      </For>
    </>
  );
};

export default App
