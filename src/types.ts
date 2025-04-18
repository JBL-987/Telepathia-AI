export interface Message { 
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    txHash?: string;
}

export interface Conversation {
    id?: string;
    title: string;
    message: Message[];
    createdAt: Date;
    updatedAt: Date;
    chainId?: number; 
    contractAddress?: string; 
    blockchainTxId?: string; 
    networkId?: string;
}