import Navbar from "../Navbar/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const viewSeeds = () => {
  const [seedData, setSeedData] = useState(null);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/seeds`)
      .then((response) => {
        setSeedData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error GETting data:", error);
      });
  }, []);

  const handleCart = (productName, cost) => {
    const payload = {
      productName,
      type:"Seed",
      quantity: 1,
      cost,
    };
    axios
      .post(`${apiUrl}/cart`, payload)
      .then((response) => {
        console.log(response.data);
        toast(`${productName} has been added to cart`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <Navbar></Navbar>
      <div className="m-5">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Seed ID</TableHead>
              <TableHead>Seed Name</TableHead>
              <TableHead>Seed Category</TableHead>
              <TableHead>Seeds Per Packet</TableHead>
              <TableHead>Seed cost</TableHead>
              <TableHead>Seed Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seedData != null &&
              seedData.map((data, id) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>{data.seedsPerPacket}</TableCell>
                    <TableCell>{`₹ ${data.cost}`}</TableCell>
                    <TableCell>{data.seedsStock}</TableCell>
                    <TableCell>
                      <Button
                        className="bg-lime-700 hover:bg-lime-500"
                        onClick={() => {
                          handleCart(data.name, data.cost);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </>
  );
};
export default viewSeeds;
