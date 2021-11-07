import React from "react";
import "../../../styles/News.css";
import ViewButton from "../buttons/ViewButton";

const NewsList = () => {
  const newsList = [
    {
      id: 1,
      title: "News Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae",
    },
    {
      id: 2,
      title: "News Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae",
    },
    {
      id: 3,
      title: "News Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae",
    },
    {
      id: 4,
      title: "News Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. MolestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae",
    },
  ];
  return (
    <div className="news-list">
      {newsList.map((item) => {
        return (
          <div key={item.id} className="news-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ViewButton />
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
