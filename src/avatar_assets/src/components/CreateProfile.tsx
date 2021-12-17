import { remove, set } from "local-storage";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import ProfileForm from "./ProfileForm";
import toast from "react-hot-toast";
import { emptyProfile } from "../hooks";
import { useContext } from "react";
import { AppContext } from "../App";
import { useHistory } from "react-router-dom";
import { PageHeader } from "antd"; 

interface Props {
  onBack: () => void;
  submitCallback: (profile?: ProfileUpdate) => void;
  profile: ProfileUpdate
}

const CreateProfile = (props: Props) => {
  const { setIsAuthenticated, isAuthenticated, actor } =
    useContext(AppContext);
  const history = useHistory();
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={props.onBack}
        title="个人信息"
      />,
      <ProfileForm
        submitCallback={props.submitCallback}
        actor={actor}
        profile={props.profile}
      />
    </div>

  );
};

export default CreateProfile;
