// BoligRetning Chatbot Widget - Hosted on Vercel
(function() {
  // Inject styles
  const styles = `
    /* Glassmorphism Chat Widget */
    #br-chat-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: #f94b00;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(249, 75, 0, 0.3);
      transition: all 0.3s ease;
      z-index: 9999;
    }
    
    #br-chat-button:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 40px rgba(249, 75, 0, 0.4);
    }
    
    #br-chat-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 600px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(36, 40, 51, 0.2);
      display: none;
      flex-direction: column;
      z-index: 9998;
      overflow: hidden;
    }
    
    /* Mobile responsive */
    @media (max-width: 480px) {
      #br-chat-window {
        width: calc(100% - 20px);
        height: calc(100vh - 100px);
        max-width: 400px;
        left: 10px;
        right: 10px;
      }
    }
    
    .br-header {
      background: linear-gradient(135deg, #f94b00 0%, #ff6b2b 100%);
      padding: 20px;
      color: white;
    }
    
    .br-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: rgba(255, 255, 255, 0.05);
    }
    
    .br-input-area {
      padding: 20px;
      background: rgba(36, 40, 51, 0.1);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .br-message {
      margin-bottom: 16px;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .br-user-message {
      text-align: right;
    }
    
    .br-user-message .br-bubble {
      background: #f94b00;
      color: white;
      padding: 12px 18px;
      border-radius: 18px 18px 4px 18px;
      display: inline-block;
      max-width: 80%;
    }
    
    .br-bot-message .br-bubble {
      background: rgba(255, 255, 255, 0.9);
      color: #242833;
      padding: 12px 18px;
      border-radius: 18px 18px 18px 4px;
      display: inline-block;
      max-width: 80%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    /* Font sizes */
    @media (min-width: 768px) {
      .br-bubble {
        font-size: 14px;
      }
    }
    
    @media (max-width: 767px) {
      .br-bubble {
        font-size: 16px;
      }
    }
    
    .br-input {
      width: calc(100% - 50px);
      padding: 12px 18px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 25px;
      color: #242833;
      font-size: 14px;
      outline: none;
    }
    
    .br-input:focus {
      border-color: #f94b00;
      background: rgba(255, 255, 255, 0.2);
    }
    
    .br-input::placeholder {
      color: rgba(36, 40, 51, 0.6);
    }
    
    #br-send-btn {
      background: #f94b00;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    
    #br-send-btn:hover {
      background: #e04000;
      transform: scale(1.05);
    }
    
    .br-typing {
      display: inline-block;
      padding: 12px 18px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 18px;
    }
    
    .br-typing span {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #f94b00;
      margin: 0 2px;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    
    .br-typing span:nth-child(1) { animation-delay: -0.32s; }
    .br-typing span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    
    /* Product carousel styles */
    .br-product-carousel {
      margin: 10px 0;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      display: flex;
      gap: 10px;
      padding: 10px 0;
      -webkit-overflow-scrolling: touch;
    }
    
    .br-product-carousel::-webkit-scrollbar {
      height: 6px;
    }
    
    .br-product-carousel::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    .br-product-carousel::-webkit-scrollbar-thumb {
      background: #f94b00;
      border-radius: 3px;
    }
    
    .br-product-card {
      flex: 0 0 200px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 12px;
      scroll-snap-align: start;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .br-product-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
    
    .br-product-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    
    .br-product-skeleton {
      width: 100%;
      height: 150px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    .br-product-title {
      font-size: 14px;
      font-weight: 600;
      color: #242833;
      margin-bottom: 5px;
      line-height: 1.3;
      max-height: 2.6em;
      overflow: hidden;
    }
    
    .br-product-price {
      font-size: 16px;
      color: #f94b00;
      font-weight: bold;
    }
    
    .br-product-compare-price {
      font-size: 14px;
      color: #999;
      text-decoration: line-through;
    }
    
    .br-view-btn {
      display: block;
      width: 100%;
      padding: 8px;
      margin-top: 10px;
      background: #f94b00;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .br-view-btn:hover {
      background: #e04000;
    }
  `;

  // Inject styles into page
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Create chat HTML
  const chatHTML = `
    <div id="br-chat-button">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>

    <div id="br-chat-window">
      <div class="br-header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="margin: 0; font-size: 18px;">BoligRetning Assistant</h3>
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">Vi hjælper dig med at finde det perfekte</p>
          </div>
          <div id="br-close" style="cursor: pointer; padding: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="br-messages" id="br-messages">
        <!-- Messages appear here -->
      </div>
      
      <div class="br-input-area">
        <div style="display: flex; gap: 10px; align-items: center;">
          <input 
            type="text" 
            class="br-input" 
            id="br-input" 
            placeholder="Skriv din besked her..."
          >
          <button id="br-send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polyline points="22 2 15 22 11 13 2 9 22 2"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Inject HTML into page
  const chatContainer = document.createElement('div');
  chatContainer.innerHTML = chatHTML;
  document.body.appendChild(chatContainer);

  // Chat functionality
  window.brChat = {
    sessionId: null,
    interactionId: null,
    conversationHistory: [],
    wasOpen: false,
    shopifyDomain: window.Shopify?.shop || window.location.hostname,
    
    init() {
      // Event listeners
      document.getElementById('br-chat-button').onclick = () => this.toggle();
      document.getElementById('br-close').onclick = () => this.close();
      document.getElementById('br-send-btn').onclick = () => this.sendMessage();
      document.getElementById('br-input').onkeypress = (e) => {
        if (e.key === 'Enter') this.sendMessage();
      };
      
      // Get existing session and conversation history
      this.sessionId = localStorage.getItem('br_session_id');
      const savedHistory = localStorage.getItem('br_conversation_history');
      if (savedHistory) {
        this.conversationHistory = JSON.parse(savedHistory);
      }
      
      // Check if chat was open before navigation
      this.wasOpen = localStorage.getItem('br_chat_open') === 'true';
      
      // Reopen chat if it was open
      if (this.wasOpen) {
        setTimeout(() => {
          this.open();
          this.reloadMessages();
        }, 500);
      }
    },
    
    toggle() {
      const window = document.getElementById('br-chat-window');
      if (window.style.display === 'flex') {
        this.close();
      } else {
        this.open();
      }
    },
    
    open() {
      const window = document.getElementById('br-chat-window');
      window.style.display = 'flex';
      localStorage.setItem('br_chat_open', 'true');
      
      if (!this.sessionId && this.conversationHistory.length === 0) {
        this.getOpeningMessage();
      }
      
      // Focus input
      setTimeout(() => {
        document.getElementById('br-input').focus();
      }, 100);
    },
    
    close() {
      document.getElementById('br-chat-window').style.display = 'none';
      localStorage.setItem('br_chat_open', 'false');
    },
    
    reloadMessages() {
      const messagesDiv = document.getElementById('br-messages');
      messagesDiv.innerHTML = '';
      
      this.conversationHistory.forEach((msg) => {
        if (msg.role === 'user') {
          this.addMessage(msg.content, 'user', false);
        } else {
          this.addMessage(msg.content, 'bot', false);
        }
      });
    },
    
    async getOpeningMessage() {
      this.showTyping();
      
      try {
        const response = await fetch('https://kmolpuxbnonnggwphrxs.supabase.co/functions/v1/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb2xwdXhibm9ubmdnd3BocnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4NjAsImV4cCI6MjA2NTQ3OTg2MH0.SMdQKI_ISIWb89WRJ79k1jB9OvjEXVgnLJKaoKkAUCg'
          },
          body: JSON.stringify({ is_opening_request: true })
        });
        
        const data = await response.json();
        this.sessionId = data.session_id;
        this.interactionId = data.interaction_id;
        localStorage.setItem('br_session_id', this.sessionId);
        
        this.hideTyping();
        this.addMessage(data.response || 'Hej! Jeg er her for at hjælpe dig med at finde de perfekte møbler. Hvad leder du efter i dag?', 'bot');
        
      } catch (error) {
        this.hideTyping();
        this.addMessage('Hej! Jeg er her for at hjælpe dig med at finde de perfekte møbler. Hvad leder du efter i dag?', 'bot');
      }
    },
    
    async sendMessage() {
      const input = document.getElementById('br-input');
      const message = input.value.trim();
      
      if (!message) return;
      
      this.addMessage(message, 'user');
      input.value = '';
      
      this.showTyping();
      
      try {
        const response = await fetch('https://kmolpuxbnonnggwphrxs.supabase.co/functions/v1/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb2xwdXhibm9ubmdnd3BocnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4NjAsImV4cCI6MjA2NTQ3OTg2MH0.SMdQKI_ISIWb89WRJ79k1jB9OvjEXVgnLJKaoKkAUCg'
          },
          body: JSON.stringify({
            message: message,
            session_id: this.sessionId,
            conversation_history: this.conversationHistory.slice(-10)
          })
        });
        
        const data = await response.json();
        this.interactionId = data.interaction_id;
        
        this.hideTyping();
        
        // Send products with the message
        this.addMessage(data.response || 'Beklager, jeg forstod ikke det. Kan du prøve igen?', 'bot', true, data.products || []);
        
      } catch (error) {
        console.error('Chat error:', error);
        this.hideTyping();
        this.addMessage('Beklager, noget gik galt. Prøv igen om lidt.', 'bot');
      }
    },
    
    async fetchProductByHandle(handle) {
      try {
        const response = await fetch(`/products/${handle}.js`);
        return await response.json();
      } catch (e) {
        console.error('Failed to fetch product:', handle);
        return null;
      }
    },
    
    addMessage(text, sender, saveToHistory = true, products = []) {
      const messagesDiv = document.getElementById('br-messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = `br-message br-${sender}-message`;
      
      messageDiv.innerHTML = `<div class="br-bubble">${text}</div>`;
      
      // If there are products, add carousel
      if (sender === 'bot' && products && products.length > 0) {
        const carouselDiv = document.createElement('div');
        carouselDiv.className = 'br-product-carousel';
        
        products.forEach(async (product) => {
          const productCard = document.createElement('div');
          productCard.className = 'br-product-card';
          productCard.setAttribute('data-product-id', product.id);
          
          // Show skeleton first
          productCard.innerHTML = `
            <div class="br-product-skeleton"></div>
            <div class="br-product-title">${product.title}</div>
            <div class="br-product-price">Henter pris...</div>
          `;
          carouselDiv.appendChild(productCard);
          
          // Fetch Shopify data
          const shopifyData = await this.fetchProductByHandle(product.handle);
          
          if (shopifyData && shopifyData.available) {
            const price = (shopifyData.price / 100).toFixed(0);
            const comparePrice = shopifyData.compare_at_price ? (shopifyData.compare_at_price / 100).toFixed(0) : null;
            
            productCard.innerHTML = `
              <img src="${shopifyData.featured_image}" alt="${product.title}" class="br-product-image" onerror="this.src='https://via.placeholder.com/200x150?text=Billede+kommer'">
              <div class="br-product-title">${product.title}</div>
              <div class="br-product-price">${price} kr</div>
              ${comparePrice ? `<div class="br-product-compare-price">${comparePrice} kr</div>` : ''}
              <button class="br-view-btn" onclick="window.location.href='/products/${product.handle}'">
                Se produkt
              </button>
            `;
          } else {
            productCard.remove();
          }
        });
        
        messageDiv.appendChild(carouselDiv);
      }
      
      messagesDiv.appendChild(messageDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      
      if (saveToHistory) {
        this.conversationHistory.push({
          role: sender === 'user' ? 'user' : 'assistant',
          content: text
        });
        localStorage.setItem('br_conversation_history', JSON.stringify(this.conversationHistory));
      }
    },
    
    showTyping() {
      const messagesDiv = document.getElementById('br-messages');
      const typingDiv = document.createElement('div');
      typingDiv.className = 'br-message br-bot-message';
      typingDiv.id = 'br-typing';
      typingDiv.innerHTML = '<div class="br-typing"><span></span><span></span><span></span></div>';
      messagesDiv.appendChild(typingDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },
    
    hideTyping() {
      const typing = document.getElementById('br-typing');
      if (typing) typing.remove();
    },
    
    resetConversation() {
      this.conversationHistory = [];
      localStorage.removeItem('br_conversation_history');
      localStorage.removeItem('br_session_id');
      localStorage.removeItem('br_chat_open');
      this.sessionId = null;
      document.getElementById('br-messages').innerHTML = '';
      this.getOpeningMessage();
    }
  };

  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.brChat.init());
  } else {
    window.brChat.init();
  }
})();
