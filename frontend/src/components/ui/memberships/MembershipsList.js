import React from "react";
import "../../../styles/Memberships.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { FaCheck, FaTimes } from "react-icons/fa";

const MembershipsList = ({ memberships }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Membership Name</th>
                    <th>Price</th>
                    <th>Create Post Limit</th>
                    <th>View Post</th>
                    <th>Can Comment</th>
                    <th>Can Delete Post</th>
                    <th>Options</th>
                </tr>
            </thead>

            <tbody>
                {memberships?.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.createPostLimit}</td>
                            <td>{item.viewPost ? <FaCheck /> : <FaTimes />}</td>
                            <td>
                                {item.canComment ? <FaCheck /> : <FaTimes />}
                            </td>
                            <td>
                                {item.canDeletePost ? <FaCheck /> : <FaTimes />}
                            </td>
                            <td>
                                <div className="button-group">
                                    <ViewButton text="Edit" />
                                    <DeleteButton text="Delete" />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default MembershipsList;
