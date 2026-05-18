import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/i18n';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CHAT_API_URL = '/api/chat';
const GUEST_SESSION_KEY = 'guest_chat_session_id';

function getGuestSessionId(): string | null {
  return sessionStorage.getItem(GUEST_SESSION_KEY);
}

function saveGuestSessionId(sessionId: string): void {
  sessionStorage.setItem(GUEST_SESSION_KEY, sessionId);
}

function getAuthToken(): string | null {
  return localStorage.getItem('sinopia_token');
}

function getUserRole(): string | null {
  try {
    const sinopiaUser = localStorage.getItem('sinopia_user');
    if (sinopiaUser) {
      const parsed = JSON.parse(sinopiaUser);
      return parsed.role || null;
    }
  } catch (e) {
    console.error('Failed to get user role:', e);
  }
  return null;
}

export function ChatWidget() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: trimmedMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const token = getAuthToken();
      const userRole = getUserRole();
      const guestSessionId = getGuestSessionId();
      
      // Build headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header if logged in
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Add role header as fallback for role detection
      if (userRole) {
        headers['x-user-role'] = userRole;
      }
      
      // Add guest session ID header if available (for maintaining context)
      if (!token && guestSessionId) {
        headers['x-guest-session-id'] = guestSessionId;
      }
      
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Store guest session_id for future messages
      if (data.session_id && data.role === 'guest') {
        saveGuestSessionId(data.session_id);
      }
      
      // Extract bot response from standardized format
      let botResponse = t('chatWidget.errorResponse');
      if (data.n8nResponse) {
        // Handle different possible response structures
        botResponse = data.n8nResponse.output || 
                      data.n8nResponse.message || 
                      data.n8nResponse.response ||
                      (typeof data.n8nResponse === 'string' ? data.n8nResponse : botResponse);
      } else if (data.output || data.message) {
        // Fallback for legacy format
        botResponse = data.output || data.message;
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat API error:', error);
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        content: t('chatWidget.errorResponse'),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-80 h-[450px] bg-background border border-border rounded-lg shadow-lg flex flex-col overflow-hidden"
          data-testid="chat-widget-window"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">{t('chatWidget.title')}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover-elevate"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                {t('chatWidget.welcomeMessage')}
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.sender === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-muted text-foreground'
                  }`}
                  data-testid={`chat-message-${message.sender}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm">
                  <span className="inline-flex items-center gap-1">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chatWidget.inputPlaceholder')}
                className="flex-1"
                disabled={isTyping}
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-orange-500 hover:bg-orange-600"
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-toggle-chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Bot className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
