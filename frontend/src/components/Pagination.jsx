export default function Pagination({ currentPage, setCurrentPage, totalPage }) {
    return (
        
        <div className="flex gap-2 mt-6 items-center justify-center">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 rounded-md border border-muted text-sm
                disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
                Prev
            </button>

            {
                [...Array(totalPage)].map((data, index) => {
                    return (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`border rounded-md px-3 py-1
                                ${currentPage === index + 1 
                                    ? "bg-accent hover:opacity-50" 
                                    : "border-muted hover:opacity-50"
                                }`
                            }
                        >
                            {index + 1}
                        </button>
                    );
                })
            }

            <button
                disabled={currentPage === totalPage}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 rounded-md border border-muted text-sm
                disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
                Next
            </button>
        </div>
    )
}