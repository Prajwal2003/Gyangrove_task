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
                  <Plus className="w-5 h-5" /> Add
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
                          <Edit className="w-5 h-5" /> Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          className="btn-delete"
                        >
                          <Trash className="w-5 h-5" /> Delete
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
