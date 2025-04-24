import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getSignalRConnection } from '@/lib/signalrConnection';

export default function Chat({ userId }) {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const conn = getSignalRConnection()

        conn.on('ReceiveMessage', (messageId, content, fileName) => {
            setMessages((prev) => [...prev, { id: messageId, content, fileName, isRead: false }]);
        });

        conn.on('MessageRead', (messageId) => {
            setMessages((prev) =>
                prev.map((m) => (m.id === messageId ? { ...m, isRead: true } : m))
            );
        });

        conn.on('MessageEdited', (messageId, newContent) => {
            setMessages((prev) =>
                prev.map((m) => (m.id === messageId ? { ...m, content: newContent, isEdited: true } : m))
            );
        });

        conn.start().then(() => {
            setConnection(conn);
            conn.invoke('SyncMessages');
        }).catch((err) => console.error('Connection failed:', err));

        return () => {
            conn.stop();
        };
    }, []);

    const sendMessage = async () => {
        if (!connection || !receiverId) return;
        const request = {
            ReceiverId: receiverId,
            Content: content || undefined,
            AttachedFile: file
        };
        try {
            await connection.invoke('SendMessage', request);
            setContent('');
            setFile(null);
        } catch (err) {
            alert(Error: ${err.message});
        }
    };

    const markAsRead = async (messageId) => {
        if (connection) {
            await connection.invoke('MarkAsRead', messageId);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Receiver ID (Guid)"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={sendMessage}>Send</button>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <p>
                            {msg.content || '(File only)'}
                            {msg.fileName && (
                                <a href={`/messageAttachments/${msg.fileName}`} target="_blank">{msg.fileName}</a>
                            )}
                            {msg.isRead ? ' [Read]' : ''}
                            {!msg.isRead && <button onClick={() => markAsRead(msg.id)}>Mark as Read</button>}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}