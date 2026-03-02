import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    productName: "Wireless Headphones",
    price: 99,
    description: "Good for noise cancellation and calls.",
  },
  {
    id: 2,
    productName: "Smart Watch",
    price: 149,
    description: "Tracks fitness, sleep, and heart rate.",
  },
  {
    id: 3,
    productName: "Mobile Phone",
    price: 699,
    description: "Strong battery, performance, and camera setup.",
  },
];

function Product() {
  const handleAddToCart = (name) => {
    console.log(`Product ${name} added to cart`);
  };

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productName={product.productName}
          price={product.price}
          description={product.description}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default Product;
