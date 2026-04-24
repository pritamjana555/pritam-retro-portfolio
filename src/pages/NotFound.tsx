import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import bgimage from "../assets/images/background.jpg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative p-4 z-10"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 -z-10" />
      <div className="text-white text-6xl font-bold">404 - Not Found</div>
      <div className="text-white text-lg mt-12">The page you are looking is lost in void.</div>
      <div className="text-white text-lg mt-4">Please check the URL or return to the homepage.</div>
      <div className="mt-8">
        <a href="/" className="text-retro-purple-light hover:underline">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;