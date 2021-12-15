import { Form, Input, Button, Checkbox } from 'antd';

import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  Bio,
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
import ProfileUpload from "./ProfileUpload";

interface Props {
  profile: ProfileUpdate;
  submitCallback: (profile: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
}

class Profile extends React.Component<Props> {
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
    const { about, displayName, familyName, givenName, location } =
      this.state.profile.bio;
    return (
      <section>
          <p>个人页预览</p>
      </section>
    );
  }
}

export default Profile;
