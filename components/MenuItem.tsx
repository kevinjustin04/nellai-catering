import { JSX } from "preact";
import { useState } from "preact/hooks";

interface MenuItemProps {
  name: string;
  image: string;
  sizes: { label: string; price: number }[];
  onChange: (size: number, qty: number) => void;
}

export default function MenuItem(
  { name, image, sizes, onChange }: MenuItemProps,
) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);

  const handleSizeChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const size = parseInt((e.target as HTMLSelectElement).value, 10);
    setSelectedSize(size);
    onChange(size, selectedQty); // Pass both size and current quantity
  };

  const handleQtyChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const qty = parseInt((e.target as HTMLSelectElement).value, 10);
    setSelectedQty(qty);
    onChange(selectedSize, qty); // Pass current size and new quantity
  };

  return (
    <div class="bg-white p-4 rounded shadow-lg m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <img src={image} alt={name} class="w-full h-32 object-cover rounded" />
      <h2 class="text-xl font-bold mt-2">{name}</h2>

      <label class="block mt-2">Size:</label>
      <select onChange={handleSizeChange} class="text-black w-full">
        <option value="0">Select Size</option>
        {sizes.map((size) => (
          <option value={size.price} key={size.label}>
            {size.label} - ${size.price}
          </option>
        ))}
      </select>

      <label class="block mt-2">Quantity:</label>
      <select onChange={handleQtyChange} class="text-black w-full">
        {Array.from({ length: 10 }, (_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
