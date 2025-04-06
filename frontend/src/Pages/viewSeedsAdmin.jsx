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

const ViewSeedsAdmin = () => {
  const [seedData, setSeedData] = useState(null);
  const [seedCost, setSeedCost] = useState();
  const [seedStock, setSeedStock] = useState();
  const [seedPerPacket, setSeedPerPacket] = useState();

  const [couter, setCounter] = useState(0);
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
  }, [couter]);

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/seeds/${id}`)
      .then((response) => {
        console.log(response.data);
        setCounter((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (id) => {
    const payload = {
      cost: parseFloat(seedCost),
      seedsPerPacket: parseInt(seedPerPacket),
      seedsStock: parseInt(seedStock),
    };
    axios
      .patch(`${apiUrl}/seeds/${id}`, payload)
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
      <Navbar dashboard="notReq" cart="notReq"></Navbar>
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
                              {`Change the details of ${data.name}`}
                            </AlertDialogTitle>
                            <AlertDialogDescription></AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Seeds Per Packet
                            </Label>
                            <Input
                              placeholder={data.seedsPerPacket}
                              onChange={(e) => {
                                setSeedPerPacket(e.target.value);
                              }}
                              className="col-span-3"
                            />
                            <Label htmlFor="name" className="text-right">
                              Cost
                            </Label>
                            <Input
                              placeholder={data.cost}
                              onChange={(e) => {
                                setSeedCost(e.target.value);
                              }}
                              className="col-span-3"
                            />
                            <Label htmlFor="name" className="text-right">
                              Seed Stock
                            </Label>
                            <Input
                              placeholder={data.seedsStock}
                              onChange={(e) => {
                                setSeedStock(e.target.value);
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
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default ViewSeedsAdmin;
