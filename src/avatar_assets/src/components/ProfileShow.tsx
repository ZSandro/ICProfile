import { Form, Input, Button, Checkbox, Image, Descriptions } from 'antd';

import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  Bio,
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
import ProfileUpload from "./ProfileUpload";
import { AppContext } from "../App";
import { useContext } from "react";

interface Props {
  profile?: ProfileUpdate;
  submitCallback?: (profile: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
}


class ProfileShow extends React.Component<Props> {
  state = { profile: emptyProfile };


  formRef = React.createRef();

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
  }


  render() {
    const { nickName, location, about } =
      this.state.profile.bio;
    return (
      <section>
        <p>个人页预览</p>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Descriptions title="User Info">
          <Descriptions.Item label="name">{nickName}</Descriptions.Item>
          <Descriptions.Item label="displayName">{nickName}</Descriptions.Item>
          <Descriptions.Item label="givenName">{nickName}</Descriptions.Item>
          <Descriptions.Item label="location">{location}</Descriptions.Item>
          <Descriptions.Item label="about">{about}</Descriptions.Item>
          <Descriptions.Item label="familyName">{nickName}</Descriptions.Item>
        </Descriptions>,
      </section>
    );
  }


}

export default ProfileShow;
