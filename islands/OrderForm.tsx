// components/OrderForm.tsx
import { useEffect, useState } from "preact/hooks";
import MenuItem from "../components/MenuItem.tsx";
import DateSelector from "../components/DateSelector.tsx";

interface MenuItemData {
  name: string;
  image: string;
  sizes: { label: string; price: number }[];
}

export default function OrderForm() {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [items, setItems] = useState<
    { name: string; size: number; qty: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickup: "lunch",
    pickupDate: "", // Added pickupDate to the form data
    paymentReceipt: "",
  });

  useEffect(() => {
    // Fetch menu data from the API on component mount
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

  const handleMenuItemChange = (name: string, size: number, qty: number) => {
    const itemIndex = items.findIndex((item) => item.name === name);
    let updatedItems;

    if (itemIndex > -1) {
      // Update existing item
      updatedItems = items.map((item, index) =>
        index === itemIndex ? { ...item, size, qty } : item
      );
    } else {
      // Add new item
      updatedItems = [...items, { name, size, qty }];
    }

    setItems(updatedItems);

    // Calculate new total
    const newTotal = updatedItems.reduce(
      (acc, item) => acc + item.size * item.qty,
      0
    );
    setTotal(newTotal);
  };

  const handleInputChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  // New handler for setting the pickup date
  const handlePickupDateChange = (date: string) => {
    setFormData({ ...formData, pickupDate: date });
  };

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
    <form onSubmit={handleSubmit} class="p-4 bg-gray-100 rounded-lg shadow-lg">
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            image={item.image}
            sizes={item.sizes}
            onChange={(size, qty) => handleMenuItemChange(item.name, size, qty)}
          />
        ))}
      </div>

      <div class="mt-4">
        <label class="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
          required
        />

        <label class="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
          required
        />

        <label class="block mb-2">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
          required
        />

        <DateSelector onSelectDate={handlePickupDateChange} />

        <label class="block mb-2">Pickup Time:</label>
        <select
          name="pickup"
          value={formData.pickup}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
        >
          <option value="lunch">Lunch (12:00 PM)</option>
          <option value="dinner">Dinner (6:00 PM)</option>
        </select>

        <label class="block mb-2">Payment Receipt Number:</label>
        <input
          type="text"
          name="paymentReceipt"
          value={formData.paymentReceipt}
          onChange={handleInputChange}
          class="w-full p-2 mb-4"
        />

        <p class="text-xl font-semibold">Total: ${total}</p>

        <button type="submit" class="bg-blue-500 text-white p-2 mt-4 rounded">
          Submit Order
        </button>
      </div>
    </form>
  );
}
