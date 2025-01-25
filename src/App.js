import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash, Edit } from 'lucide-react';
import "./App.css";

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

function Button({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
}

function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
    />
  );
}

function Select({ children, onChange, value }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="select"
    >
      {children}
    </select>
  );
}

function Table({ children }) {
  return <table className="table">{children}</table>;
}

function TableHeader({ children }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }) {
  return <tr className="table-row">{children}</tr>;
}

function TableCell({ children, className = "" }) {
  return <td className={`${className}`}>{children}</td>;
}

export default function InventoryApp() {
  const initialItems = [
    { id: 1, name: "Laptop", category: "Electronics", quantity: 5 },
    { id: 2, name: "Chair", category: "Furniture", quantity: 20 },
    { id: 3, name: "Phone", category: "Electronics", quantity: 8 },
  ];

  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });
  const [filter, setFilter] = useState("All");
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      setItems([...items, { ...newItem, id: Date.now(), quantity: Number(newItem.quantity) }]);
      setNewItem({ name: "", category: "", quantity: "" });
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (item) => {
    setNewItem(item);
    setEditingItem(item.id);
  };

  const handleUpdateItem = () => {
    setItems(
      items.map((item) =>
        item.id === editingItem ? { ...newItem, id: editingItem } : item
      )
    );
    setNewItem({ name: "", category: "", quantity: "" });
    setEditingItem(null);
  };

  const filteredItems =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <motion.div className="p-10 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
      <Card>
        <CardContent>
          <h1>Inventory Management</h1>
          <div className="input-group mb-6">
            <Input
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Input
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            {editingItem ? (
              <Button onClick={handleUpdateItem} className="button-green">
                Update
              </Button>
            ) : (
              <Button onClick={handleAddItem} className="button-blue">
                <Plus className="w-5 h-5 mr-1" /> Add
              </Button>
            )}
          </div>
          <Select onChange={setFilter} value={filter}>
            <option value="All">All</option>
            {Array.from(new Set(items.map((item) => item.category))).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      className={item.quantity < 10 ? "low-stock" : ""}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell
                      className={item.quantity < 10 ? "low-stock" : ""}
                    >
                      {item.quantity}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleEditItem(item)}
                          className="button-yellow"
                        >
                          <Edit className="w-5 h-5 mr-1" /> Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          className="button-red"
                        >
                          <Trash className="w-5 h-5 mr-1" /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
