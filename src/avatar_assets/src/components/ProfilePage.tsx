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
}

class ProfilePage extends React.Component<Props> {
  state = { profile: emptyProfile, isPhone: false };

  formRef = React.createRef();
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
  }

  changeValue() {
    let result = this.state.isPhone
    this.setState({isPhone: !result})
  }

render() {
  const { nickName, location, about } =
    this.state.profile.bio;
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
                    <Profile></Profile>
        </div>): (
            <Profile></Profile>
        )
        }
      </div>  
  );
}
}

export default ProfilePage;
