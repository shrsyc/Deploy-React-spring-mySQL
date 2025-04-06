import Navbar from "../Navbar/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { NavLink } from "react-router";
import dashboardBg from "../assets/dashboard-bg.png";
import seed from "../assets/seed.png";
import plant from "../assets/plant.png";
const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [seedName, setSeedName] = useState();
  const [seedType, setSeedType] = useState();
  const [seedCost, setSeedCost] = useState();
  const [seedStock, setSeedStock] = useState();
  const [seedPerPacket, setSeedPerPacket] = useState();

  const [seedDialogOpen, setSeedDialogOpen] = useState(false);
  const [plantDialogOpen, setPlantDialogOpen] = useState(false);

  const handleSeedsSubmit = () => {
    const payload = {
      name: seedName,
      category: seedType,
      cost: seedCost,
      seedsStock: seedStock,
      seedsPerPacket: seedPerPacket,
    };

    axios
      .post(`${apiUrl}/seeds`, payload)
      .then((response) => {
        console.log("Response:", response.data);
        setSeedDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };
  const handlePlantsSubmit = () => {
    const payload = {
      name: seedName,
      category: seedType,
      cost: seedCost,
      plantsStock: seedStock,
      plantHeight: seedPerPacket,
    };

    axios
      .post(`${apiUrl}/plants`, payload)
      .then((response) => {
        console.log("Response:", response.data);
        setPlantDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };
  return (
    <>
      <div className="flex flex-col min-h-screen val">
        <Navbar cart="notReq" dashboard="notReq"></Navbar>
        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${dashboardBg})`}}>
          <div className="flex p-5 gap-28  pt-32">
            <div className="flex-1">
              <div className="w-56 p-5 rounded-md ml-auto mr-0 border-2 border-slate-300 bg-white opacity-90">
                <p className="font-bold text-xl text-yellow-800">Seeds</p>
                <img src={seed} className="h-32 m-auto"></img>
                <Dialog open={seedDialogOpen} onOpenChange={setSeedDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="block  my-5 w-full bg-yellow-950 hover:bg-yellow-800">Add Seed</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Seed</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Seed Name
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedName(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Category
                        </Label>
                        <Select
                          onValueChange={(e) => {
                            setSeedType(e);
                          }}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select the category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              <SelectItem value="Herbs">Herbs</SelectItem>
                              <SelectItem value="Fruit">Fruit</SelectItem>
                              <SelectItem value="Flower">Flower</SelectItem>
                              <SelectItem value="Vegetable">
                                Vegetable
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Cost
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedCost(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Seeds Stock
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedStock(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Seeds Per Packet
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedPerPacket(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button onClick={handleSeedsSubmit}>Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <NavLink to="/viewSeedsAdmin">
                  <Button className="block  my-5 w-full bg-yellow-950 hover:bg-yellow-800">View Seeds</Button>
                </NavLink>
              </div>
            </div>


            <div className="flex-1">
              <div className="w-56 p-5 rounded-md ml-0 mr-auto border-2 border-slate-300 bg-white opacity-90">
                <p className="font-bold text-xl text-lime-700">Plant</p>
                <img src={plant} className="h-32 m-auto"></img>
                <Dialog
                  open={plantDialogOpen}
                  onOpenChange={setPlantDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="block  my-5 w-full bg-lime-900 hover:bg-lime-700">Add Plant</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Plant</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Plant Name
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedName(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Category
                        </Label>
                        <Select
                          onValueChange={(e) => {
                            setSeedType(e);
                          }}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select the category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              <SelectItem value="Herbs">Herbs</SelectItem>
                              <SelectItem value="Fruit">Fruit</SelectItem>
                              <SelectItem value="Flower">Flower</SelectItem>
                              <SelectItem value="Vegetable">
                                Vegetable
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Cost
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedCost(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Plants Stock
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedStock(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Plant height
                        </Label>
                        <Input
                          onChange={(e) => {
                            setSeedPerPacket(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button onClick={handlePlantsSubmit}>Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <NavLink to="/viewPlantsAdmin">
                  <Button className="block  my-5 w-full bg-lime-900 hover:bg-lime-700">View Plants</Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
