// src/components/DailyDressingTrends.jsx

import React, { useState, useEffect } from 'react';
import './DailyDressingTrends.css';
import anime from 'animejs/lib/anime.es.js';

const DailyDressingTrends = () => {
  const [outfits, setOutfits] = useState([]);
  const [budgetRange, setBudgetRange] = useState(100);
  const [selectedStyle, setSelectedStyle] = useState('casual');
  
  // Mock data (would be replaced with actual API calls)
  useEffect(() => {
    const outfitData = [
      {
        id: 1,
        title: "Business Casual",
        description: "Perfect for office days with a relaxed dress code",
        priceRange: "$80-120",
        items: ["Button-down shirt", "Chinos", "Leather loafers"],
        budget: 90,
        style: "business",
        image: "business-casual"
      },
      {
        id: 2,
        title: "Weekend Casual",
        description: "Comfortable yet stylish for weekend errands",
        priceRange: "$50-90",
        items: ["T-shirt", "Jeans", "Sneakers"],
        budget: 70,
        style: "casual",
        image: "weekend-casual"
      },
      {
        id: 3,
        title: "Workout Ready",
        description: "Functional and trendy gym attire",
        priceRange: "$60-100",
        items: ["Moisture-wicking tee", "Athletic shorts", "Running shoes"],
        budget: 80,
        style: "active",
        image: "workout"
      },
      {
        id: 4,
        title: "Date Night",
        description: "Stylish ensemble for evening outings",
        priceRange: "$100-150",
        items: ["Blazer", "Slim fit pants", "Chelsea boots"],
        budget: 120,
        style: "formal",
        image: "date-night"
      },
      {
        id: 5,
        title: "Smart Casual",
        description: "Versatile look for various semi-formal occasions",
        priceRange: "$70-110",
        items: ["Polo shirt", "Khaki pants", "Desert boots"],
        budget: 85,
        style: "business",
        image: "smart-casual"
      },
      {
        id: 6,
        title: "Summer Relaxed",
        description: "Light and breezy for hot summer days",
        priceRange: "$40-80",
        items: ["Linen shirt", "Shorts", "Sandals"],
        budget: 60,
        style: "casual",
        image: "summer"
      }
    ];
    
    setOutfits(outfitData);
  }, []);

  useEffect(() => {
    // Animation for outfit cards
    anime({
      targets: '.outfit-card',
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
      duration: 800
    });
  }, [outfits, budgetRange, selectedStyle]);

  const filteredOutfits = outfits
    .filter(outfit => outfit.budget <= budgetRange)
    .filter(outfit => selectedStyle === 'all' || outfit.style === selectedStyle);

  return (
    <div className="dressing-trends-container">
      <h1 className="section-title">Daily Dressing Trends</h1>
      
      <div className="filters-container">
        <div className="filter-group">
          <label>Budget: ${budgetRange}</label>
          <input 
            type="range" 
            min="40" 
            max="150" 
            value={budgetRange} 
            onChange={(e) => setBudgetRange(e.target.value)}
            className="budget-slider"
          />
        </div>
        
        <div className="filter-group">
          <label>Style:</label>
          <div className="style-buttons">
            <button 
              className={`style-btn ${selectedStyle === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedStyle('all')}
            >
              All
            </button>
            <button 
              className={`style-btn ${selectedStyle === 'casual' ? 'active' : ''}`}
              onClick={() => setSelectedStyle('casual')}
            >
              Casual
            </button>
            <button 
              className={`style-btn ${selectedStyle === 'business' ? 'active' : ''}`}
              onClick={() => setSelectedStyle('business')}
            >
              Business
            </button>
            <button 
              className={`style-btn ${selectedStyle === 'formal' ? 'active' : ''}`}
              onClick={() => setSelectedStyle('formal')}
            >
              Formal
            </button>
            <button 
              className={`style-btn ${selectedStyle === 'active' ? 'active' : ''}`}
              onClick={() => setSelectedStyle('active')}
            >
              Active
            </button>
          </div>
        </div>
      </div>
      
      <div className="outfits-grid">
        {filteredOutfits.length > 0 ? (
          filteredOutfits.map(outfit => (
            <div key={outfit.id} className="outfit-card">
              <div className={`outfit-image ${outfit.image}`}>
                <div className="price-tag">{outfit.priceRange}</div>
              </div>
              <div className="outfit-content">
                <h3>{outfit.title}</h3>
                <p>{outfit.description}</p>
                <div className="outfit-items">
                  <h4>Includes:</h4>
                  <ul>
                    {outfit.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <button className="save-outfit-btn">Save Outfit</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No outfits match your current filters. Try adjusting your budget or style preferences.</p>
          </div>
        )}
      </div>
      
      <div className="budget-tip">
        <h3>Budget Friendly Tip</h3>
        <p>Create a capsule wardrobe with versatile pieces that can be mixed and matched to create multiple outfits, maximizing your clothing budget.</p>
      </div>
    </div>
  );
};

export default DailyDressingTrends;