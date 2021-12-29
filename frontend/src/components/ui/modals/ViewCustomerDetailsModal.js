import React, { useState, useEffect } from "react";
import image from "../../../images/blank-profile.png";
import "../../../styles/ViewCustomerDetails.css";
import { useDispatch } from "react-redux";
import { getUserById } from "../../../actions/roleAction";
import ViewButton from "../buttons/ViewButton";
import { useNavigate, useParams } from "react-router-dom";
import { getChannelbyUserId } from "../../../actions/channelAction";

const ViewCustomerDetailsModal = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [channel, setChannel] = useState({});

  useEffect(async () => {
    const setuser = await dispatch(getUserById(params.id));
    setUser(setuser);
    const setchannel = await dispatch(getChannelbyUserId(params.id));
    setChannel(setchannel);
  }, []);

  console.log(user);
  console.log(channel);

  return (
    <div>
      <ViewButton
        className="back-button"
        text="Back"
        handleClick={() => {
          navigate("/customerdetails");
        }}
      />
      <div className="formalData">
        <img src={image} className="profileImage" />
        <h2 className="profileName">
          {user.data?.firstname} {user.data?.lastname}
        </h2>
        <div className="OtherDetails">
          {user.data?.phone ? (
            <div>
              Phone Number:<h4>{user.data?.phone}</h4>
            </div>
          ) : (
            <div>
              Phone Number: <h4>No Phone Number</h4>
            </div>
          )}
          <div>
            Email Address: <h4>{user.data?.email}</h4>
          </div>
          {user.data?.ip ? (
            <div>
              IP Address: <h4>{user.data?.ip}</h4>
            </div>
          ) : (
            <div>
              IP Address: <h4>No IP Address</h4>
            </div>
          )}
          <div>
            Plan:<h4>{user.data?.membership_plan?.name}</h4>
          </div>
        </div>
        <div className="OtherDetails">
          <div>
            Followers: <h4>{user.data?.followers.length}</h4>
          </div>
          <div>
            Following: <h4>{user.data?.following.length}</h4>
          </div>
          <br />
          <div className="OtherDetails">
            <div>
              Channel Name: <h4>{channel?.name}</h4>
            </div>
            <div>
              Videos: <h4>{channel?.videos?.length}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerDetailsModal;
