import { clear, remove, set } from "local-storage";
import { Form, Input, Button, Checkbox } from 'antd';
import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
import ProfileUpload from "./ProfileUpload";
import ProfileSelectIcon from "./ProfileSelectIcon";
import ColorFill from "@spectrum-icons/workflow/ColorFill";

interface Props {
  profile?: ProfileUpdate;
  submitCallback: (profile?: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
}
const { TextArea } = Input;

class ProfileForm extends React.Component<Props> {
  state = { profile: emptyProfile };
  formRef = React.createRef();
  private mRealProfile?: ProfileUpdate = emptyProfile;

  constructor(props: Props) {
    super(props);
    this.mRealProfile = this.props.profile
  }

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
  }

  handleChange(key: string, value: string) {
    //TODO 做一下值是否变化的判断，再进行更新
    if (this.mRealProfile) {
        switch(key) {

          case "about": this.mRealProfile.bio.about = [value]; break;
          case "nickName": this.mRealProfile.bio.nickName = [value]; break;
          case "location": this.mRealProfile.bio.location = [value]; break;

        }
    }
    this.props.submitCallback(this.mRealProfile)
  }

  //TOOD 可参考handleChange处理方式
  handleImage(image: string) {
    this.props.submitCallback(this.mRealProfile)
  }

  handleSubmit() {
    this.props.submitCallback(this.mRealProfile)
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const handleImage = this.handleImage.bind(this);
    return (
      <section>
      <div className="center_div_box">
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
        </div>
        <ProfileUpload
          onChange={handleImage}
          defaultImage="../../assets/avatar_defult.png"
        />
        <p className="editor_profile_tips">Name</p>
        <TextArea
        className="editor_profile_Name_style"

          onChange={(value) => handleChange("nickName", value.target.value)} 
          bordered={false}
        />
        <p></p>

        <p className="editor_profile_tips">Subheadline</p>
        <TextArea
        className="editor_profile_Subheadline_style"
          onChange={(value) => handleChange("about", value.target.value)} 
          bordered={false}
        />
        
        <ProfileSelectIcon
          profile={this.props.profile} 
          actor={this.props.actor} 
          submitCallback={this.props.submitCallback}
        />
        
      </section>
    );
  }
}

export default ProfileForm;
