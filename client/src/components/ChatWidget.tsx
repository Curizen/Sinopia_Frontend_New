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

const CHAT_API_URL = '/api/chat/webhook';

type UserRole = 'skill_giver' | 'skill_searcher' | null;

interface UserInfo {
  userId: number | null;
  role: UserRole;
}

function getUserInfoFromStorage(): UserInfo {
  try {
    // Get role from sinopia_user
    const sinopiaUser = localStorage.getItem('sinopia_user');
    let role: UserRole = null;
    if (sinopiaUser) {
      const parsed = JSON.parse(sinopiaUser);
      role = parsed.role || null;
    }
    
    // Get user_id from cache
    const userCache = localStorage.getItem('user_profile_cache');
    if (userCache) {
      const parsed = JSON.parse(userCache);
      return { 
        userId: parsed.user_id || parsed.id || null,
        role 
      };
    }
    
    // Fallback to sinopia_user for user_id
    if (sinopiaUser) {
      const parsed = JSON.parse(sinopiaUser);
      return { 
        userId: parsed.user_id || parsed.id || null,
        role 
      };
    }
  } catch (e) {
    console.error('Failed to get user info from storage:', e);
  }
  return { userId: null, role: null };
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
      const { userId, role } = getUserInfoFromStorage();
      
      // Build payload based on role
      let payload: Record<string, unknown>;
      if (role === 'skill_searcher') {
        payload = {
          role: 'skill_searcher',
          skill_searcher_id: userId,
          message: trimmedMessage,
        };
      } else {
        // Default to skill_giver format
        payload = {
          role: role || 'skill_giver',
          user_id: userId,
          message: trimmedMessage,
        };
      }
      
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.output || data.message || t('chatWidget.errorResponse');

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
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-foreground'
                  }`}
                  data-testid={`message-${message.sender}-${message.id}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chatWidget.inputPlaceholder')}
                disabled={isTyping}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-orange-500 text-white"
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button - Custom FAB requires explicit sizing */}
      <button
        type="button"
        className="h-14 w-14 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center hover-elevate active-elevate-2"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-toggle-chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
}
