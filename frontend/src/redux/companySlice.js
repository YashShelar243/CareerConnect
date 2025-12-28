import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText:""
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    addCompany: (state, action) => {
      state.companies.push(action.payload); // ✅ adds new company into list
    },
    setSearchCompanyByText:(state,action)=>{
      state.searchCompanyByText=action.payload;
    }
  },
});

export const { setSingleCompany, setCompanies, addCompany,setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;
