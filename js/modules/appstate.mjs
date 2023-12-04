import { createCustomEvent, getUsersUrl } from "./utils.mjs";
import { FetchStatus, CustomEvents } from "./constants.mjs";

export const APP_STATE = {
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

APP_STATE.statsTableData = [
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

APP_STATE.statsTableAvaliableCountries = APP_STATE.statsTableData.map(item => item.country);

addEventListener(CustomEvents.usersTableLoadingStart, async event => {
  APP_STATE.usersTableDataLoading = true;

  dispatchEvent(createCustomEvent(CustomEvents.usersTableLoadingStatusChange, FetchStatus.pending)); 

  fetch(getUsersUrl())
    .then(response => response.json())
    .then(json => {
      dispatchEvent(
        createCustomEvent(
          CustomEvents.usersTableLoadingSuccess, { data: json }
        )
      );
    })
    .catch(error => {
      dispatchEvent(createCustomEvent(CustomEvents.usersTableLoadingFail, { error }));
    })
    .finally(() => APP_STATE.usersTableDataLoading = false);
});

addEventListener(CustomEvents.usersTableLoadingSuccess, event => {
  APP_STATE.usersTableData = event.detail.data;
  dispatchEvent(createCustomEvent(CustomEvents.usersTableLoadingStatusChange, FetchStatus.success)); 
});

addEventListener(CustomEvents.usersTableLoadingFail, event => {
  APP_STATE.usersTableError = event.detail.error;
  dispatchEvent(createCustomEvent(CustomEvents.usersTableLoadingStatusChange, FetchStatus.fail));
});
