export function loadInvCID() {
    let url = window.location.href
    if (url.split("/").slice(-2)[0] === "cid"){
      var urlsplit = url.split("/").slice(-1)[0];
      return function (dispatch) {
        fetch("/api/investments/cid/"+urlsplit)
        .then( (response) => {
          return response.json();
        }).then((res) => {
          dispatch(invLoadedCID(res));
        });
      };
    }
    return invLoadedCID([]);
  }
  
  function invLoadedCID(res) {
    return {
      type: "INVESTORS_CID_LOADED",
      value: res
    };
  }