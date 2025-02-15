import { useState } from 'react';
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from './Card';
import CardModal from './CardModal';

const List = ({ list, onAddCard, onDeleteCard, onDeleteList, dragHandleProps, onUpdateCard }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      onAddCard(list.id, newCardTitle.trim());
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleCardUpdate = (updatedCard) => {
    onUpdateCard(list.id, updatedCard);
    setSelectedCard(null);
  };

  return (
    <>
      <div className="bg-gray-100 rounded-xl shadow-md w-72 flex-shrink-0 max-h-[calc(100vh-10rem)] flex flex-col">
        <div 
          className="p-3 flex justify-between items-center cursor-move bg-white rounded-t-xl border-b border-gray-200"
          {...dragHandleProps}
        >
          <h3 className="font-semibold text-gray-800">{list.title}</h3>
          <button
            onClick={() => onDeleteList(list.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <Droppable droppableId={list.id} type="card">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 overflow-y-auto p-2 space-y-2"
            >
              {list.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transform transition-transform ${snapshot.isDragging ? 'rotate-2 scale-105' : ''}`}
                    >
                      <Card 
                        card={card} 
                        onDelete={() => onDeleteCard(list.id, card.id)}
                        onClick={() => setSelectedCard(card)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {isAddingCard ? (
          <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200">
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Enter card title"
              className="w-full p-2 rounded border border-gray-300 mb-2"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Card
              </button>
              <button
                type="button"
                onClick={() => setIsAddingCard(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className="p-2 border-t border-gray-200 text-gray-600 hover:bg-gray-300 py-2 rounded text-sm"
          >
            + Add a card
          </button>
        )}
      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          listTitle={list.title}
          onClose={() => setSelectedCard(null)}
          onSave={handleCardUpdate}
        />
      )}
    </>
  );
};

export default List;
