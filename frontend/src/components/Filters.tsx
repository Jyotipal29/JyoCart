import { useState, useEffect, ChangeEvent } from "react";
import FilterControl from "./FilterControler";
import { useProduct } from "../context/productContext/productContext";
type OpenState = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const prices = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Hight to Low",
    value: "desc",
  },
  {
    label: "Low to High",
    value: "asc",
  },
];
const categories = [
  { label: "All", value: "" },
  {
    label: "Women",
    value: "women",
  },
  {
    label: "Men",
    value: "men",
  },
  {
    label: "Kids",
    value: "kids",
  },
];

const sizes = [
  { label: "All", value: "" },
  { label: "Small", value: "s" },
  { label: "Medium", value: "m" },
  { label: "Large", value: "l" },
];

const brands = [
  { label: "All", value: "" },
  { label: "Arayna", value: "Arayna" },
  { label: "Aarika", value: "Aarika" },
  { label: "Harpa", value: "Harpa" },
  { label: "W", value: "W" },
  { label: "Van Heusen", value: "Van Heusen" },
  { label: "Biba", value: "Biba" },
  { label: "Allen Solly", value: "Allen Solly" },
];

const Filters = ({ open, setOpen }: OpenState) => {
  const { productDispatch } = useProduct();
  const [price, setPrice] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const clearFilter = () => {
    setPrice("");
    setBrand("");
    setCategory("");
    setSize("");
    setSearch(" ");
  };

  console.log({ price, brand, category, size, search });
  useEffect(() => {
    productDispatch({
      type: "FILTER_CHANGE",
      payload: {
        filters: {
          brand,
          category,
          size,
          search,
        },
        sort: {
          price,
        },
      },
    });
  }, [price, brand, category, size, search]);

  return (
    <div className="flex flex-col items-center justify-center relative ">
      <button
        className="absolute top-0 right-0 text-3xl text-yellow-400 md:hidden"
        onClick={() => setOpen(false)}
      >
        &times;
      </button>
      <div>
        <h1 className="text-2xl uppercase font-semibold mb-2 font-lora">
          Filter
        </h1>
      </div>

      <div className="">
        <input
          className="outline-none p-1 px-2 border-2 m-2 rounded-md  font-lora"
          placeholder="search"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
      <div className="space-y-12 py-4 font-lora ">
        <FilterControl
          label="Sort"
          value={price}
          options={prices}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setPrice(e.target.value)
          }
        />
        <FilterControl
          label="Category"
          value={category}
          options={categories}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        />
        <FilterControl
          label="Size"
          value={size}
          options={sizes}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSize(e.target.value)
          }
        />
        <FilterControl
          label="Brand"
          value={brand}
          options={brands}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setBrand(e.target.value)
          }
        />
      </div>
      <button
        onClick={clearFilter}
        className="bg-yellow-400 mt-8 py-1  w-11/12 font-lora font-semibold text-white uppercase"
      >
        clear all
      </button>
    </div>
  );
};

export default Filters;
