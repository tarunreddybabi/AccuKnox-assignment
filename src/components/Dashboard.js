import React, { useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";
import AddWidgetDrawer from "./AddWidgetDrawer";
import styled from "styled-components";

const DashboardWrapper = styled.div`
  padding: 20px;
  background-color: #f5f6f8;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h2`
  margin: 0;
`;

const AddWidgetButton = styled.button`
  background-color: white;
  color: gray;
  border: 1px solid #d3d3d3;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
`;

const PlusIcon = styled.span`
  font-size: 20px;
`;

const Dashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddWidgetClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedCategory(null);
  };

  const categories = useSelector((state) => state.dashboard.categories);

  return (
    <DashboardWrapper>
      <HeaderWrapper>
        <HeaderTitle>CNAPP Dashboard</HeaderTitle>
        <AddWidgetButton onClick={() => handleAddWidgetClick("cspm")}>
          <PlusIcon>+</PlusIcon>Add Widget
        </AddWidgetButton>
      </HeaderWrapper>
      {categories.map((category) => (
        <div key={category.id} className="dashboard-section">
          <h2>{category.name}</h2>
          <Category
            category={category}
            onAddWidgetClick={handleAddWidgetClick}
          />
        </div>
      ))}
      <AddWidgetDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        selectedCategory={selectedCategory}
      />
    </DashboardWrapper>
  );
};

export default Dashboard;
