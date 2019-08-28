
export function loadLogin(u) {
  return function (dispatch) {
    fetch("/api/login/"+u[0]+"/"+u[1])
      .then( (response) => {
        return response.json();
      }).then((res) => {
        dispatch(loginLoaded(res));
      });
    };  
  };

function loginLoaded(res) {
  return {
    type: "LOGIN_LOADED",
    value: res
  };
}

export function loadFunds() {
    return function (dispatch) {
      fetch("/api/funds")
      .then( (response) => {
        return response.json();
      }).then((res) => {
        dispatch(fundsLoaded(res));
      });
    };
  }
  function fundsLoaded(res) {
    return {
      type: "FUNDS_LOADED",
      value: res
    };
  }

export function loadFundsSize() {
  return function (dispatch) {
    fetch("/api/fundstotals")
    .then( (response) => {
      return response.json();
    }).then((res) => {
      dispatch(fundsSizeLoaded(res));
    });
  };
}
function fundsSizeLoaded(res) {
  return {
    type: "FUNDS_SIZE_LOADED",
    value: res
  };
}

export function loadInvestments() {
  return function (dispatch) {
    fetch("/api/investments")
    .then( (response) => {
      return response.json();
    }).then((res) => {
      dispatch(investmentsLoaded(res));
    }).catch((error)=>console.log(error.message))
  };
}
function investmentsLoaded(res) {
  return {
    type: "INVESTMENTS_LOADED",
    value: res
  };
}

export function loadDistributions() {
  return function (dispatch) {
    fetch("/api/cf/totals/monthly")
    .then( (response) => {
      return response.json();
    }).then((res) => {
      dispatch(distributionsLoaded(res));
    });
  };
}
function distributionsLoaded(res) {
  return {
    type: "DISTRIBUTIONS_LOADED",
    value: res
  };
}

export function loadDistributionsByFund() {
  return function (dispatch) {
    fetch("/api/cf/totals/funds")
    .then( (response) => {
      return response.json();
    }).then((res) => {
      dispatch(distributionsByFundLoaded(res));
    });
  };
}
function distributionsByFundLoaded(res) {
  return {
    type: "DISTRIBUTIONS_LOADED_FUNDS",
    value: res
  };
}

export function loadcfTotals() {
  return function (dispatch) {
    fetch("/api/cf/totals")
    .then( (response) => {
      return response.json();
    }).then((res) => {
      dispatch(cfTotalsLoaded(res));
    });
  };
}

function cfTotalsLoaded(res) {
  return {
    type: "CFTOTALS_LOADED",
    value: res
  };
}

export function loadInvestors() {
  return function (dispatch) {
    fetch("/api/investments")
    .then( (response) => {
      return response.json();
    }).then((res) => {
      dispatch(investorsLoaded(res));
    });
  };
}
function investorsLoaded(res) {
  return {
    type: "INVESTORS_LOADED",
    value: res
  };
}
 
export function loadInvestorsInvID() {
  let url = window.location.href
  if (url.split("/").slice(-2)[0] === "invid"){
    var urlsplit = url.split("/").slice(-1)[0];
    return function (dispatch) {
      fetch("/api/investments/invid/"+urlsplit)
      .then( (response) => {
        return response.json();
      }).then((res) => {
        dispatch(investorsLoadedInvID(res));
      });
    };
  }
  return investorsLoadedInvID([]);
}

function investorsLoadedInvID(res) {
  return {
    type: "INVESTORS_INVID_LOADED",
    value: res
  };
}

export function updateInvestorCashFlow(oldValue, newValue, row) {
  console.log(oldValue)
  console.log(newValue)
  let url = window.location.href
  var urlsplit = url.split("/").slice(-1)[0];
  // return function (dispatch) {
    fetch("/api/investments/invid/"+urlsplit+"/cf", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({row})
    })
    .then((res) => res.json()
    .then(response => loadInvestorsInvID(response))
    .catch(error => console.error('Error:', error)))
}
//      .then((res) => res.json())
//     .then(response => console.log('Success:', JSON.stringify(response)))
//     .catch(error => console.error('Error:', error));
// {username: "Broly", password: "Peterson"}