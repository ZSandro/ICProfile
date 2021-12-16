import * as React from "react";
import NotAuthenticated from "./components/NotAuthenticated";
import Home from "./components/Home";
import { _SERVICE, ProfileUpdate } from "../../declarations/avatar/avatar.did";
import toast, { Toaster } from "react-hot-toast";
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
import ProfileEditor from "./components/ProfileEditor";
import ProfileShow from "./components/ProfileShow";
import CommonItemEditor from "./components/CommonItemEditor";
import ProfilePage from "./components/ProfilePage";
import { emptyProfile, useAuthClient, useProfile } from "./hooks";
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass } from "@dfinity/agent";
import { useEffect } from "react";
import { clear, remove } from "local-storage";
import { useState } from "react";
import RedirectManager from "./components/RedirectManager";
import { profilesMatch } from "./utils";
import { Layout, Button,  Row, Image } from 'antd';
import 'antd/dist/antd.css';
import '../assets/main.css';
const { Header, Footer, Sider, Content } = Layout;

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
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingId, setEditingId] = React.useState(0);
  const identity = authClient?.getIdentity();
  const { profile, updateProfile } = useProfile({ identity });

  const backMethod = ()=> {
    setIsEditing(false)
  }

  const enterEditingMethod = (id: number) => {
    setIsEditing(true)
    setEditingId(id)
  }

  useEffect(() => {
    if (history.location.pathname === "/") return;
    if (actor) {
      if (!profile) {
        toast.loading("Checking the IC for an existing avatar");
      }
      // actor.read().then((result) => {
      //   if (history.location.pathname === "/") return;
      //   // if ("ok" in result) {
      //   //   // Return if IC profile matches current
      //   //   if (profilesMatch(profile, result.ok)) {
      //   //     return;
      //   //   }
      //   //   toast.success("Updated avatar from IC");
      //   //   updateProfile(result.ok);
      //   // } else {
      //   //   if ("NotAuthorized" in result.err) {
      //   //     // clear local delegation and log in
      //   //     toast.error("Your session expired. Please reauthenticate");
      //   //     logout();
      //   //   } else if ("NotFound" in result.err) {
      //   //     // User has deleted account
      //   //     remove("profile");
      //   //     if (profile) {
      //   //       toast.error("Avatar not found in IC. Please try creating again");
      //   //     }
      //   //     updateProfile(undefined);
      //   //   } else {
      //   //     toast.error("Error: " + Object.keys(result.err)[0]);
      //   //   }
      //   // }
      // });
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
            <Header className="header-container">
              <Image width={150} height={100} src="../assets/logo.png" preview={false}/>
                <Route path="/manage">
                  <Button type="text" className="logout" onClick={logout}>Log out</Button>
                </Route>
                <Route path="/create">
                  <Button type="text" className="logout" onClick={logout}>Log out</Button>
                </Route>
            </Header>
            <Layout>
              <Sider width={90} className="side_operation">
                <p className="side_op_item">模板</p>
                <p className="side_op_item">主题</p>
              </Sider>
              <Sider width={440}>
                { isEditing? (
                  (editingId == 0) ?
                  (<CreateProfile onBack={backMethod}/>): 
                  (<CommonItemEditor onBack={backMethod}/>)) 
               : (
                 <ProfileEditor enterEditing={enterEditingMethod}/>)
                }
              </Sider>
              <Content>
                <Row>
                  <Switch>
                    <Route path="/" exact>
                      <Home />
                      <NotAuthenticated />
                    </Route>
                    <Route path="/manage" exact>
                      <ProfileShow />
                    </Route>
                    <Route path="/create" exact>
                      <ProfileShow />
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
