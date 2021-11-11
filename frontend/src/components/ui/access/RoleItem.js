import React from "react";

const RoleItem = ({ role }) => {
    return (
        <div className="role-item">
            <h3>
                {" "}
                {role.firstname} {role.lastname}
            </h3>
            <p>{role.email}</p>
            {role.role === 0 ? <p>Admin</p> : <p>Not Admin</p>}
        </div>
    );
};

export default RoleItem;
