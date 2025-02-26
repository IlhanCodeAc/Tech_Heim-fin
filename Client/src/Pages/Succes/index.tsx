import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 max-w-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your payment was processed successfully.</p>
        
       

        <a 
          href="/" 
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
