import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash, Edit } from 'lucide-react';
import './App.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src="logo.png" alt="Logo" className="header-logo" />
        <h1 className="header-title">Inventory Management App</h1>
      </div>
    </header>
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

function Button({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
}

function Input({ placeholder, value, onChange, type = 'text' }) {
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
    <select onChange={(e) => onChange(e.target.value)} value={value} className="select">
      {children}
    </select>
  );
}

function Table({ children }) {
  return <table className="table">{children}</table>;
}

function TableHeader({ children }) {
  return <thead className="table-header">{children}</thead>;
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }) {
  return <tr className="table-row">{children}</tr>;
}

function TableCell({ children, className = "" }) {
  return <td className={`table-cell ${className}`}>{children}</td>;
}

export default function InventoryApp() {
  const initialItems = [
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 5 },
    { id: 2, name: 'Chair', category: 'Furniture', quantity: 20 },
    { id: 3, name: 'Phone', category: 'Electronics', quantity: 8 },
  ];

  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
  const [filter, setFilter] = useState('All');
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      setItems([...items, { ...newItem, id: Date.now(), quantity: Number(newItem.quantity) }]);
      setNewItem({ name: '', category: '', quantity: '' });
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (item) => {
    setNewItem(item);
    setEditingItem(item.id);
  };

  const handleUpdateItem = () => {
    setItems(items.map(item => (item.id === editingItem ? { ...newItem, id: editingItem } : item)));
    setNewItem({ name: '', category: '', quantity: '' });
    setEditingItem(null);
  };

  const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  return (
    <>
      <Header />
      <motion.div className="app-container">
        <Card>
          <CardContent>
            <div className="form-section">
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
                <Button onClick={handleUpdateItem} className="btn-update">
                  Update
                </Button>
              ) : (
                <Button onClick={handleAddItem} className="btn-add">
                  <Plus className="icon" /> Add
                </Button>
              )}
            </div>
            <Select onChange={setFilter} value={filter}>
              <option value="All">All</option>
              {Array.from(new Set(items.map(item => item.category))).map(category => (
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
                    <TableCell colSpan={4} className="text-center">
                      No items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell
                        className={item.quantity < 10 ? 'low-stock' : ''}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell
                        className={item.quantity < 10 ? 'low-stock' : ''}
                      >
                        {item.quantity}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleEditItem(item)}
                          className="btn-edit"
                        >
                          <Edit className="icon" /> Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          className="btn-delete"
                        >
                          <Trash className="icon" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
