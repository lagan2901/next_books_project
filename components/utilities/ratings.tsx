import style from "./ratings.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { product } from "../../store/productsstore";
import { RootState } from "../../store";
const Ratings = () => {
  const [checkbox, setcheckbox] = useState([true, true, true, true, true]);
  const [isActive, setisActive] = useState(true);
  const rating = useSelector<RootState, number>(
    (state) => state.products.rating.value
  );
  const dispatch = useDispatch();
  const productActions = product.actions;
  useEffect(() => {
    setcheckbox((prevState) => {
      const returnarray = new Array(5);
      for (let i = 0; i <= rating; i++) {
        returnarray[i] = true;
      }
      for (let j = rating; j < 5; j++) {
        returnarray[j] = false;
      }
      return returnarray;
    });
  }, [isActive, rating]);

  const mouseenterHandler = (value: number) => {
    setcheckbox((prevState) => {
      const returnarray = [false, false, false, false, false];
      for (let i = 0; i <= value; i++) {
        returnarray[i] = true;
      }
      return returnarray;
    });
  };

  const changeHandler = (value: number) => {
    dispatch(productActions.setrating(value));
  };

  const mouseleaveHandler = () => {
    setisActive(false);
  };
  const mouseenterHandler2 = () => {
    setisActive(true);
  };
  const check = () => {
    const array = [];
    for (let i = 0; i < 5; i++) {
      const classes = `${style.stardiv} ${checkbox[i] ? style.divActive : ""}`;
      array.push(
        <div className={classes} key={i}>
          {/* <p className={style.starnumber}>{i+1}</p> */}
          <FontAwesomeIcon className={style.staricon} icon={faStar} />
          <input
            type="checkbox"
            id="scales"
            name={`${i}`}
            onMouseEnter={mouseenterHandler.bind(null, i)}
            onChange={changeHandler.bind(null, i)}
          />
        </div>
      );
    }
    return array;
  };

  const arraylist = check();
  return (
    <Fragment>
      <h4>Rating</h4>
      <div
        className={style.ratingdiv}
        onMouseLeave={mouseleaveHandler}
        onMouseEnter={mouseenterHandler2}
      >
        {arraylist.map((el) => {
          return el;
        })}
      </div>
    </Fragment>
  );
};

export default Ratings;
