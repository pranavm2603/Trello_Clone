import { useState } from 'react';

const AddList = ({ onAddList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddList(title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <div 
        onClick={() => setIsAdding(true)}
        className="bg-gray-200 bg-opacity-80 hover:bg-opacity-100 w-72 rounded-lg p-4 h-fit cursor-pointer"
      >
        + Add another list
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-lg p-4 w-72">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title"
          className="w-full p-2 rounded border border-gray-300 mb-2"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add List
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddList;