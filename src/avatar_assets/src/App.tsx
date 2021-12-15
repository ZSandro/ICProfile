import * as React from "react";
import NotAuthenticated from "./components/NotAuthenticated";
import Home from "./components/Home";
import { _SERVICE, ProfileUpdate } from "../../declarations/avatar/avatar.did";
import toast, { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import CreateProfile from "./components/CreateProfile";
import ManageProfile from "./components/ManageProfile";
import Profile from "./components/Profile";
import { emptyProfile, useAuthClient, useProfile } from "./hooks";
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass } from "@dfinity/agent";
import { useEffect } from "react";
import { clear, remove } from "local-storage";
import { useState } from "react";
import RedirectManager from "./components/RedirectManager";
import { profilesMatch } from "./utils";
import { Layout, Button,  Row } from 'antd';
import 'antd/dist/antd.css';
import '../assets/main.css';


const { Header, Footer, Sider, Content } = Layout;


// const Header = styled.header`
//   position: relative;
//   padding: 1rem;
//   display: flex;
//   justify-content: center;
//   h1 {
//     margin-top: 0;
//   }
//   #logout {
//     position: absolute;
//     right: 0.5rem;
//     top: 0.5rem;
//   }
// `;


export const AppContext = React.createContext<{
  authClient?: AuthClient;
  setAuthClient?: React.Dispatch<AuthClient>;
  isAuthenticated?: boolean;
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
  actor?: ActorSubclass<_SERVICE>;
  profile?: ProfileUpdate;
  updateProfile?: React.Dispatch<ProfileUpdate>;
}>({
  login: () => {},
  logout: () => {},
  profile: emptyProfile,
});

const App = () => {
  const history = createBrowserHistory();
  const {
    authClient,
    setAuthClient,
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    actor,
  } = useAuthClient();
  const identity = authClient?.getIdentity();
  const { profile, updateProfile } = useProfile({ identity });

  useEffect(() => {
    if (history.location.pathname === "/") return;

    if (actor) {
      if (!profile) {
        toast.loading("Checking the IC for an existing avatar");
      }
      actor.read().then((result) => {
        if (history.location.pathname === "/") return;
        // if ("ok" in result) {
        //   // Return if IC profile matches current
        //   if (profilesMatch(profile, result.ok)) {
        //     return;
        //   }
        //   toast.success("Updated avatar from IC");
        //   updateProfile(result.ok);
        // } else {
        //   if ("NotAuthorized" in result.err) {
        //     // clear local delegation and log in
        //     toast.error("Your session expired. Please reauthenticate");
        //     logout();
        //   } else if ("NotFound" in result.err) {
        //     // User has deleted account
        //     remove("profile");
        //     if (profile) {
        //       toast.error("Avatar not found in IC. Please try creating again");
        //     }
        //     updateProfile(undefined);
        //   } else {
        //     toast.error("Error: " + Object.keys(result.err)[0]);
        //   }
        // }
      });
    }
  }, [actor]);

  if (!authClient) return null;

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          position: "bottom-center",
        }}
      />
      {/* <ErrorBoundary> */}
        <AppContext.Provider
          value={{
            authClient,
            setAuthClient,
            isAuthenticated,
            setIsAuthenticated,
            login,
            logout,
            actor,
            profile,
            updateProfile,
          }}
        >
            <Router>
              <RedirectManager />
              <Layout>
              <Header>
                <div id="header-container">
                  <p>1.435</p>
                  <Route path="/manage">
                    <Button type="text" id="logout" onClick={logout}>Log out</Button>
                  </Route>
                  <Route path="/create">
                    <Button type="text" id="logout" onClick={logout}>Log out</Button>
                  </Route>
                </div>
              </Header>
              <Layout>
              <Sider>
                <CreateProfile />
              </Sider>
              <Content>
                <Row>
                  <Switch>
                    <Route path="/" exact>
                        <Home />
                        <NotAuthenticated />            
                    </Route>
                    <Route path="/manage" exact>
                      <ManageProfile />
                    </Route>
                    <Route path="/create" exact>
                      <Profile />
                    </Route>
                  </Switch>
                </Row>
              </Content>
              </Layout>
              <Footer>Footer</Footer>
              </Layout>
            </Router>
        </AppContext.Provider>
      {/* </ErrorBoundary> */}
    </>
  );
};

export default App;
