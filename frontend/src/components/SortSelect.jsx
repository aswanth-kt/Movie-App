export default function SortSelect({ sort, setSort }) {
    return (
        <select name="" id=""
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-3 rounded-lg bg-secondary text-gray-200 outline-none"
        >
            <option value="">Sort By</option>
            <option value="title">Title</option>   
            <option value="rating">Rating</option>
            <option value="releaseDate">Release Date</option>
        </select>
    )
}