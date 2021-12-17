import { Radio, Button, Modal } from 'antd';

import { ActorSubclass } from "@dfinity/agent";
import Profile from "./Profile"
import React from "react";
import {
  Bio,
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";

interface Props {
  profile?: ProfileUpdate;
  submitCallback?: (profile: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
  isModify: Boolean;
}

class ProfilePage extends React.Component<Props> {
  state = { isPhone: false, visible: false };

  formRef = React.createRef();
  constructor(props: Props) {
    super(props);
  }

  changeValue() {
    let result = this.state.isPhone
    this.setState({isPhone: !result})
  }

  publish() {
    this.setState({visible: true});
  }

 handleOk() {
   this.setState({visible: false})
  }

render() {
  const changeState = this.changeValue.bind(this)
  const publish = this.publish.bind(this)
  const handleOk = this.handleOk.bind(this)
  return (
      <div className="preview_page">
        <div className="preview_header">
          <Radio.Group defaultValue="a" buttonStyle="solid" onChange={changeState}>
            <Radio.Button value="a">电脑</Radio.Button>
            <Radio.Button value="b">手机</Radio.Button>
          </Radio.Group>
          <Button type="text" shape="round" className="preview_publish" onClick={publish}>Publish</Button>
        </div>
        {(this.state.isPhone)? (<div className="preview_page_phone"> 
                    <Profile profile={this.props.profile}></Profile>
        </div>): (
            <Profile profile={this.props.profile}></Profile>
        )
        }
        <Modal
            title="复制分享给你的好友"
            visible={this.state.visible}
            onOk={handleOk}
            onCancel={handleOk}
            width={700}>
          <p>https://www.baidu.com</p>

      </Modal>
      </div>  
  );
}
}

export default ProfilePage;
