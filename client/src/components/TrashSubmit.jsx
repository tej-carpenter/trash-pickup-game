// client/src/components/TrashSubmit.jsx
import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';

function TrashSubmit() {
  const [trashType, setTrashType] = useState('plastic');
  const [quantity, setQuantity] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const { submitTrash } = useSocket();

  const trashTypes = [
    { value: 'plastic', label: 'Plastic', emoji: '🥤', points: 10 },
    { value: 'paper', label: 'Paper', emoji: '📄', points: 5 },
    { value: 'glass', label: 'Glass', emoji: '🍶', points: 15 },
    { value: 'metal', label: 'Metal', emoji: '🥫', points: 20 },
    { value: 'organic', label: 'Organic', emoji: '🍎', points: 5 },
    { value: 'electronic', label: 'Electronic', emoji: '📱', points: 50 },
  ];

  const getCurrentPoints = () => {
    const selectedType = trashTypes.find(type => type.value === trashType);
    return selectedType.points * quantity;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      submitTrash(trashType, quantity);
      // Reset form
      setQuantity(1);
      setImagePreview(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Submit Trash Pickup</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="trashType" className="block text-gray-700 mb-2">
            Type of Trash
          </label>
          <select
            id="trashType"
            className="input w-full"
            value={trashType}
            onChange={(e) => setTrashType(e.target.value)}
          >
            {trashTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.emoji} {type.label} ({type.points} pts each)
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-gray-700 mb-2">
            Quantity ({trashTypes.find(t => t.value === trashType).points} points each)
          </label>
          <input
            type="number"
            id="quantity"
            className="input w-full"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Upload Photo
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="input w-full"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg max-h-48 object-contain"
              />
              <button
                type="button"
                className="text-red-500 text-sm mt-1"
                onClick={() => setImagePreview(null)}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <button type="submit" className="btn btn-primary w-full">
            Submit Pickup
          </button>
          <p className="text-center text-gray-500 text-sm mt-2">
            You'll receive {getCurrentPoints()} points for this submission
          </p>
        </div>
      </form>
    </div>
  );
}

export default TrashSubmit;