import React from "react";
import Widget from "./Widget";
import styled from "styled-components";

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const AddWidgetCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AddWidgetButton = styled.button`
  background-color: white;
  color: gray;
  border: 1px solid #d3d3d3;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const PlusIcon = styled.span`
  font-size: 24px;
`;

const Category = ({ category, onAddWidgetClick }) => {
  return (
    <CategoryWrapper>
      <WidgetGrid>
        {category.widgets.map((widget) => (
          <Widget key={widget.id} categoryId={category.id} widget={widget} />
        ))}
        <AddWidgetCard onClick={() => onAddWidgetClick(category.id)}>
          <AddWidgetButton>
            <PlusIcon>+</PlusIcon>Add Widget
          </AddWidgetButton>
        </AddWidgetCard>
      </WidgetGrid>
    </CategoryWrapper>
  );
};

export default Category;
