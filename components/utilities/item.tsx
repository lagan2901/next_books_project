import React, { Fragment, useState } from "react";
import style from "./item.module.css";

const Item: React.FC<{
  image: string;
  name: string;
  price: string;
  description: string;
  genre: string;
  onClick: () => void;
}> = (props) => {
  const [isHover, setisHover] = useState(false);
  const enterHandler = () => {
    setisHover(true);
  };

  const leaveHandler = () => {
    setisHover(false);
  };
  const classes = `${style.image} ${isHover && style.saturate}`;
  return (
    <div
      className={style.main}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      onClick={props.onClick}
    >
      <div className={style.imagediv}>
        <img src={props.image} alt="" className={classes} />
        {isHover && (
          <Fragment>
            <div className={style.hoverdetails}></div>
            <div className={style.details}>
              <p className={style.genre}>{props.genre}</p>
              <p className={style.description}>
                {props.description.slice(0, 150)}...
              </p>
            </div>
            <div className={style.buttondiv}>
              <p className={style.plus}>+</p>
              <button className={style.button}>Add to Cart</button>
            </div>
          </Fragment>
        )}
      </div>
      <div className={style.itemdetails}>
        <h3 className={style.price}>${props.price}</h3>
        <h3 className={style.name}>{props.name}</h3>
      </div>
    </div>
  );
};

export default Item;
