import { createSignal, createResource } from "solid-js";
import { createMutable, createStore } from 'solid-js/store';
import { Product } from "./product";

class Cart {
  public products: Product[] = []
  addProduct(product: Product) {
    this.products.push(product);
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  }
  clear() {
    this.products = [];
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  }
  public get count() {
    return this.products.length;
  }
}
export const [state, setState] = createStore({ list: [] });

export const cart = createMutable({
  products: JSON.parse(
    window.localStorage.getItem("cart") ?? "[]"
  ) as Product[],
  get total() {
    return this.products.reduce((total: number, product: Product) => total + product.price, 0);
  },
  get count() {
    return this.products.length;
  },
  addProduct(product: Product) {
    this.products.push(product);
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
  clear() {
    this.products = [];
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
});

export const [search, setSearch] = createSignal("");

export const [products, {mutate, refetch}] = createResource<Product[]>(
  () => fetch("http://fakestoreapi.com/products").then((res) => res.json()),
  {
    initialValue: [],
  }
);
// export const [users, usersController] = createResource<Product[]>(
//   () => fetch("http://localhost:3333/api/users").then((res) => res.json()),
//   {
//     initialValue: [],
//   }
// );
