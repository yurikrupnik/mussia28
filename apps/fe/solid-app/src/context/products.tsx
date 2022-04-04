
import { createSignal, createContext, useContext, JSXElement, createResource } from 'solid-js';
import { createStore, createMutable } from 'solid-js/store';
import create from 'solid-zustand';
import {} from '../context/products';
import { Product } from '../product';

const CounterContext = createContext();

interface CounterProviderProps {
  count: number;
  children: JSXElement
}

// export const [state, setState] = createStore({ list: [] });

const state = createMutable({ list: [] });

interface BearState {
  bears: number
  increase: () => void
}
interface User {
  createdAt: string;
  email: string;
  name: string;
  password: string;
  provider: string;
  role: string;
  tenantId: string;
  updatedAt: string;
}
interface Users {
  list: User[];
  selected: User | null
  setSelected: (user: User) => any
}

const useStore = create<Users>(set => ({
    list: [],
    selected: null,
    setSelected: (selected: User) => set(() => set({ selected }))
}))

// export const [users, {mutate, refetch}] = createResource<Product[]>(
//   () => fetch("http://localhost:3000/api/users").then((res) => res.json()),
//   {
//     initialValue: [],
//   }
// );

export function CounterProvider(props: CounterProviderProps) {
  // const { data: posts } = useSWR('http://localhost:3333/api/users')
  // const [users, {mutate, refetch}] = createResource<Product[]>(
  //   () => fetch("http://localhost:3333/api/users").then((res) => res.json()),
  //   {
  //     initialValue: [],
  //   }
  // );
  const [count, setCount] = createSignal(props.count || 0)
  const store = {
      state,
      users: useStore(),
    count: [
      count,

      // state,
      {
        increment() {
          setCount(c => c + 1);
        },
        decrement() {
          setCount(c => c - 1);
        }
      }
    ],
      // users: []
    };

  return (
    <CounterContext.Provider value={store}>
      {props.children}
    </CounterContext.Provider>
  );
}

export function useCounter() { return useContext(CounterContext); }
