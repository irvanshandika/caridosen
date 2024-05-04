import { useNavigate } from "react-router-dom";
import BanIcon from "@components/icons/BanIcon";

function Forbidden() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col min-h-[100vh]">
        <div className="mx-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-4 text-center space-y-4">
          <BanIcon className="h-24 w-24" />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">403 Forbidden</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Sorry, you don't have access to this page. Please contact support if you believe this is an error.</p>
          </div>
          <button
            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            onClick={() => navigate("/")}>
            Return to the website
          </button>
        </div>
      </div>
    </>
  );
}

export default Forbidden;
