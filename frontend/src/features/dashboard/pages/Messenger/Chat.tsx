import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';
import $ from 'jquery';
import { Link, useParams } from 'react-router-dom';
import Conversation from './components/Conversation';
import MainBody from '../../components/MainBody';
import PageProps from '@props/pageProps';
import useWindowSize from '@hooks/useWindowSize';
import { selectCurrentUser } from '../../../auth/slices/auth.slice';
import useUserImage from '@hooks/useUserImage';
import { useGetConversationsQuery } from './slices/conversationsApi.slice';
import { useGetUsersQuery } from '../Users/slices/usersApi.slice';
import { useGetMessagesQuery } from './slices/messagesApi.slice';
import ConversationProps from '@props/conversationProps';
import MessageProps from '@props/messageProps';
import ChatBox from './components/ChatBox';
import useDebounce from '@hooks/useDebounce';
import userInterface from '@props/userProps';

const Chat: React.FC<PageProps> = ({ pageData }: PageProps) => {
  const [query, setQuery] = useState('');
  const [userConversations, setUserConversations] = useState<ConversationProps[]>([]);
  const { height } = useWindowSize();
  const currentUser = useSelector(selectCurrentUser);
  const userImage = useUserImage(currentUser);
  const debouncedQuery = useDebounce(query);
  const { id } = useParams();

  const { conversations } = useGetConversationsQuery('conversationsList', {
    selectFromResult: ({ data }) => ({
      conversations: data?.entities ? Object.values(data.entities) as ConversationProps[] : [],
    }),
  });

  const [toUser, setToUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToUser(id);
    return () => {
      setToUser(undefined);
    };
  }, [id]);

  useEffect(() => {
    const handleChatSidebar = () => {
      $('.chat-hamburger').on('click', function () {
        $('.chat-left-sidebar').toggleClass('show');
      });
    };
    handleChatSidebar();

    const setChatboxHeight = () => {
      const ch = height! - 206;
      $('.chatbox .msg_card_body').css('height', ch);
    };
    setChatboxHeight();

    const handleDzChatUser = () => {
      $('.dz-chat-user-box .dz-chat-user').on('click', function () {
        $('.dz-chat-user-box').addClass('d-none');
        $('.dz-chat-history-box').removeClass('d-none');
      });

      $('.dz-chat-history-back').on('click', function () {
        $('.dz-chat-user-box').removeClass('d-none');
        $('.dz-chat-history-box').addClass('d-none');
      });

      $('.dz-fullscreen').on('click', function () {
        $('.dz-fullscreen').toggleClass('active');
      });
    };
    handleDzChatUser();
  }, [height]);

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids ? data.ids.map((id: string) => data.entities[id]) : [],
    }),
  });

  const { messages } = useGetMessagesQuery('messagesList', {
    selectFromResult: ({ data }) => ({
      messages: data?.ids ? data.ids.map((id: string) => data.entities[id]) : [],
    }),
  });

  useEffect(() => {
    setUserConversations(searchData(conversations));
  }, [debouncedQuery, conversations]);

  const searchData = (data: ConversationProps[] | undefined) => {
    return (
      data?.filter((item) => {
        const contactId = item?.members.find((m) => m !== currentUser?.id);
        const contact = users.find((user: userInterface) => user.id === contactId);
        return (
          keys.some((key) => contact?.[key]?.toLowerCase()?.includes(debouncedQuery)) ||
          (messages as MessageProps[])?.filter((m: MessageProps) => m?.conversationId === item?.id && m?.message.includes(debouncedQuery)).length > 0
        );
      }) ?? []
    );
  };

  const keys = ['firstName', 'lastName', 'username'];

  return (
    <MainBody>
      <div className="container-fluid" style={{ position: 'relative' }}>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body chat-wrapper p-0">
                <div className="chat-hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="chat-left-sidebar">
                  <div className="d-flex chat-fix-search align-items-center">
                    <img src={userImage} alt="" className="rounded-circle me-3" />
                    <div className="input-group message-search-area">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search here.."
                      />
                      <div className="input-group-append">
                        <button className="input-group-text" onClick={() => setUserConversations(searchData(conversations))}>
                          <i className="flaticon-381-search-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-action card-tabs ">
                    <Tabs defaultActiveKey="allMessages" id="messenger-tab" className="style-3 flex justify-contents-center aign-items-center ">
                      <Tab eventKey="allMessages" title="All Chats">
                        <div className="card-body message-bx px-0 pt-3">
                          <PerfectScrollbar className="tab-content dz-scroll" id="message-bx">
                            {userConversations.map((c: ConversationProps, i: number) => (
                              <Conversation key={c.id} conversation={c} i={i} />
                            ))}
                          </PerfectScrollbar>
                        </div>
                      </Tab>
                      <Tab eventKey="unread" title="Unread">
                        <div className="card-body message-bx px-0 pt-3">
                          <PerfectScrollbar className="tab-content dz-scroll" id="message-bx"></PerfectScrollbar>
                        </div>
                      </Tab>
                      <Tab eventKey="archived" title="Archived">
                        <div className="card-body message-bx px-0 pt-3">
                          <PerfectScrollbar className="tab-content dz-scroll" id="message-bx"></PerfectScrollbar>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <div className="chart-right-sidebar">
                  {toUser ? (
                    <ChatBox receiver={toUser} sender={currentUser.id as string} />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column h-100 w-100" style={{ backgroundImage: `url('dashboard-assets/images/chat-bg.png')` }}>
                      <h3 className="text-muted">No chat selected</h3>
                      <p className="text-muted">Please select a user to start a conversation.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainBody>
  );
};

export default Chat;
