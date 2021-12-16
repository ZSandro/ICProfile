import { remove, set } from "local-storage";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import Profile from "./Profile";
import toast from "react-hot-toast";
import { emptyProfile } from "../hooks";
import { useContext } from "react";
import { AppContext } from "../App";
import { useHistory } from "react-router-dom";
import { PageHeader } from "antd"; 

interface Props {
  onBack: () => void;
  submitCallback: (profile: ProfileUpdate) => void;
}

const ProfileShowControl = (props: Props) => {
  const { setIsAuthenticated, isAuthenticated, actor, profile, updateProfile } =
    useContext(AppContext);
  const history = useHistory();

  return (
    <div>
      <Profile
        submitCallback={props.submitCallback}
        actor={actor}
        profile={profile}
      />
    </div>

  );
};

export default ProfileShowControl;
