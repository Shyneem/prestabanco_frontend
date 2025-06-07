import http from "../http-common";

const feeService = {
  getFees: async () => {
    const response = await http.get("/fees/");
    return { data: response.data };
  }
};

export default feeService;