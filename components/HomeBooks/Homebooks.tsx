import style from "./Homebooks.module.css";
import LayoutMainpage from "../utilities/LayoutMainpage";
import Item from "../utilities/item";
import React from "react";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";

import { userCart } from "../../store/userCart";

const userCartActions = userCart.actions;
type data = {
  volumeInfo: {
    imageLinks: {
      thumbnail: string;
    };
    title: string;
    description: string;
    categories: string[];
  };
}[];

export interface BooksData {
  cover: string;
  title: string;
  description: string;
  price: string;
  category: string;
  _id: string;
}

const Homebooks: React.FC<{ data: data }> = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={style.main}>
      <div>
        <h1>Best Seller Books</h1>
        <p>Different genres,different world</p>
      </div>
      <div className={style.items}>
        {props.data.map((el: any) => {
          return (
            <Item
              key="a1"
              image={el.cover}
              name={el.title}
              price={el.price}
              description={el.description}
              genre={el.category}
              onClick={() => {
                dispatch(userCartActions.addproduct(el));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Homebooks;
