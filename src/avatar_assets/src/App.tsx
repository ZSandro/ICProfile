import * as React from "react";
import NotAuthenticated from "./components/NotAuthenticated";
import Home from "./components/Home";
import { _SERVICE, ProfileUpdate } from "../../declarations/avatar/avatar.did";
import toast, { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { createBrowserHistory } from "history";
import CreateProfile from "./components/CreateProfile";
import ProfileEditor from "./components/ProfileEditor";
import CommonItemEditor from "./components/CommonItemEditor";
import ProfilePage from "./components/ProfilePage";
import Profile from "./components/Profile";
import { emptyProfile, useAuthClient, useProfile } from "./hooks";
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass } from "@dfinity/agent";
import { useEffect } from "react";
import { clear, remove, set } from "local-storage";

import RedirectManager from "./components/RedirectManager";
import { profilesMatch } from "./utils";
import { Layout, Button, Row, Image } from 'antd';
import 'antd/dist/antd.css';
import '../assets/main.css';
import { Principal } from "@dfinity/candid/lib/cjs/idl";

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
  login: () => { },
  logout: () => { },
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

  const [profile, updateProfile] = React.useState(emptyProfile)

  const backMethod = () => {
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

  //?????????????????????????????????????????????????????????????????????
  const submitCallback = async (profile?: ProfileUpdate) => {
    // Save profile locally
    if (profile) {
      updateProfile(profile)
      let modify = isModify
      setIsModify(!modify)
    } else {
      toast.success("Failure");
    }
  };

  const readProfile = {
    
  }

  const saveProfileUpdate = async()=> {
    toast.success(JSON.stringify(profile));
    actor?.create(profile).then(async (createResponse) => {
      console.log(createResponse)
    });
  }

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
          <Route path="/login">
            <Home />
          </Route>
          <Route path="/user">
            <Profile profile={profile} />
          </Route>
          <Route path="/create">
            <Layout>
              <Header className="header-container">
                    <Image className="header-logo" src="../assets/logo.png" preview={false} />
                    <div className="header-right-zone">
                    <Image className="header-information" src="../assets/Information.svg" preview={false}/>
                    <Button type="text" className="header-logout" onClick={logout}>Log out</Button>
                    </div>
              </Header>
              <Layout>
                <Sider width={70} className="side_operation">
                  <div>
                    <Image src="../assets/User.svg"></Image>
                    <p className="side_op_item">??????</p>
                  </div>
                  <div>
                    <Image src="../assets/Cloud.svg"></Image>
                    <p className="side_op_item">??????</p>
                  </div>
                </Sider>
                <Sider width={280}>
                  {isEditing ? (
                    (editingId == 0) ?
                      (<CreateProfile profile={profile} onBack={backMethod} submitCallback={submitCallback} />) :
                      (<CommonItemEditor onBack={backMethod} />))
                    : (
                      <ProfileEditor enterEditing={enterEditingMethod} />)
                  }
                </Sider>
                <Content>
                  <Row>
                    <Switch>
                      <Route path="/" exact>
                        <Home />
                        <NotAuthenticated />
                      </Route>
                      <ProfilePage profile={profile} isModify={isModify} publish={saveProfileUpdate}/>
                    </Switch>
                  </Row>
                </Content>
              </Layout>
              <Footer>Footer</Footer>
            </Layout>
          </Route>
        </Router>
      </AppContext.Provider>
    </>
  );
};

export default App;
