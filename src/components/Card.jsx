const Card = ({ card, onDelete, onClick }) => {
    return (
      <div 
        onClick={onClick}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 cursor-pointer 
                   group border border-gray-200 hover:border-primary-200"
      >
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-h-[1.5rem]">
            <p className="text-gray-800">{card.title}</p>
            {card.dueDate && (
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(card.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 
                       transition-all p-1 rounded hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;