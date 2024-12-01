import { useSelector } from "react-redux";
import { RootState } from "../../store";
import style from "./items.module.css";
import useFilter from "../../hooks/use-Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { product } from "../../store/productsstore";
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../utilities/item";
import { userCart } from "../../store/userCart";

const productActions = product.actions;
const Items = () => {
  const [books, setbooks] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector<
    RootState,
    { reviews: string; rating: number; price: number[]; genre: string[] }
  >((state) => {
    return {
      reviews: state.products.reviews.value,
      rating: state.products.rating.value,
      price: state.products.price.value,
      genre: state.products.genre.value,
    };
  });

  const { paragraph, Handler, crossHandler } = useFilter();

  Handler(
    data.price,
    "price",
    `Price between ${data.price[0]},${data.price[1]}`
  );
  Handler(data.rating, "rating", `Rating more than ${data.rating}`);
  Handler(
    data.reviews,
    "reviews",
    `Reviews sort ${
      data.reviews === "max" ? "Maximum to Minimum" : "Minimum to Maximum"
    }`
  );

  const clickHandler = (value: string) => {
    dispatch(productActions.intialproductState(value));
    crossHandler(value);
  };
  async function searchQuery() {
    const queryParams = new URLSearchParams(window.location.search);
    const paramValue = queryParams.get("q");
    const resd = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${paramValue}:keyes&key=AIzaSyBLpkFwG7wX7dapLT8Vkx7e23TIwcrg8kk`
    );
    const data = await resd.data;
    setbooks(data.items);
  }
  useEffect(() => {
    searchQuery();
  }, []);

  return (
    <div className={style.main}>
      <h1 className={style.heading}>Trending and intersting</h1>
      <h2 className={style.subheading}>Based on ratings and reviews</h2>

      {paragraph.length > 0 && (
        <div className={style.filter}>
          <p>Filter:</p>
          <div className={style.filtersused}>
            {paragraph.map((el) => {
              return (
                <div key={el.key} className={style.Singlefilterused}>
                  <p>{el.para}</p>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={clickHandler.bind(null, el.key)}
                    className={style.icon}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className={style.items}>
        {books.map((el) => {
          const g =
            el.volumeInfo.categories && el.volumeInfo.categories.length > 0
              ? el.volumeInfo.categories.join(",")
              : " ";
          const img =
            el.volumeInfo.imageLinks &&
            el.volumeInfo.imageLinks.thumbnail.length > 0
              ? el.volumeInfo.imageLinks.thumbnail
              : " ";
          return (
            <Item
              key="a1"
              image={img}
              name={el.volumeInfo.title}
              price="23"
              description={""}
              genre={g}
              onClick={() => {
                dispatch(userCart.actions.addproduct(el));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Items;
