import React from "react";
import { Link } from "react-router-dom";

import type { ProductInfo, ProductCategory } from "./api";
import { getProductsList, deleteProducts } from "./api";
import { Header, Main } from "./App";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

type ProductDescriptions = {
  [K in ProductCategory]: (p: ProductInfo) => React.ReactNode;
};

type ListProps = {};
type ListState = {
  error: null | string;
  loading: boolean;
  data: ProductInfo[];
};
export default class List extends React.Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      data: [],
    };
  }

  componentDidMount(): void {
    document.title = "Products List";
    this.fetchProducts();
  }

  fetchProducts = () => {
    getProductsList()
      .then((res) => {
        this.setState({
          loading: false,
          data: res.sort((a, b) => b.id - a.id),
        });
      })
      .catch((err: Error) => {
        this.setState({
          loading: false,
          error: "Failed to load",
        });
        console.error(err);
      });
  };

  handleDelete = () => {
    let deleteIds: number[] = [];

    document.querySelectorAll(".delete-checkbox").forEach((el: Element) => {
      if (el instanceof HTMLInputElement && el.checked) {
        deleteIds.push(Number(el.value));
      }
    });

    if (deleteIds.length < 1) return;

    deleteProducts(deleteIds)
      .then(() =>
        this.setState((prev) => ({
          data: prev.data.filter((p) => !deleteIds.includes(p.id)),
        }))
      )
      .catch((err) => console.error(err));
  };

  handleRefresh = () => {
    this.setState({ loading: true });
    this.fetchProducts();
  };

  ProductsGrid = () => (
    <>
      {this.state.data.length < 1 ? (
        <h3>No products</h3>
      ) : (
        <div className="productGrid">
          {this.state.data.map((p) => (
            <this.ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </>
  );

  ProductCard = (props: { p: ProductInfo }) => (
    <div className="product">
      <input
        id={"delete-" + props.p.id}
        type={"checkbox"}
        className={"delete-checkbox"}
        value={props.p.id}
      />
      <label
        htmlFor={"delete-" + props.p.id}
        className={"delete-checkbox-label"}
      >
        Delete product with ID {props.p.id}
      </label>
      <div>{props.p.sku}</div>
      <div>{props.p.name}</div>
      <div>{currencyFormatter.format(props.p.price)}</div>
      {this.productDescriptions[props.p.type](props.p)}
    </div>
  );

  productDescriptions: ProductDescriptions = {
    DVD: (p: ProductInfo) => <div>Size: {p.size} MB</div>,

    Furniture: (p: ProductInfo) => (
      <div>
        Dimensions: {p.height}x{p.width}x{p.length}
      </div>
    ),

    Book: (p: ProductInfo) => <div>Weight: {p.weight}KG</div>,
  };

  Loading = () => <h3>Loading...</h3>;

  Error = () => <h3>{this.state.error}</h3>;

  renderHeader = () => (
    <Header
      heading="Products List"
      middle={
        <button
          className="refresh-btn"
          aria-label="Refresh"
          onClick={this.handleRefresh}
        />
      }
      buttons={
        <>
          <Link to="/add-product" className="btn">
            ADD
          </Link>
          <button className="btn" onClick={this.handleDelete}>
            MASS DELETE
          </button>
        </>
      }
    />
  );

  renderMain = () => (
    <Main>
      {this.state.loading ? (
        <this.Loading />
      ) : (
        <>
          {this.state.error && <this.Error />}
          <this.ProductsGrid />
        </>
      )}
    </Main>
  );

  render(): React.ReactNode {
    return (
      <>
        {this.renderHeader()}
        {this.renderMain()}
      </>
    );
  }
}
