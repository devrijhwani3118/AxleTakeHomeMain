import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Part } from './types';
import { getParts, saveParts, loadPartsFromStorage } from './api';
import { PartForm } from './components/PartForm';
import { PartList } from './components/PartList';

function App() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  //sorting state testing
  const [sortKey, setSortKey] = useState<'name' | 'quantity' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 parts per page

  // Load initial parts data on component mount
  useEffect(() => {
    const loadParts = async () => {
      try {
        setLoading(true);

        // Try to load from localStorage first
        const savedParts = loadPartsFromStorage();
        if (savedParts.length > 0) {
          setParts(savedParts);
        } else {
          // Fall back to initial data if no saved parts
          const initialParts = await getParts();
          setParts(initialParts);
        }
      } catch (error) {
        toast.error('Failed to load parts data');
        console.error('Error loading parts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadParts();
  }, []);

  // Generate unique ID for new parts
  // const generateId = (): string => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add new part to the list
  const handleAddPart = (newPart: Omit<Part, 'id' | 'addedAt'>) => {
    const partWithId: Part = {
      ...newPart,
      id: generateId(),
      addedAt: new Date().toISOString()
    };
    setParts(prevParts => [...prevParts, partWithId]);
    toast.success(`Added "${newPart.name}" to inventory`);
  };

  const handleDeletePart = (id: string) => {
    const updated = parts.filter((part) => part.id !== id);
    setParts(updated);
    saveParts(updated);
    toast.info("Part deleted");
  };

  const handleSortChange = (key: 'name' | 'quantity' | 'price') => {
    if (sortKey === key) {
      // Toggle sort order if same column
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // Change sort key and reset order to ascending
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSave = () => {
    saveParts(parts);
    toast.success("Save successful!");
  };

  // Save parts data to localStorage
  const handleSaveParts = async () => {
    try {
      setSaving(true);
      await saveParts(parts);
      toast.success('Save successful!');
    } catch (error) {
      toast.error('Failed to save parts data');
      console.error('Error saving parts:', error);
    } finally {
      setSaving(false);
    }
  };

  

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading parts inventory...</h2>
        </div>
      </div>
    );
  }

  const sortedParts = [...parts].sort((a, b) => {
    if (sortKey === 'name') return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    if (sortKey === 'quantity') return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    if (sortKey === 'price') return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParts = sortedParts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedParts.length / itemsPerPage);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading parts inventory...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Parts Inventory Management</h1>
        <p>Manage your parts inventory with ease</p>
      </header>

      <div className="sort-controls" style={{ marginBottom: '20px' }}>
        <span>Sort by: </span>
        <button onClick={() => handleSortChange('name')}>Name</button>
        <button onClick={() => handleSortChange('quantity')}>Quantity</button>
        <button onClick={() => handleSortChange('price')}>Price</button>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

      <div className="main-content">
        <PartForm onAddPart={handleAddPart} />
        <PartList
          parts={currentParts}
          onDeletePart={handleDeletePart}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>

  <span>Page {currentPage} of {totalPages}</span>

  <button 
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    style={{ marginLeft: '10px' }}
  >
    Next
  </button>
</div>

      </div>

      <div className="save-section">
        <button
          onClick={handleSaveParts}
          disabled={saving}
          className="btn btn-success"
          style={{ fontSize: '18px', padding: '15px 30px' }}
        >
          {saving ? 'Saving...' : 'Save Inventory'}
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
