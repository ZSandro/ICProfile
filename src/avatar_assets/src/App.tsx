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
import ProfileEditor from "./components/ProfileEditor";
import CommonItemEditor from "./components/CommonItemEditor";
import ProfilePage from "./components/ProfilePage";
import { emptyProfile, useAuthClient, useProfile } from "./hooks";
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass } from "@dfinity/agent";
import { useEffect } from "react";
import { clear, remove, set } from "local-storage";
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
  const [isModify, setIsModify] = React.useState(false);
  const identity = authClient?.getIdentity();

  const [ profile, updateProfile ] = React.useState(emptyProfile)

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
    }
  }, [actor]);

  function handleCreationError() {
    remove("profile");
    setIsAuthenticated?.(false);
    //updateProfile?.(emptyProfile);
    toast.error("There was a problem creating your profile");
  }

//点击提交会调用这个方法，在这里通知右边界面刷新
const submitCallback = async (profile?: ProfileUpdate) => {
  // Save profile locally
  if (profile) {
    updateProfile(profile)
    let modify = isModify
    setIsModify(!modify)
    console.log("Data update")
  } else {
    toast.success("Failure");
  }
  // set("profile", JSON.stringify(profile));
  // toast.success(JSON.stringify(profile));
  // Optimistic update
  // updateProfile?.(profile);
  // history.push("/manage");

  // Handle creation and verification async
  // actor?.create(profile).then(async (createResponse) => {
  //   if ("ok" in createResponse) {
  //     // const profileResponse = await actor.read();
  //     // if ("ok" in profileResponse) {
  //     //   // Do nothing, we already updated
  //     // } else {
  //     //   console.error(profileResponse.err);
  //     //   handleCreationError();
  //     // }
  //   } else {
  //     handleCreationError();
  //     remove("ic-delegation");
  //     console.error(createResponse.err);
  //   }
  // });
};

  if (!authClient) return null;

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          position: "bottom-center",
        }}
      />
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
                  (<CreateProfile profile={profile} onBack={backMethod} submitCallback={submitCallback}/>): 
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
                      <ProfilePage profile={profile} isModify={isModify}/>
                    </Route>
                    <Route path="/create" exact>
                      <ProfilePage profile={profile} isModify={isModify}/>
                    </Route>
                  </Switch>
                </Row>
              </Content>
            </Layout>
            <Footer>Footer</Footer>
          </Layout>
        </Router>
      </AppContext.Provider>
    </>
  );
};

export default App;
