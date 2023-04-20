import { useState, useEffect } from 'react';
import { useGoogleAuth } from './googleAuthContext';
import { google } from 'googleapis';

const Notification = () => {
  const { isAuthenticated, googleUser, auth2 } = useGoogleAuth();
  const [unreadEmails, setUnreadEmails] = useState(0);

  useEffect(() => {
      const fetchUnreadEmails = async () => {
      try {
      if (isAuthenticated) {
      const auth = auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      const gmail = google.gmail({ version: 'v1', auth });

      const response = await gmail.users.messages.list({
userId: 'me',
q: 'is:unread',
});

      setUnreadEmails(response.data.resultSizeEstimate);
      }
      } catch (error) {
      console.error('Error fetching unread emails:', error);
      }
      };

      if (isAuthenticated) {
      fetchUnreadEmails();
      }
}, [isAuthenticated, googleUser, auth2]);

if (!isAuthenticated) {
  return null;
}

return (
    <div className="notification">
    {unreadEmails > 0 && <span>{unreadEmails} unread emails</span>}
    </div>
    );
};

export default Notification;
