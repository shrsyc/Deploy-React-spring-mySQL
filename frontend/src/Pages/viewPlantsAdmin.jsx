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
const ViewPlantsAdmin = () => {
  const [seedData, setSeedData] = useState(null);
  const [seedCost, setSeedCost] = useState();
  const [seedStock, setSeedStock] = useState();
  const [seedPerPacket, setSeedPerPacket] = useState();

  const [couter, setCounter] = useState(0);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/plants`)
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
      .delete(`${apiUrl}/plants/${id}`)
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
      plantHeight: parseInt(seedPerPacket),
      plantsStock: parseInt(seedStock),
    };
    axios
      .patch(`${apiUrl}/plants/${id}`, payload)
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
              <TableHead className="w-[100px]">Plant ID</TableHead>
              <TableHead>Plant Name</TableHead>
              <TableHead>Plant Category</TableHead>
              <TableHead>Plant Height</TableHead>
              <TableHead>Plant Cost</TableHead>
              <TableHead>Plant Stock</TableHead>
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
                    <TableCell>{data.plantHeight}</TableCell>
                    <TableCell>{`₹ ${data.cost}`}</TableCell>
                    <TableCell>{data.plantsStock}</TableCell>
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
                              Plant Height
                            </Label>
                            <Input
                              placeholder={data.plantHeight}
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
                              Plant Stock
                            </Label>
                            <Input
                              placeholder={data.plantsStock}
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
                                console.log(seedCost,seedPerPacket,seedStock)
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
export default ViewPlantsAdmin;
