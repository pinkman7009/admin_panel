import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { useDispatch } from "react-redux";
import { blockUser } from "../../../actions/roleAction";

const CustomerDetailsList = ({ customers }) => {
    const dispatch = useDispatch();

    const BlockClick = (id) => {
        dispatch(blockUser(id));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Options</th>
                </tr>
            </thead>

            <tbody>
                {customers.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <div className="button-group">
                                    <ViewButton text="Edit" />
                                    <DeleteButton text="Delete" />
                                    {item.blockedStatus ? (
                                        <DeleteButton
                                            text="UnBlock"
                                            handleClick={() =>
                                                BlockClick(item._id)
                                            }
                                        />
                                    ) : (
                                        <DeleteButton
                                            text="Block"
                                            handleClick={() =>
                                                BlockClick(item._id)
                                            }
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CustomerDetailsList;
