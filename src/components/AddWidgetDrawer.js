import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addWidget, removeWidget } from "../store/dashboardSlice";

const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 50%; 
  height: 100%;
  color: white;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #003366;
  color: white;
  border-radius: 5px;
  padding: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: 0;
  background: white;
  padding: 20px;
  border-radius: 5px;
  flex: 1;
  overflow: auto;
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.isActive ? "#003366" : "#a9a9a9")};
  padding: 10px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 10px;
  border-bottom: ${(props) => (props.isActive ? "2px solid #003366" : "none")};
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

const WidgetList = styled.div`
  margin-top: 20px;
`;

const WidgetItem = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  color: #000;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #003366; 
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); 
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const ContentText = styled.p`
  color: black;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.primary ? "#007bff" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#007bff")};
  border: 1px solid #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const AddWidgetButton = styled.button`
  background-color: #007bff;
  color: white;  
  border: 1px solid #007bff; 
  padding: 10px 20px; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 1em; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
  margin-top: 10px; 
  transition: background-color 0.3s ease, border-color 0.3s ease; 

  &:hover {
    background-color: #0056b3; 
    border-color: #0056b3; 
  }
`;

const WidgetName = styled.strong`
  margin-bottom: 2px;
  font-size: 1.2em; 
  padding: 5px; 
  border-radius: 5px; 
`;

const AddWidgetDrawer = ({ isOpen, onClose, selectedCategory }) => {
  const [activeTab, setActiveTab] = useState(selectedCategory || "cspm");
  const [widgetName, setWidgetName] = useState("");
  const [widgetContent, setWidgetContent] = useState("");
  const [pendingWidget, setPendingWidget] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.dashboard.categories);

  useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddWidget = () => {
    setPendingWidget({
      id: widgetName.toLowerCase().replace(/\s+/g, "_"),
      name: widgetName,
      content: widgetContent,
    });
    setPendingAction("add");
  };

  const handleCheckboxChange = (widgetId, checked) => {
    if (!checked) {
      setPendingWidget({ id: widgetId });
      setPendingAction("remove");
    }
  };

  const handleConfirm = () => {
    if (pendingAction === "add") {
      dispatch(addWidget({ categoryId: activeTab, widget: pendingWidget }));
    } else if (pendingAction === "remove") {
      dispatch(
        removeWidget({ categoryId: activeTab, widgetId: pendingWidget.id })
      );
    }
    setPendingWidget(null);
    setPendingAction(null);
    setWidgetName("");
    setWidgetContent("");
    onClose();
  };

  const handleCancel = () => {
    setPendingWidget(null);
    setPendingAction(null);
    setWidgetName("");
    setWidgetContent("");
    onClose();
  };

  const activeCategory = categories.find(
    (category) => category.id === activeTab
  );

  return (
    <DrawerWrapper isOpen={isOpen}>
      <Header>
        <Title>Add Widget</Title>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Header>
      <Content>
        <ContentText>
          Personalize your dashboard by adding the following widget:
        </ContentText>
        <div>
          <Tab
            isActive={activeTab === "cspm"}
            onClick={() => handleTabChange("cspm")}
          >
            CSPM
          </Tab>
          <Tab
            isActive={activeTab === "cwpp"}
            onClick={() => handleTabChange("cwpp")}
          >
            CWPP
          </Tab>
          <Tab
            isActive={activeTab === "registry"}
            onClick={() => handleTabChange("registry")}
          >
            Registry
          </Tab>
        </div>
        <TabContent>
          {activeCategory && (
            <>
              <Input
                type="text"
                placeholder="Widget Name"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
              />
              <Textarea
                placeholder="Widget Content"
                value={widgetContent}
                onChange={(e) => setWidgetContent(e.target.value)}
              />
              <AddWidgetButton onClick={handleAddWidget}>
                Add Widget
              </AddWidgetButton>
              <WidgetList>
                {activeCategory.widgets.map((widget) => (
                  <WidgetItem key={widget.id}>
                    <Checkbox
                      type="checkbox"
                      checked={true}
                      onChange={(e) =>
                        handleCheckboxChange(widget.id, e.target.checked)
                      }
                    />
                    <div>
                      <WidgetName>{widget.name}</WidgetName>
                    </div>
                  </WidgetItem>
                ))}
              </WidgetList>
              {(pendingAction === "add" || pendingAction === "remove") && (
                <ButtonGroup>
                  <ActionButton onClick={handleCancel}>Cancel</ActionButton>
                  <ActionButton primary onClick={handleConfirm}>
                    Confirm
                  </ActionButton>
                </ButtonGroup>
              )}
            </>
          )}
        </TabContent>
      </Content>
    </DrawerWrapper>
  );
};

export default AddWidgetDrawer;
