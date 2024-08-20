import { createSlice } from '@reduxjs/toolkit';
import initialData from '../data/dashboard.json';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    categories: initialData.categories
  },
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      category.widgets.push(widget);
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
    }
  }
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
