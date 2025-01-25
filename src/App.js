import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash, Edit } from 'lucide-react';
import './App.css';

import Header from './components/Header';
import { Card, CardContent } from './components/Card';
import Button from './components/Button';
import Input from './components/Input';
import Select from './components/Select';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './components/Table';

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
      <motion.div className="app-container">
      <Header />
      <Card>
        <CardContent>
          <div className="form-container">
            <Input
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="input-field"
            />
            <Input
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="input-field"
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className="input-field"
            />
            {editingItem ? (
              <Button onClick={handleUpdateItem} className="bg-green-500 hover:bg-green-600">
                Update
              </Button>
            ) : (
              <Button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-600 flex items-center">
                <Plus className="w-5 h-5 mr-1" /> Add
              </Button>
            )}
          </div>
          <Select
            onChange={setFilter}
            value={filter}
            className="filter-select"
          >
            <option value="All">All</option>
            {Array.from(new Set(items.map((item) => item.category))).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <div className="table-container">
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
                      <TableCell className={item.quantity < 10 ? 'bg-red-100 text-red-700 font-bold' : ''}>
                        {item.name}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className={item.quantity < 10 ? 'bg-red-100 text-red-700 font-bold' : ''}>
                        {item.quantity}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleEditItem(item)}
                          className="bg-yellow-500 hover:bg-yellow-600"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>;

    </>
  );
}
