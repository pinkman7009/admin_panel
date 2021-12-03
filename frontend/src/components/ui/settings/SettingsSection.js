import React, { useState } from "react";

const SettingsSection = () => {
  const [now, setNow] = useState("Private Policy");

  const onClick = (value) => {
    setNow(value);
  };

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
        <p>Data for Private Policy</p>
      ) : now === "Terms & Condition" ? (
        <p>Data for Terms and Conditions</p>
      ) : (
        <p>Data for Contact Us</p>
      )}
    </>
  );
};

export default SettingsSection;
