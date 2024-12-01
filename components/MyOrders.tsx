"use client"

import { Flex, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-user";
export function formatDate(date) {
  // Array of suffixes for day of the month
  var suffixes = ["th", "st", "nd", "rd"];
  // Get the day of the month
  var day = date.getDate();
  // Determine the suffix for the day
  var suffix = suffixes[(day - 1) % 10 < 4 ? day % 10 : 0];
  // Format the date
  var formattedDate =
    day +
    suffix +
    " " +
    date.toLocaleString("default", { month: "short" }) +
    " " +
    date.getFullYear();
  return formattedDate;
}
export function MyOrders() {
  const [allOrders, setALlOrders] = useState([]);
  const {user}=useAuth()
  async function fetchAllOrders() {
    if (user) {
      const res = await axios.get(
        `/api/user/getAllorders?emailId=${user.email}`
      );
      const data = await res.data;
      setALlOrders(data);
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [user]);
  return (
    <Stack mt={100} w="100%">
      <Text ta="center" fz={30} fw={700}>
        My Orders
      </Text>
      <Stack w="100%" p={50} spacing={40}>
        <Flex
          justify="space-between"
          fz={20}
          style={{
            color: "white",
          }}
        >
          <Text>Order Details</Text>
          <Flex gap={80} mr={30}>
            <Text>Quantity</Text>
            <Text>Price</Text>
            <Text>Total</Text>
            <Text>Ordered on</Text>
          </Flex>
        </Flex>
        {allOrders.map((order) => {
          return (
            <Flex
              key={order._id}
              justify="space-between"
              style={{
                boxShadow: "0px 0px 1px 1px ",
              }}
            >
              <Flex w="50%">
                <img src={order.bookId.cover} />
                <Stack ml={30} mt={30}>
                  <Text>{order.bookId.title}</Text>
                  <Text>{order.bookId.description.slice(0, 200)}</Text>
                </Stack>
              </Flex>
              <Flex w="30%" gap={90} align="center" fz={26}>
                <Text>{order.quantity}</Text>
                <Text>{order.price}</Text>
                <Text>{order.price * order.quantity}</Text>
                <Text fz={18}>{formatDate(new Date(order.createdAt))}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Stack>
    </Stack>
  );
}
