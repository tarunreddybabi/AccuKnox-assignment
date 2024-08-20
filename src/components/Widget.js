import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeWidget } from "../store/dashboardSlice";

const WidgetWrapper = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 2px solid red;
  color: red;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h3`
  font-size: 26px;
  margin: 0;
  color: #333;
`;

const Widget = ({ categoryId, widget }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    console.log(
      `Removing widget with id ${widget.id} from category ${categoryId}`
    );
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
    <WidgetWrapper>
      <RemoveButton onClick={handleRemove}>×</RemoveButton>
      <Heading>{widget.name}</Heading>
      <p>{widget.content}</p>
    </WidgetWrapper>
  );
};

export default Widget;
