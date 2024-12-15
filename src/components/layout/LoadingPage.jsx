export default function LoadingPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="bg-white w-full h-[calc(100vh-150px)] md:col-span-7 rounded-md p-4">
        <div className="h-24 w-full bg-stone-200 rounded-md mb-4" />
        <div className="w-full h-[calc(100vh-300px)] bg-stone-200 rounded-md" />
      </div>
      <div className="flex flex-col space-y-4 md:col-span-5">
        <div className="w-full h-1/2 bg-white rounded-md p-4">
          <div className="h-full w-full bg-stone-200 rounded-md mb-4" />
        </div>
        <div className="w-full h-48 bg-white rounded-md p-4">
          <div className="h-full w-full bg-stone-200 rounded-md mb-4" />
        </div>
      </div>
    </div>
  );
}
