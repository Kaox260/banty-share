// src/utils.js
export const calculateDistance = async (start, end) => {
    // Même simulation que dans SearchPage.jsx
    return Math.random() * 20; 
  };
  
  export const calculatePrice = (distance, passengers) => {
    const base = distance < 5 ? 10 : 10 + (distance - 5) * 3;
    return base + passengers * 3;
  };