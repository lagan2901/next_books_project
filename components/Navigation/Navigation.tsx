
"use client";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/use-user";
import { RootState } from "../../store";
import { userCart } from "../../store/userCart";
import { BooksData } from "../HomeBooks/Homebooks";
import CartItem from "./CartItem";

const userCartActions = userCart.actions;

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { user } = useAuth();
  const userItems = useSelector<RootState, BooksData[]>((state) => state.userCart.items);
  const dispatch = useDispatch();

  const searchfocusHandler = () => setIsActive(true);
  const searchblurHandler = () => setIsActive(false);

  useEffect(() => {
    console.log("user--", user);
  }, [user]);

  async function addToCarthandler() {
    if (user) {
      dispatch(userCartActions.removeAllproducts());
      const response = await axios.post("/api/user/postBooks", {
        emailId: user.email,
        bookItems: userItems,
      });
      showNotification({ message: "Order Placed Successfully" });
      setShowModal(false);
    } else {
      showNotification({ message: "You need to first login" });
    }
  }

  return (
    <>
      <div className="flex justify-between items-center p-4 w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <p className="font-bold text-xl">B</p>
          <img src="/logo3.png" alt="books" className="h-8" />
          <p className="font-bold text-xl">ks</p>
        </div>

        {/* Desktop Menu (Hidden on mobile) */}
        <div className="hidden md:flex space-x-6 ml-8">
          <p className="cursor-pointer" onClick={() => (window.location.href = "/")}>Home</p>
          <p className="cursor-pointer" onClick={() => (window.location.href = "/adminPanel")}>Admin Panel</p>
          <p className="cursor-pointer mr-6" onClick={() => (window.location.href = "/myorders")}>My Orders</p>
        </div>

        {/* Grouping Cart, Login, and Hamburger Menu */}
        <div className=" flex items-center space-x-4"> {/* Increased space to make it even */}
        
          {/* Cart Icon */}
          <div style={{ position: "relative" }} className="mr-6">
            <FontAwesomeIcon
              className="cursor-pointer text-3xl "
              icon={faCartShopping}
              onClick={() => {
                if (user) {
                  setShowModal(true);
                } else {
                  showNotification({ message: "Please login to view cart items" });
                }
              }}
            />
            <div className="absolute top-0 right-0 bg-red-500 rounded-full text-white w-4 h-4 flex items-center justify-center text-xs" style={{ fontSize: "12px" }}>
              {userItems.length}
            </div>
          </div>

          {/* Login/Logout Button */}
          {user ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => { localStorage.clear(); window.location.href = "/"; }}>
              Logout
            </button>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              <Link href="/login">LOGIN</Link>
            </button>
          )}

          {/* Hamburger Menu Button (Visible on mobile) */}
          <div className="md:hidden">
            <button
              className="text-3xl"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              &#9776;
            </button>
          </div>
        </div>
      </div>

 
  {isMobileNavOpen && (
  <div
    className="md:hidden fixed top-0 left-0 w-full  bg-black bg-opacity-90 z-50 flex flex-col items-start p-6 overflow-auto"
    style={{ maxHeight: "100vh" }}
  >
    <button
      className="text-white text-2xl mb-4 self-end"
      onClick={() => setIsMobileNavOpen(false)}
    >
      &times; {/* Close Button */}
    </button>
    <p
      className="cursor-pointer text-white py-2 border-b border-gray-700 w-full"
      onClick={() => {
        window.location.href = "/";
        setIsMobileNavOpen(false);
      }}
    >
      Home
    </p>
    <p
      className="cursor-pointer text-white py-2 border-b border-gray-700 w-full"
      onClick={() => {
        window.location.href = "/adminPanel";
        setIsMobileNavOpen(false);
      }}
    >
      Admin Panel
    </p>
    <p
      className="cursor-pointer text-white py-2 w-full"
      onClick={() => {
        window.location.href = "/myorders";
        setIsMobileNavOpen(false);
      }}
    >
      My Orders
    </p>
  </div>
)}


      {/* Cart Modal */}
      <Modal opened={showModal} onClose={() => setShowModal(false)} title="User's Cart" size="md">
        <Stack>
          {userItems.length === 0 ? (
            <Center w="100%" h="100%"><Text>No items in cart</Text></Center>
          ) : (
            userItems.map((useritem, index) => (
              <CartItem item={useritem} onIncrease={() => dispatch(userCartActions.addproduct(useritem))} key={index} />
            ))
          )}
          <Button onClick={addToCarthandler}>Order Now!</Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Navigation;

