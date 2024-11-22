import { useEffect, useState } from "preact/hooks";
import MenuItem from "../components/MenuItem.tsx";
import DateSelector from "../components/DateSelector.tsx";

// Menu item data interface
interface MenuItemData {
  name: string;
  image: string;
  sizes: { label: string; price: number }[];
}

/**
 * OrderForm Component
 * Handles the ordering process, including menu item selection and form submission.
 */
export default function OrderForm() {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [items, setItems] = useState<
    { name: string; sizeLabel: string; sizePrice: number; qty: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickup: "lunch",
    pickupDate: "",
    paymentReceipt: "",
  });

  // Fetch menu data on mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    fetchMenu();
  }, []);

  // Handle menu item changes
  const handleMenuItemChange = (
    name: string,
    sizeLabel: string,
    sizePrice: number,
    qty: number,
  ) => {
    const itemIndex = items.findIndex((item) => item.name === name);
    let updatedItems;

    if (itemIndex > -1) {
      // Update existing item
      updatedItems = items.map((item, index) =>
        index === itemIndex ? { ...item, sizeLabel, sizePrice, qty } : item
      );
    } else {
      // Add new item
      updatedItems = [...items, { name, sizeLabel, sizePrice, qty }];
    }

    setItems(updatedItems);

    // Calculate new total
    const newTotal = updatedItems.reduce(
      (acc, item) => acc + item.sizePrice * item.qty,
      0,
    );
    setTotal(newTotal);
  };

  // Handle input changes
  const handleInputChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  // Handle pickup date changes
  const handlePickupDateChange = (date: string) => {
    setFormData({ ...formData, pickupDate: date });
  };

  // Handle form submission
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const orderData = { ...formData, items, total };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert("Order submitted successfully!");
    } else {
      alert("Error submitting order.");
    }
  };

  return (
    <form onSubmit={handleSubmit} class="p-4 rounded-lg shadow-lg">
      <div>
        <label class="block mb-2 text-white">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
          required
        />

        <label class="block mb-2 text-white">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
          required
        />

        <label class="block mb-2 text-white">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
          required
        />
      </div>
      <div>
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            image={item.image}
            sizes={item.sizes}
            onChange={(sizeLabel, sizePrice, qty) =>
              handleMenuItemChange(item.name, sizeLabel, sizePrice, qty)}
          />
        ))}
      </div>

      <div class="mt-4">
        <DateSelector onSelectDate={handlePickupDateChange} />

        <label class="block mb-2 text-white">Pickup Time:</label>
        <select
          required
          name="pickup"
          value={formData.pickup}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
        >
          <option value="lunch">Lunch (12:00 PM)</option>
          <option value="dinner">Dinner (6:00 PM)</option>
        </select>

        <p class="text-xl text-white mb-3">
          Pay through Zelle to:{" "}
          <span class="text-orange-500">(980) 833 - 6560</span>
        </p>

        <p class="text-xl font-semibold text-white mb-3">Total: ${total}</p>

        <label class="block mb-2 text-white">
          Please verify your order and enter payment amount and Zelle
          transaction number. We will send an order confirmation through email.
        </label>
        <input
          required
          type="text"
          placeholder="Total Amount, Transaction Number"
          name="paymentReceipt"
          value={formData.paymentReceipt}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
        />

        <button type="submit" class="bg-blue-500 text-white p-2 mt-4 rounded">
          Submit Order
        </button>
      </div>
    </form>
  );
}
