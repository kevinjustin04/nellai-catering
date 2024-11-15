import { JSX } from "preact";
import { useState } from "preact/hooks";

// Menu item property interface
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
    <div class="flex items-center p-2">
      {/* Image */}
      <img
        src={image}
        alt={name}
        class="h-[50%] w-[50%] object-cover mr-4 md:h-[20%] md:w-[20%] lg:h-[20%] lg:w-[20%]"
      />

      {/* Text and controls */}
      <div>
        <h2 class="text-xl font-bold text-white">{name}</h2>
        <label class="block mt-2 text-white">Size:</label>
        <select onChange={handleSizeChange} class="text-black w-full mb-2">
          <option value="0">Select Size</option>
          {sizes.map((size) => (
            <option value={size.price} key={size.label}>
              {size.label} - ${size.price}
            </option>
          ))}
        </select>

        <label class="block text-white">Quantity:</label>
        <select onChange={handleQtyChange} class="text-black w-full">
          {Array.from({ length: 10 }, (_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
