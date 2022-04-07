export default function CategoryProduct({ product }) {
  return (
    <div>
      <h2>{product.title}</h2>
      <h3>{product.description}</h3>
      <p>{product.content}</p>
    </div>
  );
}
