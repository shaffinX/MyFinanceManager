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
        title: "Investing Money for Beginners",
        summary: "Investing seems like a big commitment that requires a lot of money and knowledge, right? Wrong.",
        source: "Go Banking",
        imageUrl: "https://cdn.gobankingrates.com/wp-content/uploads/2023/08/investing-woman-iStock-538568372.jpg?w=675&quality=75&webp=1",
        readTime: "7 min",
        url:"https://www.gobankingrates.com/investing/strategy/investing-for-beginners/"
      },
      {
        id: 2,
        title: "How to Invest Money in 2025: The Smart Beginner's Guide",
        summary: "Explore diverse real estate investment avenues, including rental properties, flips, crowdfunding, and REITs, suitable for beginners.",
        source: "FinanceBuzz",
        imageUrl: "https://cdn.financebuzz.com/fit-in/1140x0/filters:quality(70)/images/2020/09/03/man-trading-stock-market.jpg",
        readTime: "6 min",
        url:"https://financebuzz.com/how-to-invest-money"
      },
      {
        id: 3,
        title: "7 Investment Tips for Stock Market Beginners",
        summary: "Essential tips for newcomers to the stock market, emphasizing diversification, ethical investing, and thorough research.",
        source: "MoneyMagpie",
        imageUrl: "https://www.moneymagpie.com/wp-content/uploads/2023/03/rsz_shutterstock_543073813.jpg.webp",
        readTime: "5 min",
        url:"https://www.moneymagpie.com/investment-articles/7-investment-tips-for-stock-market-beginners"
      },
      {
        id: 4,
        title: "7 Best Investments for Beginners in 2025",
        summary: "A comprehensive look at beginner-friendly investments, including index fund ETFs and micro-investing platforms.",
        source: "Invest1NOW",
        imageUrl: "https://invest1now.com/wp-content/uploads/2024/06/image_2024-06-09_160924343.png",
        readTime: "6 min",
        url:"https://invest1now.com/2025/02/09/7-best-investments-for-beginners-in-2025/"
      },
      {
        id: 5,
        title: "The 10 Best Investments for Beginners in 2025",
        summary: "An overview of top investment options for beginners, highlighting high-yield savings accounts, CDs, and mutual funds.",
        source: "WallStreetZen",
        imageUrl: "https://www.wallstreetzen.com/blog/wp-content/uploads/2024/03/pexels-cottonbro-studio-3943716-2000x1333.jpg",
        readTime: "5 min",
        url:"https://www.wallstreetzen.com/blog/best-investments-for-beginners/"
      },
      {
        id: 6,
        title: "11 best investments for beginners to become rich faster",
        summary: "Digital currencies have many advantages, including eliminating third-party gatekeepers like banks, instant settlement transaction times, significantly lower transaction fees, and low-friction transfers to anywhere with an Internet connection. Those bitcoin benefits can be beneficial to almost any small business.",
        source: "Tech Bullion",
        imageUrl: "https://techbullion.com/wp-content/uploads/2022/07/best-investments.jpg",
        readTime: "6 min",
        url:"https://techbullion.com/11-best-investments-for-beginners-to-become-rich-faster/"
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
                  <div className="image-placeholder">
                    <img src={article.imageUrl} alt={article.title} />
                  </div>
                </div>
                <div className="article-content">
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <div className="article-meta">
                    <span>{article.source}</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <button
                    className="read-more-btn"
                    onClick={() => {
                      if (article.url) {
                        window.open(article.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    Read More
                  </button>
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