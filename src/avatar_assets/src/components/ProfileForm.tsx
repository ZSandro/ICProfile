
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

class ProfileForm extends React.Component<Props> {
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

  handleChange(key: string, value: string) {
    const newState: any = { profile: this.state.profile };
    newState.profile.bio[key] = value ? [value] : [];
    this.setState(newState);
  }

  handleImage(image: string) {
    const newState: any = { profile: this.state.profile };
    newState.profile.image = image ? [image] : [];
    this.setState(newState);
  }

  handleSubmit() {
    const { familyName, givenName } = this.state.profile.bio;
    const newProfile = Object.assign({}, this.state.profile);
    let name: string = [givenName[0], familyName[0]].join(" ");
    newProfile.bio.name = name ? [name] : [];

    this.props.submitCallback(newProfile);
  }

  render() {
    const { about, displayName, familyName, givenName, location } =
      this.state.profile.bio;

    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const handleImage = this.handleImage.bind(this);
    return (
      <section>
        <Form
          onFinish={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ProfileUpload
            onChange={handleImage}
            defaultImage={this.state.profile.image[0]}
          />
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </section>
    );
  }
}

export default ProfileForm;
