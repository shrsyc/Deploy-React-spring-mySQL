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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import success from "../assets/success.png";
import { NavLink } from "react-router";
const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [couter, setCounter] = useState(0);
  const [newQuantity, setNewQuantity] = useState();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    axios
      .get(`${apiUrl}/cart`)
      .then((response) => {
        setCartData(response.data);
        setTotalCost(0);
        response.data.map((data, id) => {
          setTotalCost((prev) => prev + data.cost);
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error GETting data:", error);
      });
  }, [couter]);

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/cart/${id}`)
      .then((response) => {
        console.log(response.data);
        setCounter((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (id) => {
    axios
      .post(`${apiUrl}/cart/${id}?quantity=${newQuantity}`)
      .then((response) => {
        console.log(response.data);
        setCounter((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAll = () => {
    axios
      .delete(`${apiUrl}/cart/deleteAll/true`)
      .then((response) => {
        console.log(response.data);
        setCounter((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <p className="font-bold text-2xl text-lime-500 text-center">Cart</p>
      <div className="m-5">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartData != null &&
              cartData.map((data, id) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell>{data.productName}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell>{`₹ ${data.cost / data.quantity}`}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{`₹ ${data.cost}`}</TableCell>
                    <TableCell className="text-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-800 hover:bg-red-400 text-white hover:text-white">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {`Are you sure to delete ${data.name}?`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleDelete(data.id);
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-green-700 hover:bg-green-400 text-white hover:text-white">
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {`Change the quantity of ${data.productName}`}
                            </AlertDialogTitle>
                            <AlertDialogDescription></AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Quantity
                            </Label>
                            <Input
                              placeholder={data.plantHeight}
                              onChange={(e) => {
                                setNewQuantity(e.target.value);
                              }}
                              className="col-span-3"
                            />
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleChange(data.id);
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <p className="text-lg text-green-800 font-semibold">
                  {`₹ ${totalCost}`}
                </p>
              </TableCell>
              <TableCell className="text-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {totalCost != 0 && (
                      <Button
                        className="bg-lime-700 hover:bg-lime-500 px-10"
                        onClick={handleDeleteAll}
                      >
                        Buy
                      </Button>
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center">
                        {`Your Order is placed succesfully!`}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        <img
                          className="h-40 mr-auto ml-auto"
                          src={success}
                        ></img>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction asChild className="bg-green-800 hover:bg-green-500 mr-auto ml-auto">
                        <NavLink to="/userDashboard">
                          <button>
                            Continue Shopping
                          </button>
                        </NavLink>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default Cart;
