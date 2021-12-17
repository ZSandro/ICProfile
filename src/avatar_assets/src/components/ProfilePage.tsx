import { Radio, Button, Image, Descriptions } from 'antd';

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
  state = { isPhone: false };

  formRef = React.createRef();
  constructor(props: Props) {
    super(props);
  }

  changeValue() {
    let result = this.state.isPhone
    this.setState({isPhone: !result})
  }

  componentWillReceiveProps() {
    console.log("Data recice")
  }

render() {
  const changeState = this.changeValue.bind(this)
  return (
      <div className="preview_page">
        <div className="preview_header">
          <Radio.Group defaultValue="a" buttonStyle="solid" onChange={changeState}>
            <Radio.Button value="a">电脑</Radio.Button>
            <Radio.Button value="b">手机</Radio.Button>
          </Radio.Group>
          <Button type="primary" shape="round" className="preview_publish">发布</Button>
        </div>
        {(this.state.isPhone)? (<div className="preview_page_phone"> 
                    <Profile profile={this.props.profile}></Profile>
        </div>): (
            <Profile profile={this.props.profile}></Profile>
        )
        }
      </div>  
  );
}
}

export default ProfilePage;
