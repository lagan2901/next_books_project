"use client"

import { Flex, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "./MyOrders";

export function AdminPanel() {
  const [allOrders, setALlOrders] = useState([]);
  async function fetchAllOrders() {
    const res = await axios.get("/api/orders/getall");
    const data = await res.data;
    setALlOrders(data);
  }
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <Stack mt={100} w="100%">
      <Text ta="center" fz={30} fw={700}>
        Admin Panel
      </Text>
      <Stack w="100%" p={50} spacing={30} className="px-20">
        <Flex
          // justify="space-between"
          fz={20} className="gap-20"
          style={{
            color: "white",
            
          }}
        >
          <Text className="gap-2">Order Details</Text>
          <Flex className="px-4 gap-10" mr={30}>
            <Text >Quantity</Text>
            {/* <Text>Price</Text> */}
            <Text>Total</Text>
            {/* <Text>Ordered By</Text> */}
            <Text>Ordered On</Text>
          </Flex>
        </Flex>
        {allOrders.map((order) => {
          return (
            <Flex
              key={order._id}
              // justify="space-between"
                // style={{
                //   boxShadow: "0px 0px 1px 1px ",
                // }}
            >
              <Flex>
                <img src={order.bookId.cover} />
                {/* <Stack ml={30} mt={30}>
                  <Text>{order.bookId.title}</Text> 
                   <Text>{order.bookId.description.slice(0, 200)}</Text>
                </Stack> */}
              </Flex >
              <Flex w="40%" gap={90} align="center" fz={26} justify="space-between" className="px-20">
                <Text>{order.quantity}</Text>
                
                <Text>{order.price * order.quantity}</Text>
                {/* <Text fz={18}>{order.userId.name}</Text> */}
                <Text fz={18}>{formatDate(new Date(order.createdAt))}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Stack>
    </Stack>
  );
}
