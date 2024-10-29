# Roadmap: Firebase Authentication with React

## Stack Used
- React
- Firebase Authentication
- React Router

## Steps

### 1. Set up a new React project
- Use `create-react-app` to bootstrap a new React project
- Install necessary dependencies: `react-router-dom`, `firebase`

### 2. Configure Firebase
- Sign up for a Firebase account and create a new project
- From the Firebase console, enable the Email/Password authentication provider
- Get the Firebase configuration details (apiKey, authDomain, projectId, etc.)

### 3. Initialize Firebase in your React app
- Create a new file, e.g. `firebase.js`, to house the Firebase configuration and initialization
- Import the necessary Firebase modules and initialize the app

```javascript
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration details go here
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
```

### 4. Create Firebase Authentication components
- Create a `SignIn` component that handles user sign-in with email and password
- Create a `SignUp` component that handles user sign-up with email and password

```javascript
// SignIn.js
import { useState } from 'react';
import { auth } from './firebase';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      onSignIn();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
```

### 5. Create a Home component
- This is the page that the authenticated user will be redirected to
- Use React Router to set up navigation between the authentication pages and the Home page

```javascript
// Home.js
import { useEffect } from 'react';
import { auth } from './firebase';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/signin');
      }
    });

    return unsubscribe;
  }, [history]);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};

export default Home;
```

### 6. Set up routing
- Use React Router to create routes for the authentication pages and the Home page
- Implement a PrivateRoute component to redirect unauthenticated users to the sign-in page

```javascript
// App.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/home" component={Home} />
        <Route path="/" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default App;
```

```javascript
// PrivateRoute.js
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = '/signin';
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
```

This roadmap covers the essential steps to set up Firebase authentication and redirect the authenticated user to the home page using React. The key steps include:

1. Setting up a new React project and configuring Firebase
2. Creating Firebase authentication components for sign-in and sign-up
3. Creating a Home component that checks the authentication state
4. Implementing routing with React Router, including a PrivateRoute component to protect the Home page

You can use this roadmap as a guide to implement the full functionality in your React application.