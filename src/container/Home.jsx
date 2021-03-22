import { ChatEngine } from 'react-chat-engine';
import '../App.css';
import ChatFeed from '../components/ChatFeed';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { decryptStorage } from '../helpers/encryptStorage';

const Home = () => {
  const user = decryptStorage('user');
  if(!user) return <LoginForm />;
  return (
    <div>
    <Header />
    <ChatEngine
       height='100vh'
       projectID={process.env.REACT_APP_PROJECT_ID}
       userName={user.username}
       userSecret={user.password}
       renderChatFeed={ (chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
    </div>
  )
}

export default Home;
