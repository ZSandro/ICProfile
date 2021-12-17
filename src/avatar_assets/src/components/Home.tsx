import * as React from "react";
import { _SERVICE } from "../../../declarations/avatar/avatar.did";
import { useHistory } from "react-router-dom";
import {Button, Modal, List, Avatar, Image, Row, Col} from 'antd'
import { AppContext } from "../App";
import { useContext } from "react";


function Home() {
  const history = useHistory();
  const { isAuthenticated, login, profile } = useContext(AppContext);

  return (
    <div className="loginBox">
      <Image width={150} height={100} src="../assets/logo.png" preview={false} />
      <Button  className="loginBtn" type="primary" shape="round" size="large"
        block onClick={login}>
        点击登陆
      </Button>
    </div>
  );
}

export default React.memo(Home);
