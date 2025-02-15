import { useState, useEffect, useCallback, memo } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const CardModal = ({ card, listTitle, onClose, onSave }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  const [isEditing, setIsEditing] = useState(false);

  const modalRef = useOutsideClick(onClose);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSave({
      ...card,
      title: title.trim(),
      description: description.trim(),
      dueDate
    });
    setIsEditing(false);
  }, [card, title, description, dueDate, onSave]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xl font-bold p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Card Title"
                    autoFocus
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-32 p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Add a description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="text-sm text-gray-600">in list {listTitle}</p>
                  {dueDate && (
                    <div className="text-sm">
                      <span className="font-medium">Due Date: </span>
                      {new Date(dueDate).toLocaleDateString()}
                    </div>
                  )}
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {description || "No description provided."}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CardModal);