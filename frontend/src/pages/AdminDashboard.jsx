export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <form className="grid grid-cols-2 gap-4 bg-secondary p-6 rounded-xl">
        <input className="p-3 bg-primary rounded" placeholder="Title" />
        <input className="p-3 bg-primary rounded" placeholder="Rating" />
        <input className="p-3 bg-primary rounded" placeholder="Release Date" />
        <input className="p-3 bg-primary rounded" placeholder="Poster URL" />
        <textarea
          className="col-span-2 p-3 bg-primary rounded"
          placeholder="Description"
        />
        <button className="col-span-2 bg-accent text-primary py-3 rounded font-semibold">
          Add Movie
        </button>
      </form>
    </div>
  );
}
