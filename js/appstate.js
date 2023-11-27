const __APP_STATE__ = {
    statsTableData: [],
    statsTableAvaliableCountries: [],
    statsTableFilters: null,

    setStatsTableFilters(filters) {
      this.statsTableFilters = filters;
      localStorage.setItem("statsTableFilters", JSON.stringify(filters));
    },

    getStatsTableFilters() {
      this.statsTableFilters = JSON.parse(localStorage.getItem("statsTableFilters"));
      return this.statsTableFilters;
    },
};

(function() {
    __APP_STATE__.statsTableData = [
        {
          country: "Russia",
          numberOfCompanies: 100,
          numberOfEmployees: 50,
          totalUsers: 150  
        },
        {
          country: "Serbia",
          numberOfCompanies: 200,
          numberOfEmployees: 20,
          totalUsers: 220  
        },
        {
          country: "Finland",
          numberOfCompanies: 200,
          numberOfEmployees: 20,
          totalUsers: 220  
        },
        {
          country: "USA",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550  
        },
        {
          country: "France",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550  
        },
        {
          country: "Ukraine",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550
        },
        {
          country: "Poland",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550 
        },
    ];

    __APP_STATE__.statsTableAvaliableCountries = __APP_STATE__.statsTableData.map(item => item.country);
})();
