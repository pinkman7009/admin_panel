import React, { useState, useEffect } from "react";
import "../../../styles/News.css";
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../../../actions/channelsAction";
import FilterBar from "../FilterBar";

const ChannelsList = () => {
  const filterOptions = [
    {
      title: "Channel Name",
      value: "name",
    },
  ];
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState(filterOptions[0].value);
  const [filterText, setFilterText] = useState("");

  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.channels) dispatch(getChannels());
  }, []);

  let channels = state.channels;

  if (filterText) {
    channels = state.channels.filter((item) =>
      item[filterValue]?.toLowerCase().includes(filterText)
    );
  }

  console.log(state.channels);

  return (
    <>
      <FilterBar
        filterOptions={filterOptions}
        filterValue={filterValue}
        filterText={filterText}
        setFilterText={setFilterText}
        setFilterValue={setFilterValue}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Videos</th>
            <th>Subscribers</th>
            <th>User</th>
          </tr>
        </thead>

        <tbody>
          {channels?.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.videos.length}</td>
                <td>{item.subscribers.length}</td>
                <td>{item.user.firstname + " " + item.user.lastname}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ChannelsList;
