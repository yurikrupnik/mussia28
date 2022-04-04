import { Component, createMemo, createSignal, For } from 'solid-js';
import { products, search } from '../store';
import { useQuery } from '../solid-query/useQuery'
import Form from './form'

const fetcher = (): Promise<any> => {
  return fetch(
    "http://localhost:3333/api/users"
  ).then((res) => res.json());
};

interface User {
  createdAt: string;
  _id: string;
  email: string;
  name: string;
  password: string;
  provider: string;
  role: string;
  tenantId: string;
  updatedAt: string;
}

const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const Login: Component = (props) => {
  const state = useQuery<User[]>("users", fetcher, {
    refetchInterval: 60000,
    enabled: false
  });


  const [d, setD] = createSignal([])
  console.log('products()', products());
  return (
    <div>
      <Form />
Login here
      <ul className="divide-y divide-gray-200">
        {people.map((person) => (
          <li className="py-4 flex">
            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>
      {JSON.stringify(state, null, 2)}
      <For each={state.data}>
        { (product) => (
          <div>
            <div>{product.role}</div>
          </div>
        )}
      </For>
    </div>
  );
};


export default Login;
