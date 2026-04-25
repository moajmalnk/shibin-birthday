import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Trash2, Edit3, LayoutGrid, List } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import './RSVP.css';

const RSVP = () => {
  const [formData, setFormData] = useState({ name: '', email: '', guests: 1, message: '' });
  const [guestList, setGuestList] = useState([
    { id: 1, name: 'John Doe', guests: 2, status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', guests: 1, status: 'Confirmed' },
  ]);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // delete, success
  const [selectedGuest, setSelectedGuest] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setModalType('success');
    setIsModalOpen(true);
    setGuestList([...guestList, { ...formData, id: Date.now(), status: 'Confirmed' }]);
    setFormData({ name: '', email: '', guests: 1, message: '' });
  };

  const handleDeleteClick = (guest) => {
    setSelectedGuest(guest);
    setModalType('delete');
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setGuestList(guestList.filter(g => g.id !== selectedGuest.id));
    setIsModalOpen(false);
    setSelectedGuest(null);
  };

  return (
    <div className="rsvp-page">
      <div className="grid-container">
        <header className="page-header">
          <h1 className="page-title">RSVP to the Party</h1>
          <p className="page-subtitle">Let us know if you're coming so we can prepare the best celebration!</p>
        </header>

        {/* RSVP Form */}
        <div className="rsvp-form-container card glass">
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                className="form-input" 
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                className="form-input" 
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <select 
                className="form-input"
                value={formData.guests}
                onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea 
                className="form-input" 
                rows="4" 
                placeholder="Any dietary requirements or birthday wishes?"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <Button type="submit" className="w-full">Submit RSVP</Button>
          </form>
        </div>

        {/* Guest List Section */}
        <div className="guest-list-section">
          <div className="section-header">
            <h2>Guest List</h2>
            <div className="view-toggles">
              <button 
                className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`} 
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`} 
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <div className={`guest-display ${viewMode}-view`}>
            {guestList.length === 0 ? (
              <div className="empty-state card">
                <p>No guests have RSVP'd yet. Be the first!</p>
              </div>
            ) : (
              guestList.map(guest => (
                <div key={guest.id} className="guest-card card">
                  <div className="guest-info">
                    <h3>{guest.name}</h3>
                    <p>{guest.guests} {guest.guests === 1 ? 'Guest' : 'Guests'}</p>
                  </div>
                  <div className="guest-actions">
                    <button className="icon-btn" title="Edit"><Edit3 size={16} /></button>
                    <button 
                      className="icon-btn delete" 
                      title="Remove"
                      onClick={() => handleDeleteClick(guest)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <Modal 
        isOpen={isModalOpen && modalType === 'delete'} 
        onClose={() => setIsModalOpen(false)}
        title="Confirm Removal"
        size="small"
      >
        <div className="modal-inner">
          <p>Are you sure you want to remove <strong>{selectedGuest?.name}</strong> from the guest list?</p>
          <div className="modal-actions">
            <Button variant="glass" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Confirm Delete</Button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isModalOpen && modalType === 'success'} 
        onClose={() => setIsModalOpen(false)}
        title="RSVP Confirmed!"
        size="small"
      >
        <div className="modal-inner text-center">
          <CheckCircle2 size={64} className="text-primary mx-auto mb-4" />
          <p>Thank you for joining the celebration! Your RSVP has been successfully recorded.</p>
          <Button onClick={() => setIsModalOpen(false)} className="mt-6">Awesome!</Button>
        </div>
      </Modal>
    </div>
  );
};

export default RSVP;
