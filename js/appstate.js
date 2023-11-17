const __APP_STATE__ = {
    statsTableData: [],
    statsTableAvaliableCountries: [],
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
