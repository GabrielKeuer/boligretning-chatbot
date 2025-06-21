// BoligRetning Chatbot Widget - Hosted on Vercel
(function() {
  // Create isolated container
  const chatContainer = document.createElement('div');
  chatContainer.id = 'br-chatbot-container';
  chatContainer.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  // Inject isolated styles
  const styles = `
    /* Critical: Reset all inherited styles */
    #br-chatbot-container,
    #br-chatbot-container * {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
    }
    
    /* Ensure proper display types */
    #br-chatbot-container div { display: block; }
    #br-chatbot-container span { display: inline; }
    #br-chatbot-container button { display: inline-block; }
    #br-chatbot-container input { display: inline-block; }
    #br-chatbot-container img { display: inline-block; max-width: 100%; }
    
    /* Chat button */
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
      z-index: 2147483647;
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
      max-height: calc(100vh - 110px);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      z-index: 2147483646;
      overflow: hidden;
      font-size: 14px;
      line-height: 1.5;
      color: #242833;
    }
    
    /* Mobile responsive */
    @media (max-width: 480px) {
      #br-chat-window {
        width: calc(100vw - 20px);
        height: calc(100vh - 100px);
        max-width: 400px;
        left: 10px;
        right: 10px;
        bottom: 80px;
      }
    }
    
    .br-header {
      background: linear-gradient(135deg, #f94b00 0%, #ff6b2b 100%);
      padding: 20px;
      color: white;
      flex-shrink: 0;
    }
    
    .br-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: white;
    }
    
    .br-header p {
      margin: 0;
      font-size: 12px;
      opacity: 0.9;
      color: white;
    }
    
    .br-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      overflow-x: hidden;
      background: #fafafa;
    }
    
    .br-messages::-webkit-scrollbar {
      width: 6px;
    }
    
    .br-messages::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
    }
    
    .br-messages::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    
    .br-input-area {
      padding: 20px;
      background: white;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
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
      word-wrap: break-word;
      text-align: left;
    }
    
    .br-bot-message .br-bubble {
      background: white;
      color: #242833;
      padding: 12px 18px;
      border-radius: 18px 18px 18px 4px;
      display: inline-block;
      max-width: 80%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      word-wrap: break-word;
    }
    
    .br-input-wrapper {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    .br-input {
      flex: 1;
      padding: 12px 18px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #f8f8f8;
      border-radius: 25px;
      color: #242833;
      font-size: 14px;
      outline: none;
      font-family: inherit;
    }
    
    .br-input:focus {
      border-color: #f94b00;
      background: white;
    }
    
    .br-input::placeholder {
      color: rgba(36, 40, 51, 0.5);
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
    
    #br-send-btn svg {
      width: 20px;
      height: 20px;
    }
    
    .br-typing {
      display: inline-block;
      padding: 12px 18px;
      background: white;
      border-radius: 18px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
      0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }
    
    /* Product carousel */
    .br-product-carousel {
      margin: 10px -18px 0 -18px;
      padding: 10px 18px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      display: flex;
      gap: 10px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
    }
    
    .br-product-carousel::-webkit-scrollbar {
      height: 6px;
    }
    
    .br-product-carousel::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }
    
    .br-product-carousel::-webkit-scrollbar-thumb {
      background: #f94b00;
      border-radius: 3px;
    }
    
    .br-product-card {
      flex: 0 0 180px;
      background: white;
      border-radius: 12px;
      padding: 12px;
      scroll-snap-align: start;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .br-product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    
    .br-product-image {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
      background: #f5f5f5;
    }
    
    .br-product-skeleton {
      width: 100%;
      height: 120px;
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
      font-size: 13px;
      font-weight: 600;
      color: #242833;
      margin-bottom: 5px;
      line-height: 1.3;
      max-height: 2.6em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .br-product-price {
      font-size: 15px;
      color: #f94b00;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .br-product-compare-price {
      font-size: 13px;
      color: #999;
      text-decoration: line-through;
      margin-left: 5px;
    }
    
    .br-view-btn {
      display: block;
      width: 100%;
      padding: 8px;
      background: #f94b00;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
      font-family: inherit;
    }
    
    .br-view-btn:hover {
      background: #e04000;
      transform: translateY(-1px);
    }
    
    /* Attention message */
    #br-attention-message {
      position: fixed;
      bottom: 90px;
      right: 90px;
      max-width: 280px;
      background: white;
      padding: 16px 20px;
      border-radius: 18px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      cursor: pointer;
      animation: slideInBounce 0.5s ease-out;
      z-index: 2147483645;
      font-size: 14px;
      line-height: 1.5;
      color: #242833;
    }
    
    /* Close button styles */
    .br-close-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      color: white;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    
    .br-close-btn:hover {
      opacity: 1;
    }
    
    /* Animations */
    @keyframes slideInBounce {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
      }
      60% {
        transform: translateY(-5px) scale(1.02);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;

  // Create and inject stylesheet
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Create chat HTML structure
  chatContainer.innerHTML = `
    <div id="br-chat-button">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>

    <div id="br-chat-window">
      <div class="br-header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3>BoligRetning Assistant</h3>
            <p>Vi hjælper dig med at finde det perfekte</p>
          </div>
          <button class="br-close-btn" id="br-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="br-messages" id="br-messages">
        <!-- Messages appear here -->
      </div>
      
      <div class="br-input-area">
        <div class="br-input-wrapper">
          <input 
            type="text" 
            class="br-input" 
            id="br-input" 
            placeholder="Skriv din besked her..."
            autocomplete="off"
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

  // Append container to body
  document.body.appendChild(chatContainer);

  // Chat functionality
  window.brChat = {
    sessionId: null,
    interactionId: null,
    conversationHistory: [],
    wasOpen: false,
    shopifyDomain: window.Shopify?.shop || window.location.hostname,
    
    init() {
      // Event listeners - using getElementById to ensure we get the right elements
      const chatButton = document.getElementById('br-chat-button');
      const closeButton = document.getElementById('br-close');
      const sendButton = document.getElementById('br-send-btn');
      const inputField = document.getElementById('br-input');
      
      if (chatButton) chatButton.onclick = () => this.toggle();
      if (closeButton) closeButton.onclick = () => this.close();
      if (sendButton) sendButton.onclick = () => this.sendMessage();
      if (inputField) {
        inputField.onkeypress = (e) => {
          if (e.key === 'Enter') this.sendMessage();
        };
      }
      
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
      
      // Show attention-grabbing message after 10 seconds
      if (!this.wasOpen && this.conversationHistory.length === 0) {
        setTimeout(() => {
          this.showAttentionMessage();
        }, 10000);
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
        const input = document.getElementById('br-input');
        if (input) input.focus();
      }, 100);
    },
    
    close() {
      const window = document.getElementById('br-chat-window');
      window.style.display = 'none';
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
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb2xwdXhibm9ubmdnd3BocnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4NjAsImV4cCI6MjA2NTQ3OTg2MH0.SMdQKI_ISIWb89WRJ79k1jB9OvjEXVgnLJKaoKkAUCg'
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
        // Build search context from conversation history
        const searchContext = this.buildSearchContext(message);
        
        const response = await fetch('https://kmolpuxbnonnggwphrxs.supabase.co/functions/v1/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb2xwdXhibm9ubmdnd3BocnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4NjAsImV4cCI6MjA2NTQ3OTg2MH0.SMdQKI_ISIWb89WRJ79k1jB9OvjEXVgnLJKaoKkAUCg'
          },
          body: JSON.stringify({
            message: message,
            search_context: searchContext,
            session_id: this.sessionId,
            conversation_history: this.conversationHistory.slice(-10)
          })
        });
        
        const data = await response.json();
        this.interactionId = data.interaction_id;
        
        this.hideTyping();
        
        // Check if products should be shown
        const shouldShowProducts = this.shouldShowProducts(message, data.response);
        const productsToShow = shouldShowProducts ? (data.products || []) : [];
        
        this.addMessage(data.response || 'Beklager, jeg forstod ikke det. Kan du prøve igen?', 'bot', true, productsToShow);
        
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
              <img src="${shopifyData.featured_image}" alt="${product.title}" class="br-product-image" onerror="this.src='https://via.placeholder.com/180x120?text=Billede+kommer'">
              <div class="br-product-title">${product.title}</div>
              <div class="br-product-price">
                ${price} kr
                ${comparePrice ? `<span class="br-product-compare-price">${comparePrice} kr</span>` : ''}
              </div>
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
    
    // Show attention-grabbing message
    showAttentionMessage() {
      // Create attention bubble
      const attentionDiv = document.createElement('div');
      attentionDiv.id = 'br-attention-message';
      
      // Get opening message from Supabase (A/B test)
      this.getOpeningPreview().then(message => {
        attentionDiv.innerHTML = `
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="flex-shrink: 0; width: 40px; height: 40px; background: #f94b00; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div style="flex: 1;">
              <p style="margin: 0; color: #242833; font-size: 14px; line-height: 1.4;">${message}</p>
              <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;">Klik for at chatte</p>
            </div>
            <button style="background: none; border: none; padding: 0; margin: -8px -12px 0 0; cursor: pointer; color: #999;" onclick="document.getElementById('br-attention-message').remove()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `;
        
        // Click handler
        attentionDiv.onclick = (e) => {
          if (!e.target.closest('button')) {
            this.open();
            attentionDiv.remove();
          }
        };
        
        document.body.appendChild(attentionDiv);
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
          if (document.getElementById('br-attention-message')) {
            attentionDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => attentionDiv.remove(), 300);
          }
        }, 15000);
      });
    },
    
    // Get opening message for preview
    async getOpeningPreview() {
      try {
        const response = await fetch('https://kmolpuxbnonnggwphrxs.supabase.co/functions/v1/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb2xwdXhibm9ubmdnd3BocnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4NjAsImV4cCI6MjA2NTQ3OTg2MH0.SMdQKI_ISIWb89WRJ79k1jB9OvjEXVgnLJKaoKkAUCg'
          },
          body: JSON.stringify({ is_opening_preview: true })
        });
        
        const data = await response.json();
        return data.preview || 'Hej! Kan jeg hjælpe dig med at finde noget specifikt? 🛋️';
      } catch (error) {
        return 'Hej! Kan jeg hjælpe dig med at finde noget specifikt? 🛋️';
      }
    },
    
    // Build search context from conversation history
    buildSearchContext(currentMessage) {
      const recentContext = [];
      
      for (let i = this.conversationHistory.length - 1; i >= 0 && recentContext.length < 3; i--) {
        const msg = this.conversationHistory[i];
        if (msg.role === 'user' && this.containsProductInfo(msg.content)) {
          recentContext.unshift(msg.content);
        }
      }
      
      recentContext.push(currentMessage);
      return recentContext.join(' ');
    },
    
    // Check if message contains product info
    containsProductInfo(message) {
      // Generiske produkt-relaterede ord (ikke kategorier)
      const generalProductTerms = [
        // Shopping intent
        'køb', 'købe', 'bestil', 'bestille', 'shop', 'handle',
        'find', 'finde', 'søg', 'søge', 'søger', 'leder', 'skal bruge',
        'vis', 'vise', 'se', 'har i', 'hvad har', 'kan du anbefale',
        
        // Pris relateret
        'pris', 'priser', 'koster', 'koster det', 'billig', 'billigt', 'billigste',
        'dyr', 'dyre', 'budget', 'tilbud', 'rabat', 'udsalg', 'spare',
        'under', 'over', 'mellem', 'max', 'kr', 'kroner', 'dkk',
        
        // Størrelse/mål
        'størrelse', 'stor', 'stort', 'store', 'lille', 'små', 'mellem',
        'bred', 'bredde', 'høj', 'højde', 'lang', 'længde', 'dyb', 'dybde',
        'cm', 'meter', 'm', 'millimeter', 'mm', 'tommer',
        
        // Farver
        'farve', 'farver', 'sort', 'sorte', 'hvid', 'hvide', 'grå', 'grå',
        'brun', 'brune', 'beige', 'blå', 'rød', 'røde', 'grøn', 'grønne',
        'gul', 'gule', 'orange', 'pink', 'lyse', 'mørk', 'mørke',
        
        // Materialer (generiske)
        'materiale', 'lavet af', 'fremstillet', 'træ', 'metal', 'stof',
        'plastik', 'plastic', 'glas', 'læder', 'bomuld', 'uld', 'polyester',
        
        // Kvalitet/egenskaber
        'kvalitet', 'god', 'gode', 'bedste', 'bedst', 'flot', 'flotte',
        'pæn', 'pæne', 'lækker', 'lækre', 'holdbar', 'slidstærk',
        'moderne', 'klassisk', 'stilren', 'elegant', 'praktisk',
        
        // Rum/placering (generisk)
        'til', 'rum', 'værelse', 'inde', 'inden', 'ude', 'uden',
        'udendørs', 'indendørs', 'hjem', 'hjemme', 'plads',
        
        // Behov/ønsker
        'skal', 'vil', 'ønsker', 'behov', 'brug for', 'mangler',
        'udskifte', 'udskift', 'nyt', 'nye', 'erstat', 'erstatte',
        
        // Sammenligning
        'eller', 'alternativ', 'lignende', 'magen', 'samme', 'forskellig',
        'bedre', 'værre', 'billigere', 'dyrere', 'større', 'mindre',
        
        // Antal
        'stk', 'styk', 'sæt', 'par', 'flere', 'mange', 'nogle',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
      ];
      
      const lowerMessage = message.toLowerCase();
      
      // Check for general product terms
      if (generalProductTerms.some(term => lowerMessage.includes(term))) {
        return true;
      }
      
      // Check for patterns that indicate product search
      const productPatterns = [
        /\d+\s*(x|×)\s*\d+/, // Dimensions like "60x90"
        /\d+\s*cm/, // Measurements
        /\d+\s*kr/, // Price mentions
        /\w+\s+(til|for|i)\s+\w+/, // "noget til stuen"
      ];
      
      if (productPatterns.some(pattern => pattern.test(lowerMessage))) {
        return true;
      }
      
      // Check if message is mostly nouns (likely product related)
      // Simple heuristic: short sentences with few verbs
      const words = lowerMessage.split(' ');
      if (words.length <= 5 && !lowerMessage.includes('?')) {
        return true;
      }
      
      return false;
    },
    
    // Determine if products should be shown
    shouldShowProducts(userMessage, botResponse) {
      // Explicit product request triggers
      const showProductTriggers = [
        // Direkte anmodninger
        'vis', 'vise', 'se', 'find', 'finde', 'søg', 'søge', 'søger',
        'hvilke', 'hvad har', 'kan du anbefale', 'anbefal', 'anbefalinger',
        'forslag', 'muligheder', 'alternativer', 'lignende', 'andre',
        'giv mig', 'jeg vil gerne', 'jeg søger', 'jeg leder',
        
        // Shopping intent
        'køb', 'købe', 'bestil', 'bestille', 'shop', 'shoppe',
        'pris', 'priser', 'hvad koster', 'tilbud', 'udsalg',
        
        // Sammenligning
        'sammenlign', 'forskel', 'bedste', 'billigste', 'eller'
      ];
      
      // Support/non-product triggers
      const hideProductTriggers = [
        // Support
        'hjælp', 'hvordan', 'hvornår', 'hvor lang', 'hvor meget tid',
        'levering', 'leveringstid', 'forsendelse', 'fragt', 'porto',
        'retur', 'returnere', 'returnering', 'bytte', 'ombytte',
        'garanti', 'reklamation', 'reklamere', 'klage',
        
        // Betaling/ordre
        'betaling', 'betale', 'faktura', 'regning', 'kvittering',
        'ordre', 'ordrenummer', 'track', 'spor', 'følg',
        'annuller', 'afbestil', 'fortryd',
        
        // Kontakt/generelt
        'kontakt', 'telefon', 'email', 'mail', 'adresse',
        'åbningstider', 'lukket', 'åben', 'ferie',
        'spørgsmål', 'problem', 'fejl', 'virker ikke',
        
        // Politik/vilkår
        'politik', 'vilkår', 'betingelser', 'privat', 'cookie',
        'medlemskab', 'nyhedsbrev', 'tilmeld', 'afmeld'
      ];
      
      const lowerMessage = userMessage.toLowerCase();
      const lowerResponse = botResponse.toLowerCase();
      
      // Check user message for explicit product requests
      if (showProductTriggers.some(trigger => lowerMessage.includes(trigger))) {
        return true;
      }
      
      // Check if it's a support question
      if (hideProductTriggers.some(trigger => lowerMessage.includes(trigger))) {
        return false;
      }
      
      // Check bot response for product indicators
      const botProductIndicators = [
        'her er', 'jeg har fundet', 'jeg fandt', 'disse produkter',
        'følgende produkter', 'kan anbefale', 'se disse', 'tjek disse',
        'populære', 'bestseller', 'kunderne elsker', 'top valg'
      ];
      
      if (botProductIndicators.some(indicator => lowerResponse.includes(indicator))) {
        return true;
      }
      
      // Pattern matching for implicit product requests
      const productRequestPatterns = [
        /noget til \w+/, // "noget til stuen"
        /\d+ kr/, // price mentions
        /\d+x\d+/, // dimensions
        /i \w+ farve/, // "i rød farve"
        /af \w+ materiale/, // "af træ materiale"
      ];
      
      if (productRequestPatterns.some(pattern => pattern.test(lowerMessage))) {
        return true;
      }
      
      // If message is very short and contains product info, likely wants products
      if (lowerMessage.length < 30 && this.containsProductInfo(lowerMessage)) {
        return true;
      }
      
      return false;
    },
    
    resetConversation() {
      this.conversationHistory = [];
      localStorage.removeItem('br_conversation_history');
      localStorage.removeItem('br_session_id');
      localStorage.removeItem('br_chat_open');
      this.sessionId = null;
      const messagesDiv = document.getElementById('br-messages');
      if (messagesDiv) messagesDiv.innerHTML = '';
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