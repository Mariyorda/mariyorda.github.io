const __APP_STATE__ = {
    statsTableData: [],
    statsTableAvaliableCountries: [],
    statsTableFilters: null,

    usersTableData: [],
    usersTableError: null,
    usersTableDataLoading: false,

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
          totalUsers: 150,
        },
        {
          country: "Serbia",
          numberOfCompanies: 200,
          numberOfEmployees: 20,
          totalUsers: 220,
        },
        {
          country: "Finland",
          numberOfCompanies: 200,
          numberOfEmployees: 20,
          totalUsers: 220,
        },
        {
          country: "USA",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550,
        },
        {
          country: "France",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550,
        },
        {
          country: "Ukraine",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550,
        },
        {
          country: "Poland",
          numberOfCompanies: 500,
          numberOfEmployees: 50,
          totalUsers: 550,
        },
    ];

    __APP_STATE__.statsTableAvaliableCountries = __APP_STATE__.statsTableData.map(item => item.country);

    addEventListener(__CONSTANTS__.USERS_LOADING_START, async event => {
      __APP_STATE__.usersTableDataLoading = true;
  
      dispatchEvent(__UTILS__.createCustomEvent(__CONSTANTS__.USERS_LOADING_STATUS_CHANGE, __CONSTANTS__.FETCH_STATUS_PENDING)); 
  
      try {
          const response = await fetch("https://jsonplaceholder.typicode.com/users");
          const json = await response.json();
          
          dispatchEvent(
              __UTILS__.createCustomEvent(
                  __CONSTANTS__.USERS_LOADING_SUCCESS,
                  {data: json.filter(record => record.username.length >= event.detail.filter.minUsernameLength)}
              )
          );
      } catch (error) {
          dispatchEvent(__UTILS__.createCustomEvent(__CONSTANTS__.USERS_LOADING_FAIL, {error}));
      } finally {
          __APP_STATE__.usersTableDataLoading = false;
      }

      /*
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => {
          dispatchEvent(
            __UTILS__.createCustomEvent(
              __CONSTANTS__.USERS_LOADING_SUCCESS,
              {data: json.filter(record => record.username.length >= event.detail.filter.minUsernameLength)}
            )
          );
        })
        .catch(error => {
          dispatchEvent(__UTILS__.createCustomEvent(__CONSTANTS__.USERS_LOADING_FAIL, {error}));
        })
        .finally(() => __APP_STATE__.usersTableDataLoading = false);
      */
    });

    addEventListener(__CONSTANTS__.USERS_LOADING_SUCCESS, event => {
      __APP_STATE__.usersTableData = event.detail.data;
      dispatchEvent(__UTILS__.createCustomEvent(__CONSTANTS__.USERS_LOADING_STATUS_CHANGE, __CONSTANTS__.FETCH_STATUS_SUCCESS)); 
    });

    addEventListener(__CONSTANTS__.USERS_LOADING_FAIL, event => {
      __APP_STATE__.usersTableError = event.detail.error;

      dispatchEvent(__UTILS__.createCustomEvent(__CONSTANTS__.USERS_LOADING_STATUS_CHANGE, __CONSTANTS__.FETCH_STATUS_FAIL));
    });
})();
