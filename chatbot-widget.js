// BoligRetning Chatbot Widget - Complete Version med Produktvisning
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
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 0, 0, 0.1);
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
      background: white;
    }
    
    .br-input-area {
      padding: 20px;
      background: rgba(250, 250, 250, 1);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
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
      background: rgba(245, 245, 245, 1);
      color: #242833;
      padding: 12px 18px;
      border-radius: 18px 18px 18px 4px;
      display: inline-block;
      max-width: 80%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    /* Styling for links in bot messages */
    .br-bot-message .br-bubble a {
      color: #f94b00;
      font-weight: 600;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s ease;
    }
    
    .br-bot-message .br-bubble a:hover {
      border-bottom-color: #f94b00;
    }
    
    /* Mindre tekst på desktop */
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
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: white;
      border-radius: 25px;
      color: #242833;
      font-size: 14px;
      outline: none;
    }
    
    .br-input:focus {
      border-color: #f94b00;
      background: white;
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
      background: rgba(245, 245, 245, 1);
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
    
    /* Attention message styling */
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
      z-index: 9997;
    }
    
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
    
    /* PRODUKTKORT STYLING */
    .br-products-container {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding: 12px 0;
      margin: 8px -18px 0 -18px;
      padding-left: 18px;
      padding-right: 18px;
      scrollbar-width: thin;
      scrollbar-color: rgba(249, 75, 0, 0.3) transparent;
    }
    
    .br-products-container::-webkit-scrollbar {
      height: 6px;
    }
    
    .br-products-container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }
    
    .br-products-container::-webkit-scrollbar-thumb {
      background: rgba(249, 75, 0, 0.3);
      border-radius: 3px;
    }
    
    .br-product-card {
      flex: 0 0 160px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      cursor: pointer;
      text-decoration: none;
      display: block;
    }
    
    .br-product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    
    .br-product-card img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      background: #f5f5f5;
    }
    
    .br-product-card-content {
      padding: 12px;
    }
    
    .br-product-title {
      font-size: 13px;
      font-weight: 600;
      color: #242833;
      margin: 0 0 4px 0;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .br-product-price {
      font-size: 16px;
      font-weight: 700;
      color: #f94b00;
      margin: 0;
    }
    
    .br-product-stock {
      font-size: 11px;
      color: #666;
      margin-top: 4px;
    }
    
    .br-product-stock.low-stock {
      color: #d73502;
      font-weight: 600;
    }
    
    /* Quick replies styling */
    .br-quick-replies {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 12px;
      padding: 0 18px;
    }
    
    .br-quick-reply {
      background: white;
      border: 1px solid #f94b00;
      color: #f94b00;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    
    .br-quick-reply:hover {
      background: #f94b00;
      color: white;
    }
  `;

  // Inject styles
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
            onkeypress="if(event.key==='Enter')brChat.sendMessage()"
          >
          <button id="br-send-btn" onclick="brChat.sendMessage()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polyline points="22 2 15 22 11 13 2 9 22 2"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Inject HTML
  const chatContainer = document.createElement('div');
  chatContainer.innerHTML = chatHTML;
  document.body.appendChild(chatContainer);

  // Chat functionality
  const brChat = {
    sessionId: null,
    interactionId: null,
    conversationHistory: [],
    wasOpen: false,
    
    init() {
      document.getElementById('br-chat-button').onclick = () => this.toggle();
      document.getElementById('br-close').onclick = () => this.close();
      
      // Check if session is expired (24 hours)
      const lastActivity = localStorage.getItem('br_last_activity');
      const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      if (lastActivity && parseInt(lastActivity) < twentyFourHoursAgo) {
        // Session expired - clear everything
        this.resetConversation();
        console.log('Chat session expired after 24 hours');
      } else {
        // Get existing session and conversation history
        this.sessionId = localStorage.getItem('br_session_id');
        const savedHistory = localStorage.getItem('br_conversation_history');
        if (savedHistory) {
          this.conversationHistory = JSON.parse(savedHistory);
        }
      }
      
      // Update last activity
      this.updateLastActivity();
      
      // Hvis ny session - hent opening message MED DET SAMME
      if (!this.sessionId || this.conversationHistory.length === 0) {
        this.getOpeningMessage();
      }
      
      // Check om chatten var åben før navigation
      this.wasOpen = localStorage.getItem('br_chat_open') === 'true';
      
      // Genåbn chat hvis den var åben
      if (this.wasOpen) {
        setTimeout(() => {
          this.open();
          // Genindlæs beskeder
          this.reloadMessages();
        }, 500);
      }
      
      // Show attention message after 5 seconds
      if (!this.wasOpen) {
        setTimeout(() => {
          this.showAttentionMessage();
        }, 5000);
      }
      
      // Check for expiry every hour
      setInterval(() => {
        const lastActivity = localStorage.getItem('br_last_activity');
        const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
        
        if (lastActivity && parseInt(lastActivity) < twentyFourHoursAgo) {
          this.resetConversation();
          if (document.getElementById('br-chat-window').style.display === 'flex') {
            this.addMessage('Din session er udløbet efter 24 timer. Lad os starte forfra! 😊', 'bot');
          }
        }
      }, 60 * 60 * 1000); // Check every hour
    },
    
    updateLastActivity() {
      localStorage.setItem('br_last_activity', Date.now().toString());
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
      // Check if session expired before opening
      const lastActivity = localStorage.getItem('br_last_activity');
      const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      if (lastActivity && parseInt(lastActivity) < twentyFourHoursAgo) {
        // Session expired - reset before opening
        this.resetConversation();
      }
      
      const window = document.getElementById('br-chat-window');
      window.style.display = 'flex';
      localStorage.setItem('br_chat_open', 'true');
      
      // Update activity timestamp
      this.updateLastActivity();
      
      // Beskeden er allerede hentet i init()
    },
    
    close() {
      document.getElementById('br-chat-window').style.display = 'none';
      localStorage.setItem('br_chat_open', 'false');
    },
    
    reloadMessages() {
      // Genindlæs alle beskeder fra historik
      const messagesDiv = document.getElementById('br-messages');
      messagesDiv.innerHTML = '';
      
      this.conversationHistory.forEach((msg, index) => {
        if (msg.role === 'user') {
          this.addMessage(msg.content, 'user', false);
        } else {
          this.addMessage(msg.content, 'bot', false);
        }
      });
    },
    
    // Show attention-grabbing message
    showAttentionMessage() {
      // Tjek om vi har en besked i history
      if (this.conversationHistory.length === 0) return;
      
      // Find første bot besked
      const firstBotMessage = this.conversationHistory.find(msg => msg.role === 'assistant');
      if (!firstBotMessage) return;
      
      const attentionDiv = document.createElement('div');
      attentionDiv.id = 'br-attention-message';
      
      attentionDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="flex-shrink: 0; width: 40px; height: 40px; background: #f94b00; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0; color: #242833; font-size: 14px; line-height: 1.4;">${firstBotMessage.content}</p>
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
    },
    
    async getOpeningMessage() {
      const isOpen = document.getElementById('br-chat-window').style.display === 'flex';
      
      if (isOpen) {
        this.showTyping();
      }
      
      try {
        const response = await fetch('https://kmolpuxbnonnggwphrxs.supabase.co/functions/v1/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb2xwdXhibm9ubmdnd3BocnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4NjAsImV4cCI6MjA2NTQ3OTg2MH0.SMdQKI_ISIWb89WRJ79k1jB9OvjEXVgnLJKaoKkAUCg'
          },
          body: JSON.stringify({ 
            is_opening_request: true,
            session_id: this.sessionId
          })
        });
        
        const data = await response.json();
        this.sessionId = data.session_id;
        this.interactionId = data.interaction_id;
        localStorage.setItem('br_session_id', this.sessionId);
        
        if (isOpen) {
          this.hideTyping();
        }
        
        this.addMessage(data.response || 'Hej! Jeg er her for at hjælpe dig med at finde de perfekte møbler. Hvad leder du efter i dag?', 'bot');
        
      } catch (error) {
        if (isOpen) {
          this.hideTyping();
        }
        this.addMessage('Hej! Jeg er her for at hjælpe dig med at finde de perfekte møbler. Hvad leder du efter i dag?', 'bot');
      }
    },
    
    async sendMessage() {
      const input = document.getElementById('br-input');
      const message = input.value.trim();
      
      if (!message) return;
      
      this.addMessage(message, 'user');
      input.value = '';
      
      // Update last activity
      this.updateLastActivity();
      
      // Show typing
      this.showTyping();
      
      try {
        const response = await fetch('https://kmolpuxbnonnggwphrxs.supabase.co/functions/v1/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb2xwdXhibm9ubmdnd3BocnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4NjAsImV4cCI6MjA2NTQ3OTg2MH0.SMdQKI_ISIWb89WRJ79k1jB9OvjEXVgnLJKaoKkAUCg'
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
        
        // Process the response to convert markdown links to HTML
        let processedResponse = data.response || 'Beklager, jeg forstod ikke det. Kan du prøve igen?';
        
        // Convert markdown links to HTML links
        processedResponse = processedResponse.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" target="_blank">$1</a>'
        );
        
        this.addMessage(processedResponse, 'bot', true);
        
        // Show products if any
        if (data.products && data.products.length > 0) {
          this.addProductCards(data.products.slice(0, 5)); // Max 5 produkter
        }
        
        // Show quick replies if any
        if (data.quick_replies && data.quick_replies.length > 0) {
          this.addQuickReplies(data.quick_replies);
        }
        
      } catch (error) {
        console.error('Chat error:', error);
        this.hideTyping();
        this.addMessage('Beklager, noget gik galt. Prøv igen om lidt.', 'bot');
      }
    },
    
    // Tilføj produktkort
    addProductCards(products) {
      const messagesDiv = document.getElementById('br-messages');
      const productContainer = document.createElement('div');
      productContainer.className = 'br-message br-bot-message';
      
      const productsHTML = products.map(product => {
        // Format price
        const price = product.price ? 
          new Intl.NumberFormat('da-DK', { 
            style: 'currency', 
            currency: 'DKK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(product.price) : 
          'Pris ikke tilgængelig';
        
        // Stock status
        let stockHTML = '';
        if (product.stock_quantity !== undefined && product.stock_quantity !== null) {
          if (product.stock_quantity === 0) {
            stockHTML = '<p class="br-product-stock">Udsolgt</p>';
          } else if (product.stock_quantity <= 3) {
            stockHTML = `<p class="br-product-stock low-stock">Kun ${product.stock_quantity} tilbage!</p>`;
          } else {
            stockHTML = '<p class="br-product-stock">På lager</p>';
          }
        }
        
        return `
          <a href="${product.product_url || '#'}" target="_blank" class="br-product-card">
            <img src="${product.image_url || 'https://via.placeholder.com/160x120?text=No+Image'}" 
                 alt="${product.title}" 
                 onerror="this.src='https://via.placeholder.com/160x120?text=No+Image'">
            <div class="br-product-card-content">
              <h4 class="br-product-title">${product.title}</h4>
              <p class="br-product-price">${price}</p>
              ${stockHTML}
            </div>
          </a>
        `;
      }).join('');
      
      productContainer.innerHTML = `
        <div class="br-bubble">
          <div class="br-products-container">
            ${productsHTML}
          </div>
        </div>
      `;
      
      messagesDiv.appendChild(productContainer);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },
    
    // Tilføj quick replies
    addQuickReplies(replies) {
      const messagesDiv = document.getElementById('br-messages');
      const quickContainer = document.createElement('div');
      quickContainer.className = 'br-quick-replies';
      quickContainer.id = 'br-quick-replies';
      
      replies.forEach(reply => {
        const button = document.createElement('button');
        button.className = 'br-quick-reply';
        button.textContent = reply;
        button.onclick = () => {
          // Send quick reply som besked
          document.getElementById('br-input').value = reply;
          this.sendMessage();
          // Fjern quick replies
          document.getElementById('br-quick-replies').remove();
        };
        quickContainer.appendChild(button);
      });
      
      messagesDiv.appendChild(quickContainer);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },
    
    addMessage(text, sender, saveToHistory = true) {
      const messagesDiv = document.getElementById('br-messages');
      const isOpen = document.getElementById('br-chat-window').style.display === 'flex';
      
      // Hvis chatten er åben, vis i DOM
      if (isOpen) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `br-message br-${sender}-message`;
        
        // For bot messages, allow HTML (for links)
        if (sender === 'bot') {
          messageDiv.innerHTML = `<div class="br-bubble">${text}</div>`;
        } else {
          // For user messages, escape HTML
          const escapedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          messageDiv.innerHTML = `<div class="br-bubble">${escapedText}</div>`;
        }
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }
      
      // Save to history if new (uanset om chat er åben)
      if (saveToHistory) {
        // Store the original text without HTML processing for history
        const originalText = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '[$2]($1)');
        
        this.conversationHistory.push({
          role: sender === 'user' ? 'user' : 'assistant',
          content: originalText
        });
        localStorage.setItem('br_conversation_history', JSON.stringify(this.conversationHistory));
      }
    },
    
    showTyping() {
      const isOpen = document.getElementById('br-chat-window').style.display === 'flex';
      if (!isOpen) return;
      
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
      localStorage.removeItem('br_last_activity');
      this.sessionId = null;
      document.getElementById('br-messages').innerHTML = '';
      this.getOpeningMessage();
    }
  };

  // Initialize when DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => brChat.init());
  } else {
    brChat.init();
  }
  
  // Expose brChat globally
  window.brChat = brChat;
})();
