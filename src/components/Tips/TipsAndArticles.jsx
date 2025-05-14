// src/components/TipsAndArticles.jsx

import React, { useState, useEffect } from 'react';
import './TipsAndArticles.css';
import anime from 'animejs/lib/anime.es.js';

const TipsAndArticles = () => {
  const [articles, setArticles] = useState([]);
  const [tips, setTips] = useState([]);
  const [activeTab, setActiveTab] = useState('tips');

  // Mock data (would be replaced with actual API calls)
  useEffect(() => {
    setTips([
      {
        id: 1,
        title: "Set up automatic savings",
        content: "Set up a recurring transfer to your savings account on payday to save without thinking about it.",
        icon: "piggy-bank"
      },
      {
        id: 2,
        title: "Use the 50/30/20 rule",
        content: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.",
        icon: "calculator"
      },
      {
        id: 3,
        title: "Track every expense",
        content: "Even small purchases add up. Track everything to understand your spending patterns.",
        icon: "chart-line"
      },
      {
        id: 4,
        title: "Pay yourself first",
        content: "Before paying your bills, put a portion of your income toward savings.",
        icon: "wallet"
      }
    ]);

    setArticles([
      {
        id: 1,
        title: "5 Steps to Financial Freedom",
        summary: "Learn how to achieve financial independence with these practical steps.",
        source: "Finance Today",
        imageUrl: "https://via.placeholder.com/100",
        readTime: "5 min"
      },
      {
        id: 2,
        title: "Investments for Beginners",
        summary: "A comprehensive guide to starting your investment journey on the right foot.",
        source: "Money Matters",
        imageUrl: "https://via.placeholder.com/100",
        readTime: "8 min"
      },
      {
        id: 3,
        title: "Emergency Fund Essentials",
        summary: "Why everyone needs an emergency fund and how to build one quickly.",
        source: "Smart Saver",
        imageUrl: "https://via.placeholder.com/100",
        readTime: "4 min"
      }
    ]);
  }, []);

  useEffect(() => {
    // Animation for tips cards
    anime({
      targets: '.tip-card',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
      duration: 800
    });

    // Animation for articles
    anime({
      targets: '.article-card',
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: anime.stagger(150),
      easing: 'easeOutElastic(1, .6)',
      duration: 1200
    });
  }, [activeTab]);

  return (
    <div className="tips-articles-container">
      <h1 className="section-title">Financial Insights</h1>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`} 
          onClick={() => setActiveTab('tips')}
        >
          Saving Tips
        </button>
        <button 
          className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`} 
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'tips' && (
          <div className="tips-grid">
            {tips.map(tip => (
              <div key={tip.id} className="tip-card">
                <div className="tip-icon">
                  <i className={`fas fa-${tip.icon}`}></i>
                </div>
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'articles' && (
          <div className="articles-list">
            {articles.map(article => (
              <div key={article.id} className="article-card">
                <div className="article-image">
                  <div className="image-placeholder"></div>
                </div>
                <div className="article-content">
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <div className="article-meta">
                    <span>{article.source}</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <button className="read-more-btn">Read More</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TipsAndArticles;