const STORAGE_KEY = 'kanban-lists';

export const saveListsToStorage = (lists) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getListsFromStorage = () => {
  try {
    const lists = localStorage.getItem(STORAGE_KEY);
    return lists ? JSON.parse(lists) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const clearBoard = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing board data:', error);
  }
};