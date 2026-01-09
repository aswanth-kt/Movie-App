export default function SearchBar({ search, setSearch }) {
    return (
        <input 
            type="text"
            value={search}
            placeholder="Search by title or description..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-secondary text-gray-200 placehoder-muted outline-none focus:ring-2 focus:ring-accent"
        />
    )
}