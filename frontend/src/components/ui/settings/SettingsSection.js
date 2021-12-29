import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsandConditions from "./TermsandConditions";
import ContactUs from "./ContactUs";
import { getSettings } from "../../../actions/settingsActions";
import "../../../styles/Settings.css";

const SettingsSection = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [now, setNow] = useState("Private Policy");

  const onClick = (value) => {
    setNow(value);
  };

  useEffect(() => {
    if (!state.settings) dispatch(getSettings());
  }, []);

  return (
    <>
      <div className="button-group">
        <button
          className={
            now === "Private Policy" ? "outline-btn active" : "outline-btn"
          }
          onClick={() => onClick("Private Policy")}
        >
          Private Policy
        </button>
        <button
          className={
            now === "Terms & Condition" ? "outline-btn active" : "outline-btn"
          }
          onClick={() => onClick("Terms & Condition")}
        >
          Terms & Conditions
        </button>
        <button
          className={
            now === "Contact Us" ? "outline-btn active" : "outline-btn"
          }
          onClick={() => onClick("Contact Us")}
        >
          Contact Us
        </button>
      </div>
      {now === "Private Policy" ? (
        <PrivacyPolicy data={state.settings?.PrivatePolicy} />
      ) : now === "Terms & Condition" ? (
        <TermsandConditions data={state.settings?.TermsAndConditions} />
      ) : (
        <ContactUs data={state.settings?.ContactUs} />
      )}
    </>
  );
};

export default SettingsSection;
