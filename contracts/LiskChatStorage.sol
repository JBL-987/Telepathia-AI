// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract LiskChatStorage {
    // Structures matching your TypeScript interfaces
    struct Message {
        string id;
        string role; // "user", "assistant", or "system"
        string content;
        uint256 timestamp;
        string txHash;
    }
    
    struct Conversation {
        string id;
        string title;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 chainId;
        string networkId;
        string blockchainTxId;
        uint256 messageCount;
        bool exists;
    }
    
    // Storage
    mapping(string => Conversation) public conversations;
    mapping(string => mapping(uint256 => Message)) public messages;
    mapping(address => string[]) public userConversations;
    
    // Events
    event ConversationCreated(string id, string title, address owner);
    event MessageAdded(string conversationId, string messageId, string role);
    
    // Create a new conversation
    function createConversation(string memory _id, string memory _title) public returns (string memory) {
        require(!conversations[_id].exists, "Conversation ID already exists");
        
        Conversation memory newConversation = Conversation({
            id: _id,
            title: _title,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            chainId: block.chainid,
            networkId: "lisk-mainnet", // Can be parameterized
            blockchainTxId: "",
            messageCount: 0,
            exists: true
        });
        
        conversations[_id] = newConversation;
        userConversations[msg.sender].push(_id);
        
        emit ConversationCreated(_id, _title, msg.sender);
        return _id;
    }
    
    // Add a message to a conversation
    function addMessage(
        string memory _conversationId,
        string memory _messageId,
        string memory _role,
        string memory _content
    ) public {
        require(conversations[_conversationId].exists, "Conversation does not exist");
        
        uint256 messageIndex = conversations[_conversationId].messageCount;
        
        Message memory newMessage = Message({
            id: _messageId,
            role: _role,
            content: _content,
            timestamp: block.timestamp,
            txHash: "" // Will be updated after transaction is mined
        });
        
        messages[_conversationId][messageIndex] = newMessage;
        conversations[_conversationId].messageCount++;
        conversations[_conversationId].updatedAt = block.timestamp;
        
        // Update blockchain transaction ID if this is the first message
        if (bytes(conversations[_conversationId].blockchainTxId).length == 0) {
            // In a real implementation, we'd store the transaction hash
            conversations[_conversationId].blockchainTxId = "tx_stored";
        }
        
        emit MessageAdded(_conversationId, _messageId, _role);
    }
    
    // Store entire conversation at once (more gas efficient)
    function storeFullConversation(
        string memory _id,
        string memory _title,
        string[] memory _messageIds,
        string[] memory _roles,
        string[] memory _contents,
        uint256[] memory _timestamps
    ) public returns (string memory) {
        require(_messageIds.length == _roles.length && _roles.length == _contents.length && _contents.length == _timestamps.length, "Arrays must be same length");
        
        // Create the conversation first
        createConversation(_id, _title);
        
        // Add all messages
        for (uint256 i = 0; i < _messageIds.length; i++) {
            Message memory newMessage = Message({
                id: _messageIds[i],
                role: _roles[i],
                content: _contents[i],
                timestamp: _timestamps[i],
                txHash: ""
            });
            
            messages[_id][i] = newMessage;
        }
        
        conversations[_id].messageCount = _messageIds.length;
        conversations[_id].updatedAt = block.timestamp;
        conversations[_id].blockchainTxId = "tx_batch_stored";
        
        return _id;
    }
    
    // Get conversation metadata
    function getConversation(string memory _id) public view returns (
        string memory title,
        uint256 createdAt,
        uint256 updatedAt,
        uint256 messageCount,
        string memory networkId,
        string memory blockchainTxId
    ) {
        require(conversations[_id].exists, "Conversation does not exist");
        Conversation memory conv = conversations[_id];
        
        return (
            conv.title,
            conv.createdAt,
            conv.updatedAt,
            conv.messageCount,
            conv.networkId,
            conv.blockchainTxId
        );
    }
    
    // Get a specific message
    function getMessage(string memory _conversationId, uint256 _index) public view returns (
        string memory id,
        string memory role,
        string memory content,
        uint256 timestamp
    ) {
        require(conversations[_conversationId].exists, "Conversation does not exist");
        require(_index < conversations[_conversationId].messageCount, "Message index out of bounds");
        
        Message memory msg = messages[_conversationId][_index];
        return (
            msg.id,
            msg.role,
            msg.content,
            msg.timestamp
        );
    }
    
    // Get all conversation IDs for a user
    function getUserConversations() public view returns (string[] memory) {
        return userConversations[msg.sender];
    }
}