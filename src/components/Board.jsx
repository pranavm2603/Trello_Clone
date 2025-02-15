import { useCallback, memo } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import List from './List';
import AddList from './AddList';
import useLocalStorage from '../hooks/useLocalStorage';

const Board = () => {
  const [lists, setLists] = useLocalStorage('kanban-lists', []);

  const handleAddList = useCallback((title) => {
    const newList = {
      id: `list-${Date.now()}`,
      title,
      cards: []
    };
    setLists(prevLists => [...prevLists, newList]);
  }, [setLists]);

  const handleDeleteList = useCallback((listId) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
  }, [setLists]);

  const handleAddCard = useCallback((listId, cardTitle) => {
    setLists(prevLists => prevLists.map(list => {
      if (list.id === listId) {
        const newCard = {
          id: `card-${Date.now()}`,
          title: cardTitle,
          description: '',
          dueDate: ''
        };
        return {
          ...list,
          cards: [...list.cards, newCard]
        };
      }
      return list;
    }));
  }, [setLists]);

  const handleDeleteCard = useCallback((listId, cardId) => {
    setLists(prevLists => prevLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      return list;
    }));
  }, [setLists]);

  const handleUpdateCard = useCallback((listId, updatedCard) => {
    setLists(prevLists => prevLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map(card => 
            card.id === updatedCard.id ? updatedCard : card
          )
        };
      }
      return list;
    }));
  }, [setLists]);

  const handleDragEnd = useCallback((result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle list reordering
    if (type === 'list') {
      setLists(prevLists => {
        const newLists = Array.from(prevLists);
        const [removed] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, removed);
        return newLists;
      });
      return;
    }

    // Handle card reordering
    setLists(prevLists => {
      const startList = prevLists.find(list => list.id === source.droppableId);
      const finishList = prevLists.find(list => list.id === destination.droppableId);
      const draggedCard = startList.cards[source.index];

      if (startList === finishList) {
        // Moving within the same list
        const newCards = Array.from(startList.cards);
        newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, draggedCard);

        return prevLists.map(list =>
          list.id === startList.id
            ? { ...list, cards: newCards }
            : list
        );
      } else {
        // Moving to a different list
        const startCards = Array.from(startList.cards);
        startCards.splice(source.index, 1);
        const finishCards = Array.from(finishList.cards);
        finishCards.splice(destination.index, 0, draggedCard);

        return prevLists.map(list => {
          if (list.id === startList.id) {
            return { ...list, cards: startCards };
          }
          if (list.id === finishList.id) {
            return { ...list, cards: finishCards };
          }
          return list;
        });
      }
    });
  }, [setLists]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <main 
            className="flex-1 bg-gray-50 overflow-x-auto overflow-y-hidden"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="flex gap-4 p-4 min-h-[calc(100vh-8rem)] items-start">
              <div className="flex gap-4">
                {lists.map((list, index) => (
                  <Draggable 
                    key={list.id} 
                    draggableId={list.id} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`${snapshot.isDragging ? 'rotate-2' : ''} transition-transform`}
                      >
                        <List
                          list={list}
                          onAddCard={handleAddCard}
                          onDeleteCard={handleDeleteCard}
                          onDeleteList={handleDeleteList}
                          onUpdateCard={handleUpdateCard}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <AddList onAddList={handleAddList} />
              </div>
            </div>
          </main>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(Board);