import React, { useEffect } from "react";
import "../../../styles/News.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getNews, deleteNews } from "../../../actions/newsAction";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
const NewsList = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.news) dispatch(getNews());
  }, []);

  const adminNews = state.news?.filter((item) => item.user.role === 0);

  const handleDelete = (item) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: `delete news ${item.title}`,
        handleClick: () => {
          dispatch(deleteNews(item._id));
          dispatch({ type: CLOSE_MODAL });
        },
      },
    });
  };

  return (
    // <div className="news-list">
    //   {adminNews?.map((item) => {
    //     return (
    //       <div key={item.id} className="news-item">
    //         <img
    //           src="https://news-codewithnazim.vercel.app/static/media/Blog.dec5283b.png"
    //           alt=""
    //         />
    //         <div className="news-body">
    //           <h3 className="news-title">{item.title}</h3>

    //           <div className="news-body-group">
    //             <label htmlFor="">Written by: </label>
    //             <p>Lucy Smith</p>
    //           </div>

    //           <div className="news-body-group">
    //             <label htmlFor="">Created at: </label>
    //             <p>2 days ago</p>
    //           </div>

    //           {/* <p>{item.desc}</p> */}
    //           <div className="button-group">
    //             <ViewButton text="More details" />
    //             <ViewButton text="Edit" />
    //             <DeleteButton text="Delete" />
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
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
        {adminNews?.map((item, index) => {
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
                  <ViewButton text="Edit" />
                  <ViewButton text="View More" />
                  <DeleteButton
                    text="Delete"
                    handleClick={() => handleDelete(item)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NewsList;
