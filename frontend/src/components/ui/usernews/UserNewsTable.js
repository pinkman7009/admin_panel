import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { denyUserNews, approveUserNews } from "../../../actions/newsAction";

const UserNewsTable = ({ userNews }) => {
  const dispatch = useDispatch();

  return (
    userNews?.length > 0 && (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {userNews.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.category.value}</td>
                <td>{item.country}</td>
                <td>{item.state}</td>
                <td>{item.city}</td>
                <td>
                  <div className="button-group">
                    <ViewButton
                      text="Approve"
                      handleClick={() => dispatch(approveUserNews(item._id))}
                    />
                    <ViewButton text="View More" />
                    <DeleteButton
                      text="Deny"
                      handleClick={() => dispatch(denyUserNews(item._id))}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
};

export default UserNewsTable;
