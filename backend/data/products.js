const products = [
  {
    brand: "Arayna",
    description:
      "Arayna Women's Floral Printed 100% Cotton Kurti Palazzo Pants Set with Dupatta ",
    imageUrl: "https://m.media-amazon.com/images/I/513OO2fys8S._UX679_.jpg",
    price: 999,
    size: ["s", "m"],
    category: "women",
    qty: 1,
  },
  {
    brand: "Aarika",
    description: "Aarika Girls Dress",

    imageUrl: "https://m.media-amazon.com/images/I/51gM87teo7L._UY879_.jpg",
    price: 617,
    size: ["s", "m", "l"],
    category: "kids",
    qty: 1,
  },
  {
    brand: "Van Heusen",
    description: "Van Heusen Men's Regular Fit T-Shirt",

    imageUrl: "https://m.media-amazon.com/images/I/717LjY3hVqL._UX569_.jpg",
    price: 548,
    size: ["s", "l"],
    category: "men",
    qty: 1,
  },

  {
    brand: "Arayna",
    description:
      "Arayna Women's Rayon Embroidered Straight Kurta Set with Palazzo Pants ",
    imageUrl: "https://m.media-amazon.com/images/I/61RixDEBrrL._UX679_.jpg",
    price: 549,
    size: ["l", "m"],
    category: "women",
    qty: 1,
  },
  // harpa

  {
    brand: "Harpa",
    description: "Harpa Women's Polyester A-Line Maxi Casual Dress ",
    imageUrl: "https://m.media-amazon.com/images/I/613DBLEr6ML._UX679_.jpg",
    price: 1228,
    size: ["l"],
    category: "women",
    qty: 1,
  },

  // w
  {
    brand: "W",
    description: "W for Woman Women Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/91yXXOE+IbL._UX522_.jpg",
    price: 458,
    size: ["s"],
    category: "women",
    qty: 1,
  },
  {
    brand: "Arayna",
    description:
      "Arayna Women's Rayon Solid Straight Kurti Palazzo Pants Set with Dupatta",
    imageUrl: "https://m.media-amazon.com/images/I/81VddGPvF1L._UX466_.jpg",
    price: 799,
    size: ["m"],
    category: "women",
    qty: 1,
  },
  {
    brand: "W",
    description: "W for Woman Women's Rayon Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/81ssSvTSIoL._UX522_.jpg",
    price: 769,
    size: ["s", "m", "l"],
    category: "women",
    qty: 1,
  },
  // biba
  {
    brand: "Biba",
    description: "BIBA Women Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/81e5mEQgBgL._UY550_.jpg",
    price: 720,
    size: ["l", "m"],
    category: "women",
    qty: 1,
  },
  {
    brand: "Harpa",
    description: "Harpa Women Dress ",
    imageUrl: "https://m.media-amazon.com/images/I/91D73h1V9NL._UY879_.jpg",
    price: 559,
    size: ["s", "l"],
    category: "women",
    qty: 1,
  },
  {
    brand: "Biba",
    description: "BIBA Women's Synthetic Regular Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/91yXXOE+IbL._UX522_.jpg",
    price: 779,
    size: ["s", "m"],
    category: "women",
    qty: 1,
  },
  {
    brand: "Harpa",
    description: "Harpa Women's Polyester A-Line Midi Dress",
    imageUrl: "https://m.media-amazon.com/images/I/61Bv8YMdu6S._UX679_.jpg",
    price: 857,
    size: ["m"],
    category: "women",
    qty: 1,
  },
  {
    brand: "Biba",
    description: "BIBA Women's Cotton Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/81Ng+pK7GaL._UX522_.jpg",
    price: 1169,
    size: ["s", "m", "l"],
    category: "women",
    qty: 1,
  },
  //allen soly
  {
    brand: "Allen Solly",
    description: "Allen Solly Men's Regular Fit Polo",
    imageUrl: "https://m.media-amazon.com/images/I/81ZuNtvMq+L._UY550_.jpg",
    price: 728,
    size: ["s", "m", "l"],
    category: "men",
    qty: 1,
  },
  {
    brand: "Aarika",
    description: "Aarika Baby-Girls Dress",

    imageUrl: "https://m.media-amazon.com/images/I/518pbXQ3LKL._UY741_.jpg",
    price: 470,
    size: ["s", "m"],
    category: "kids",
    qty: 1,
  },
  {
    brand: "Harpa",
    description: "Harpa Women Maxi A-Line Dress GR5976_Black_M",
    imageUrl: "https://m.media-amazon.com/images/I/614c58Wh8LL._UX679_.jpg",
    price: 671,
    size: ["s", "l"],
    category: "women",
    qty: 1,
  },
  {
    brand: "Allen Solly",
    description: "Allen Solly Men's Regular Fit T Shirt",
    imageUrl: "https://m.media-amazon.com/images/I/51aQt0Yuj4L._UY550_.jpg",
    price: 832,
    size: ["l", "m"],
    category: "men",
    qty: 1,
  },
  {
    brand: "Aarika",
    description: "Aarika Girl's Net A-Line Maxi Dress",

    imageUrl: "https://m.media-amazon.com/images/I/51NdGQaWoML._UY879_.jpg",
    price: 739,
    size: ["s", "l"],
    category: "kids",
    qty: 1,
  },

  {
    brand: "Allen Solly",
    description: "Allen Solly Men's Regular Fit T-Shirt",
    imageUrl: "https://m.media-amazon.com/images/I/71m0PW9bIML._UY550_.jpg",
    price: 419,
    size: ["s", "m", "l"],
    category: "men",
    qty: 1,
  },
  {
    brand: "Allen Solly",
    description: "Allen Solly Men Polo",
    imageUrl: "https://m.media-amazon.com/images/I/71WmwSot-vL._UY550_.jpg",
    price: 581,
    size: ["s"],
    category: "men",
    qty: 1,
  },
  //van heusen
  {
    brand: "Van Heusen",
    description: "Van Heusen Men's Regular T-Shirt",
    imageUrl: "https://m.media-amazon.com/images/I/71vD+94t-lS._UY879_.jpg",
    price: 500,
    size: ["m"],
    category: "men",
    qty: 1,
  },
  {
    brand: "Van Heusen",
    description: "Van Heusen Men Polo Shirt",

    imageUrl: "https://m.media-amazon.com/images/I/61qgRKHxBEL._UY879_.jpg",
    price: 819,
    size: ["l"],
    category: "men",
    qty: 1,
  },

  //kids
  {
    brand: "Aarika",
    description: "Aarika Girls Dress",

    imageUrl: "https://m.media-amazon.com/images/I/61WefmdNgYL._UY879_.jpg",
    price: 604,
    size: ["s", "l"],
    category: "kids",
    qty: 1,
  },

  {
    brand: "Arayna",
    description:
      "Arayna Women's Rayon Printed Anarkali Kurti Palazzo Pants Set with Dupatta ",
    imageUrl: "https://m.media-amazon.com/images/I/61i-ZAcBrPL._UX679_.jpg",
    price: 899,
    size: ["s", "m", "l"],
    category: "women",
    qty: 1,
  },
];

module.exports = products;
