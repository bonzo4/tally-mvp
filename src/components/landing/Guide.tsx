export default function Guide() {
  return (
    <div className="flex flex-col h-[80vh] md:h-full space-y-5">
      <div>
        <h2 className="text-4xl font-bold">Guide</h2>
      </div>
      <div className="bg-blue-100 flex-1 p-3">
        <h1 className="text-xl font-bold">Instructions:</h1>
        <ol className="list-decimal list-inside mb-3">
          <li>Lorem ipsum </li>
          <li>Sed et eros id massa dictum semper</li>
          <li>Vestibulum quis tortor a sem lacinia finibus quis et est. Nulla suscipit diam ac interdum aliquam. Donec tristique, lectus quis molestie vestibulum, dui nibh venenatis dolor, non interdum erat turpis ut lectus.</li>
        </ol>
        <h1 className="text-xl font-bold">More Instructions:</h1>
        <ol className="list-decimal list-inside">
          <li>Lorem ipsum </li>
          <li>Sed et eros id massa dictum semper</li>
          <li>Vestibulum quis tortor a sem lacinia finibus quis et est. Nulla suscipit diam ac interdum aliquam. Donec tristique, lectus quis molestie vestibulum, dui nibh venenatis dolor, non interdum erat turpis ut lectus.</li>
        </ol>
      </div>
    </div>
  )
}

