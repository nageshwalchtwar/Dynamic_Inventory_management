import React, { useState, useEffect } from 'react';

function InventoryManagement() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: 0 });

  useEffect(() => {
    const initialItems = [
      { id: 1, name: "Laptop", category: "Electronics", quantity: 50 },
      { id: 2, name: "Desk Chair", category: "Furniture", quantity: 30 },
      { id: 3, name: "Notebook", category: "Stationery", quantity: 100 },
      { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
    ];
    setItems(initialItems);
  }, []);

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ name: "", category: "", quantity: 0 });
    }
  };

  const updateItem = (id, updatedItem) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    setEditingId(null);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items
    .filter(item => !filter || item.category.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : b.quantity - a.quantity);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#3730a3', marginBottom: '20px' }}>Inventory Management</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h2 style={{ color: '#1e40af', marginBottom: '10px' }}>Add New Item</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button onClick={addItem} style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Item</button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h2 style={{ color: '#1e40af', marginBottom: '10px' }}>Filter and Sort</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Filter by category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="name">Sort by Name</option>
            <option value="quantity">Sort by Quantity</option>
          </select>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0e7ff' }}>
            <th style={{ padding: '12px', textAlign: 'left', color: '#1e40af' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left', color: '#1e40af' }}>Category</th>
            <th style={{ padding: '12px', textAlign: 'left', color: '#1e40af' }}>Quantity</th>
            <th style={{ padding: '12px', textAlign: 'left', color: '#1e40af' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id} style={{ backgroundColor: item.quantity < 10 ? '#fee2e2' : 'transparent' }}>
              <td style={{ padding: '12px' }}>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                             //done by Nagesh Walchatwar
                ) : (
                  item.name
                )}
              </td>
              <td style={{ padding: '12px' }}>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => updateItem(item.id, { category: e.target.value })}
                    style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                ) : (
                  item.category
                )}
              </td>
              <td style={{ padding: '12px' }}>
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                ) : (
                  <span style={{ color: item.quantity < 10 ? '#dc2626' : 'inherit', fontWeight: item.quantity < 10 ? 'bold' : 'normal' }}>
                    {item.quantity}
                  </span>
                )}
              </td>
              <td style={{ padding: '12px' }}>
                {editingId === item.id ? (
                  <button onClick={() => setEditingId(null)} style={{ padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>Save</button>
                ) : (
                  <>
                    <button onClick={() => setEditingId(item.id)} style={{ padding: '4px 8px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>Edit</button>
                    <button onClick={() => deleteItem(item.id)} style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        Created by Nagesh Walchatwar (nageshwalchtwar257@gmail.com)
      </footer>
    </div>
  );
}
// Done by Nagesh Walchatwar
export default InventoryManagement;
