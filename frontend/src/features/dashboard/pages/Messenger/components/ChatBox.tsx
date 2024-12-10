import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useGetUsersQuery } from '../../Users/slices/usersApi.slice';
import { useGetConversationsQuery } from '../slices/conversationsApi.slice';
import { useGetMessagesQuery } from '../slices/messagesApi.slice';
import useUserImage from '@hooks/useUserImage';
import useSocketIO from '@hooks/useSocketIO';
import ConversationProps, { conversationIdProps } from '@props/conversationProps';
import MessageProps from '@props/messageProps';

const ChatBox = ({ receiver, sender }: { receiver: string; sender: string }) => {
    const [chatMessage, setChatMessage] = useState('');
    const [conversations, setConversations] = useState<MessageProps[]>([]);
    const [newMessage, setNewMessage] = useState<MessageProps | null>(null);
    const msgRef = useRef<HTMLDivElement | null>(null);
    const socket = useSocketIO();

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[receiver],
        }),
    });

    const conversationId: conversationIdProps = [receiver, sender];
    const conversationId2: conversationIdProps = [sender, receiver];

    const { conversation } = useGetConversationsQuery("conversationsList", {
        selectFromResult: ({ data }) => ({
            conversation: data && Object.values(data.entities as ConversationProps[])
                .find((c) => c.members.length === 2 && c.members.every(m => conversationId.includes(m) || conversationId2.includes(m))),
        }),
    });

    const { messages } = useGetMessagesQuery("messagesList", {
        selectFromResult: ({ data }) => ({
            messages: data && Object.values(data.entities as MessageProps[])
                .filter(m => m.conversationId === conversation?.id),
        }),
    });

    // Handle new message from socket
    useEffect(() => {
        const handleReceivedMessage = (data: MessageProps) => {
            setNewMessage(data);
        };
        socket.current?.on('receivedMessage', handleReceivedMessage);

        return () => {
            socket.current?.off('receivedMessage', handleReceivedMessage);
        };
    }, [socket]);

    // Update conversations when new messages are received
    useEffect(() => {
        if (newMessage && conversation?.members.includes(newMessage.sender)) {
            setConversations(prev => [...prev, newMessage]);
        }
    }, [newMessage, conversation]);

    // Update conversations from fetched messages
    useEffect(() => {
        setConversations(messages);
        setChatMessage('');
    }, [messages]);

    // Scroll to the latest message
    useEffect(() => {
        if (msgRef.current) {
            msgRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversations]);

    const sendChat = (e: FormEvent) => {
        e.preventDefault(); // Prevent form submission
        if (chatMessage) {
            const msgData = { message: chatMessage, sender, receiver };
            socket.current.emit("sendMessage", msgData, (err: any, sentMessage: MessageProps) => {
                if (!err) {
                    setConversations(prev => [...prev, sentMessage]);
                    setChatMessage(''); // Reset chat input after sending
                }
            });
        }
    };

    const contactImage = useUserImage(user);
    const userImage = useUserImage(sender);

    return (
        <div className="message-bx chat-box">
            <div className="d-flex justify-content-between chat-box-header">
                <div className="d-flex align-items-center">
                    <img src={contactImage} alt="" className="rounded-circle main-img me-3" />
                    <h5 className="text-black font-w500 mb-sm-1 mb-0 title-nm"></h5>
                </div>
                <div className="d-flex align-items-center">
                    <span className="d-sm-inline-block d-none">
                        {user?.online?.status ? "Online" : `Last seen ${format(user?.online?.lastSeen)}`}
                    </span>
                    <div className="dropdown ms-2">
                        <Link to="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to="">Edit</Link>
                            <Link className="dropdown-item" to="">Delete</Link>
                        </div>
                    </div>
                </div>
            </div>
            <PerfectScrollbar className="chat-box-area dz-scroll" id="chartBox" style={{ backgroundImage: `url('dashboard-assets/images/chat-bg.png')` }}>
                <div className="chat active-chat">
                    {conversations?.map((m: MessageProps, i: number) => m && (
                        <div key={i} className={`media mb-4 ${m.sender !== sender ? 'justify-content-end align-items-end' : 'justify-content-start align-items-start'}`} ref={msgRef}>
                            {m.sender !== sender ? (
                                <>
                                    <div className="message-sent">
                                        <p className="mb-1">{m.message}</p>
                                        <span className="fs-12 text-black">{format(m.createdAt as Date)}</span>
                                    </div>
                                    <div className="image-bx ms-sm-3 ms-2 mb-4">
                                        <img src={userImage} alt="" className="rounded-circle img-1" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="image-bx me-sm-3 me-2">
                                        <img src={contactImage} alt="" className="rounded-circle img-1" />
                                    </div>
                                    <div className="message-received">
                                        <p className="mb-1">{m.message}</p>
                                        <span className="fs-12 text-black">{format(m.createdAt as Date)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </PerfectScrollbar>
            <div className="card-footer border-0 type-massage">
                <form onSubmit={sendChat}>
                    <div className="input-group">
                        <input
                            className="form-control"
                            placeholder="Type message..."
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => { if (e.key === "Enter") sendChat(e); }}
                            value={chatMessage}
                        />
                        <div className="input-group-append">
                            <span>
                                <label htmlFor='attachmentUpload' className="btn p-0 me-3">
                                    <i className="las la-paperclip scale5 text-secondary"></i>
                                </label>
                                <input type="file" onChange={(e) => uploadAttachment(e)} id="attachmentUpload" className="d-none" multiple />
                            </span>
                            <span>
                                <label htmlFor='imageUpload' className="btn p-0 me-3">
                                    <i className="las la-image scale5 text-secondary"></i>
                                </label>
                                <input type="file" onChange={(e) => handleImageUpload(e)} id="imageUpload" className="d-none" accept='image/*' multiple />
                            </span>
                            <button type="submit" className="send-btn btn-primary btn">SEND</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default React.memo(ChatBox);
