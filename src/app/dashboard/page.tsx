"use client";
import { useState, useEffect, FormEvent, useRef, useCallback } from "react";
import { Bot, X, Menu, Send, Trash, Database, Loader } from "lucide-react";
import { ethers } from 'ethers';
import { Web3Provider } from "@/config/web3provider";
import { MessageItem } from "@/components/chat/chatmessage";
import { getChatCompletion } from "@/lib/api";
import type { Message, Conversation } from "@/types";
import Swal from "sweetalert2";
import Link from "next/link";

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentConversation, setCurrentConversation] = useState<Conversation>({
    title: "New Lisk Chat",
    message: [],
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isStoringToBlockchain, setIsStoringToBlockchain] = useState<boolean>(false);
  
  // Simple chat history
  const [chatHistory, setChatHistory] = useState<Conversation[]>([]);
  
  // Lisk blockchain connection status
  const [isConnectedToLisk, setIsConnectedToLisk] = useState<boolean>(false);
  const [liskNodeInfo, setLiskNodeInfo] = useState<any>(null);
  
  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 768);
    connectToLiskNode();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation.message]);

  useEffect(() => {
    if (inputRef.current && !isAiResponding) {
      inputRef.current.focus();
    }
  }, [isAiResponding]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, []);

  const updateCurrentConversation = useCallback((updates: Partial<Conversation>) => {
    setCurrentConversation(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date()
    }));
  }, []);
  
  // Connect to Lisk blockchain node
  const connectToLiskNode = async () => {
    try {
      // Simulate connecting to a Lisk node
      // In a real implementation, you would use Lisk SDK or API
      setTimeout(() => {
        setIsConnectedToLisk(true);
        setLiskNodeInfo({
          connected: true,
          networkId: "lisk-mainnet",
          version: "5.2.0",
          height: 15842639
        });
        
        // Simulate loading chat history from blockchain
        loadChatHistoryFromBlockchain();
      }, 1500);
    } catch (err: any) {
      console.error("Failed to connect to Lisk node:", err);
      Swal.fire({
        icon: 'error',
        title: 'Connection Failed',
        text: 'Failed to connect to Lisk blockchain node. Retrying...',
        timer: 3000,
        showConfirmButton: false
      });
    }
  };
  
  // Load chat history from blockchain (simulated)
  const loadChatHistoryFromBlockchain = async () => {
    try {
      // Simulate fetching chat history from blockchain
      // In a real implementation, you would query Lisk blockchain
      setTimeout(() => {
        const mockHistory: Conversation[] = [
          {
            title: "Smart Contracts",
            message: [
              {
                content: "How do I deploy a smart contract on Lisk?",
                role: "user",
                timestamp: new Date(Date.now() - 86400000) // 1 day ago
              },
              {
                content: "To deploy a smart contract on Lisk, you'll need to use Lisk SDK and follow these steps: 1) Create your contract module, 2) Register it with the blockchain, 3) Deploy using Lisk CLI. Would you like a detailed walkthrough?",
                role: "assistant",
                timestamp: new Date(Date.now() - 86390000)
              }
            ],
            createdAt: new Date(Date.now() - 86400000),
            updatedAt: new Date(Date.now() - 86390000)
          },
          {
            title: "Blockchain basics",
            message: [
              {
                content: "What are the key benefits of Lisk?",
                role: "user",
                timestamp: new Date(Date.now() - 172800000) // 2 days ago
              },
              {
                content: "Lisk offers several benefits including JavaScript-based development (making it accessible for web developers), sidechains for scalability, a robust SDK, and delegated proof-of-stake consensus for energy efficiency.",
                role: "assistant",
                timestamp: new Date(Date.now() - 172790000)
              }
            ],
            createdAt: new Date(Date.now() - 172800000),
            updatedAt: new Date(Date.now() - 172790000)
          }
        ];
        
        setChatHistory(mockHistory);
        
        Swal.fire({
          icon: 'success',
          title: 'Connected to Lisk',
          text: 'Successfully connected to Lisk blockchain and loaded chat history.',
          timer: 2000,
          showConfirmButton: false
        });
      }, 2000);
    } catch (err: any) {
      console.error("Failed to load chat history:", err);
    }
  };
  
  // Store current chat to blockchain
  const storeChatToBlockchain = async () => {
    if (currentConversation.message.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Chat',
        text: 'Cannot store an empty conversation to blockchain.',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }
    
    try {
      setIsStoringToBlockchain(true);
      
      // Simulate storing to blockchain
      // In a real implementation, you would use Lisk SDK to send transaction
      setTimeout(() => {
        // Add to local history first
        const chatWithId = {
          ...currentConversation,
          blockchainTxId: "tx_" + Math.random().toString(36).substring(2, 15)
        };
        
        setChatHistory([chatWithId, ...chatHistory]);
        
        setIsStoringToBlockchain(false);
        
        Swal.fire({
          icon: 'success',
          title: 'Stored on Blockchain',
          text: 'Chat history has been permanently stored on Lisk blockchain.',
          timer: 2000,
          showConfirmButton: false
        });
      }, 3000);
    } catch (err: any) {
      console.error("Failed to store chat:", err);
      setIsStoringToBlockchain(false);
      
      Swal.fire({
        icon: 'error',
        title: 'Storage Failed',
        text: 'Failed to store chat on blockchain. Please try again.',
        showConfirmButton: true
      });
    }
  };
  
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Message',
        text: 'Please enter a message before sending.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    const userMessage: Message = {
      content: newMessage.trim(),
      role: "user",
      timestamp: new Date()
    };

    const updatedMessages = [...currentConversation.message, userMessage];

    updateCurrentConversation({
      message: updatedMessages
    });

    setNewMessage("");
    setIsAiResponding(true);
    setError(null);

    // Handle special blockchain commands
    if (newMessage.trim().startsWith("/")) {
      await handleBlockchainCommand(newMessage.trim(), updatedMessages);
    } else {
      try {
        const apiMessages = updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));

        const aiResponse = await getChatCompletion(apiMessages);

        if (!aiResponse || aiResponse.trim() === '') {
          throw new Error('Received an empty response from AI');
        }

        const aiMessage: Message = {
          content: aiResponse,
          role: "assistant",
          timestamp: new Date()
        };

        const finalMessages = [...updatedMessages, aiMessage];

        updateCurrentConversation({
          message: finalMessages
        });
      } catch (err: any) {
        Swal.fire({
          icon: 'error',
          title: 'Chat Error',
          text: err.message || 'An unexpected error occurred during the chat.',
          confirmButtonText: 'Try Again',
        });

        console.error("Error in chat:", err);
      } finally {
        setIsAiResponding(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }
  };
  
  const handleBlockchainCommand = async (command: string, messages: Message[]) => {
    const cmd = command.toLowerCase();
    let responseContent = "";
    
    try {
      if (cmd === "/store") {
        responseContent = "Storing chat history to blockchain...";
        
        const systemMessage: Message = {
          content: responseContent,
          role: "system",
          timestamp: new Date()
        };
        
        updateCurrentConversation({
          message: [...messages, systemMessage]
        });
        
        setTimeout(() => {
          storeChatToBlockchain();
        }, 500);
        
        setIsAiResponding(false);
        return;
      } 
      else if (cmd === "/status") {
        if (isConnectedToLisk) {
          responseContent = `Connected to Lisk blockchain\nNetwork: ${liskNodeInfo.networkId}\nVersion: ${liskNodeInfo.version}\nBlock Height: ${liskNodeInfo.height}`;
        } else {
          responseContent = "Not connected to Lisk blockchain. Use /connect to connect.";
        }
      }
      else if (cmd === "/connect") {
        responseContent = "Connecting to Lisk blockchain...";
        connectToLiskNode();
      }
      else if (cmd === "/help") {
        responseContent = "Available commands:\n/store - Store current chat to blockchain\n/status - Check Lisk connection status\n/connect - Connect to Lisk blockchain\n/clear - Clear current chat\n/help - Show this help";
      }
      else if (cmd === "/clear") {
        updateCurrentConversation({
          message: []
        });
        setIsAiResponding(false);
        return;
      }
      else {
        responseContent = `Unknown command: ${command}\nType /help to see available commands.`;
      }
      
      const systemMessage: Message = {
        content: responseContent,
        role: "system",
        timestamp: new Date()
      };
      
      updateCurrentConversation({
        message: [...messages, systemMessage]
      });
    } catch (err: any) {
      console.error("Error handling command:", err);
    } finally {
      setIsAiResponding(false);
    }
  };
  
  const handleNewChat = useCallback(() => {
    setCurrentConversation({
      title: "New Lisk Chat",
      message: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }, []);

  const loadChatFromHistory = (chat: Conversation) => {
    setCurrentConversation(chat);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const formatDate = useCallback((date: Date) => {
    if (!(date instanceof Date)) date = new Date(date);
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && newMessage.trim() && !isAiResponding) {
        handleSendMessage(e as any);
      }
      if (e.key === 'Escape' && window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [newMessage, isAiResponding, isSidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white">
      {/* Mobile Header */}
      <header className="lg:hidden bg-black fixed top-0 left-0 right-0 z-40">
        <div className="flex justify-between items-center p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h1 className="text-xl font-bold">Lisk Chat</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* Sidebar - Chat History */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:relative lg:bg-opacity-100 lg:block transition-all duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'
        }`}
      >
        <div 
          className={`w-64 md:w-80 h-full bg-black border-r border-gray-800 transition-all duration-300 overflow-auto fixed lg:relative ${
            isSidebarOpen ? 'left-0' : '-left-full lg:left-0'
          }`}
        >
          <div className="p-4 border-b border-gray-800">
            <button
              onClick={handleNewChat}
              className="w-full py-2 px-4 bg-white hover:bg-gray-200 text-black rounded-lg flex items-center justify-center"
            >
              <span>New Chat</span>
            </button>
          </div>
          
          <div className="h-14 flex items-center mx-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Database size={18} className={isConnectedToLisk ? "text-green-500" : "text-gray-500"} />
              <span className="text-sm">
                {isConnectedToLisk ? "Connected to Lisk" : "Disconnected"}
              </span>
            </div>
          </div>
          
          <div className="py-2">
            <h2 className="px-4 py-2 text-sm text-gray-400">Chat History</h2>
            <div className="space-y-1">
              {chatHistory.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">No chat history yet</div>
              ) : (
                chatHistory.map((chat, index) => (
                  <button
                    key={index}
                    onClick={() => loadChatFromHistory(chat)}
                    className={`w-full px-4 py-3 flex items-start hover:bg-gray-900 rounded-lg transition-colors text-left ${
                      currentConversation === chat ? "bg-gray-900" : ""
                    }`}
                  >
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate">{chat.title}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {chat.message.length} messages • {formatDate(chat.updatedAt)}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen lg:h-auto">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between mt-14 lg:mt-0">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6 text-white" />
            <h2 className="text-lg font-semibold">{currentConversation.title || "New Chat"}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => storeChatToBlockchain()}
              disabled={isStoringToBlockchain || currentConversation.message.length === 0}
              className={`p-2 rounded-lg ${
                isStoringToBlockchain || currentConversation.message.length === 0
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:bg-gray-800"
              }`}
              title="Store to blockchain"
            >
              {isStoringToBlockchain ? <Loader className="h-5 w-5 animate-spin" /> : <Database className="h-5 w-5" />}
            </button>
            <button
              onClick={() => handleNewChat()}
              className="p-2 text-white hover:bg-gray-800 rounded-lg"
              title="New chat"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentConversation.message.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <Bot className="h-20 w-20 mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-light mb-2">Welcome to Lisk AI Chat</h3>
                <p className="mb-4">Start a conversation or try these commands:</p>
                <div className="text-left inline-block">
                  <p className="text-sm"><code>/store</code> - Store chat to blockchain</p>
                  <p className="text-sm"><code>/status</code> - Check blockchain connection</p>
                  <p className="text-sm"><code>/help</code> - Show all commands</p>
                </div>
              </div>
            </div>
          ) : (
            currentConversation.message.map((message, index) => (
              <MessageItem
                key={index}
                message={message}
                formatTime={formatTime}
              />
            ))
          )}
          
          {isAiResponding && (
            <div className="flex justify-start">
              <div className="bg-black border border-gray-800 text-white rounded-lg p-3 animate-pulse flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                <span className="ml-2">AI is thinking...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/60 text-white p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form 
          onSubmit={handleSendMessage} 
          className="p-4 border-t border-gray-800 bg-black"
        >
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message or command (/help)"
              className="flex-1 p-3 bg-white text-black border border-white hover:bg-black hover:text-white rounded-xl focus:ring-2 focus:ring-white transition-all duration-300"
              disabled={isAiResponding}
            />
            <button
              type="submit"
              className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center
                ${newMessage.trim() && !isAiResponding 
                  ? 'bg-black hover:bg-white hover:text-black text-white border-2 border-white' 
                  : 'bg-white text-black border-2 border-white cursor-not-allowed opacity-50'}`}
              disabled={!newMessage.trim() || isAiResponding}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}