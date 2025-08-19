import { useEffect } from "react";


const Pagination = ({ currentPage, totalPages, pageSize, setPageSize, setCurrentPage }: { currentPage: number; totalPages: number; pageSize: number; setPageSize: (size: number) => void; setCurrentPage: (page: number) => void }) => {
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const handlePrevious = () => {
        if (hasPrevious) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNext) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages, setCurrentPage])

    return (<div className="flex gap-2 justify-center items-center">
        <select className="p-2 border-2 rounded-lg bg-gray-100 hover:bg-gray-200" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
        <button className="p-2 border-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50" disabled={!hasPrevious} onClick={handlePrevious}>◀︎</button>
        <span className="p-2 font-bold">{currentPage} of {totalPages}</span>
        <button className="p-2 border-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50" disabled={!hasNext} onClick={handleNext}>▶︎</button>
    </div>)
}

export default Pagination