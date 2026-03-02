function ProductCard({ productName, price, description, onAddToCart }) {
  return (
    <article className="card">
      <h3>{productName}</h3>
      <p>{description}</p>
      <p className="price">${price}</p>
      <button onClick={() => onAddToCart(productName)}>Add to Cart</button>
    </article>
  );
}

export default ProductCard;
