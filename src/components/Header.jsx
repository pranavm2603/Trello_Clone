import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const Header = ({ onResetBoard }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <>
      <header className="bg-primary-600 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Pranav's Board
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg 
                          text-sm sm:text-base transition-colors shadow-sm hover:shadow-md"
              >
                Reset Board
              </button>
            </div>
          </div>
        </div>
      </header>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          onResetBoard();
          setIsConfirmModalOpen(false);
        }}
        title="Reset Board"
        message="Are you sure you want to reset the board? This will delete all lists and cards and cannot be undone."
      />
    </>
  );
};

export default Header;