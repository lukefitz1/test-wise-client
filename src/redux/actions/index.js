import testWiseApi from "../../api/testWise";

export const storeLoginData = (token) => async (dispatch) => {
  console.log(`Saving login data`);

  dispatch({
    type: "STORE_LOGIN_DATA",
    payload: token,
  });
};

export const fetchOrganization = (orgId) => async (dispatch) => {
  console.log(`Fetching the org data for ${orgId}`);
  const response = await testWiseApi.get(`/api/organizations/${orgId}`);

  dispatch({
    type: "FETCH_ORGANIZATION",
    payload: response.data,
  });
};
