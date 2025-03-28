import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; 

const ScrollToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button onClick={scrollToTop} style={scrollToTopButtonStyle} aria-label="Scroll to top">
          <ArrowUp size={24} color="white" />
        </button>
      )}
    </>
  );
};

const scrollToTopButtonStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  left: "20px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "50%",
  padding: "15px", 
  fontSize: "24px", 
  cursor: "pointer",
  zIndex: 1000,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
  transition: "opacity 0.3s ease",
};

export default ScrollToTopButton;
