import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store/store";
import Dashboard from "./components/Dashboard";
import AddWidgetDrawer from "./components/AddWidgetDrawer"; 
import styled from "styled-components";

const AppWrapper = styled.div`
  position: relative;
`;

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddWidgetClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper>
          <Dashboard onAddWidgetClick={handleAddWidgetClick} />
          <AddWidgetDrawer 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            selectedCategory={selectedCategory} 
          />
        </AppWrapper>
      </PersistGate>
    </Provider>
  );
}

export default App;
