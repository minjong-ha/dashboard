import { useGoogleAuth } from './googleAuthContext';
import { GoogleLogin as GoogleLoginBtn } from 'react-google-login';
import { google } from 'googleapis';

// TODO(minjong, 230418): Add google api key here
const CLIENT_ID = '368203423575-5fqov3c65oj3efopq4lh471k5t51fsoe.apps.googleusercontent.com';

const GoogleLogin = () => {
  const { setIsAuthenticated, setGoogleUser } = useGoogleAuth();

  const onSuccess = async (response) => {
    try {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: response.accessToken });
      google.options({ auth });

      const gmail = google.gmail({ version: 'v1', auth });
      const profile = await gmail.users.getProfile({ userId: 'me' });
      setGoogleUser(profile.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const onFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
      <GoogleLoginBtn
      clientId={CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      />
      );
};

export default GoogleLogin;
