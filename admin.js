window.addEventListener("resize", function () {
  if (window.innerWidth < 850) { 
    this.alert("Xem với thiết bị lớn hơn để được trải nghiệm đầy đủ tính năng");
    this.document.body.style.scale = "70%";
  }
})
const API_URL = 'https://ktc-player-base-production.up.railway.app/api/v1'
// DECLARE VARIABLES FORM
const namePlayer = document.querySelector("#name");
const positionPlayer = document.querySelector("#position");
const salaryPlayer = document.querySelector("#salary");
const teamElement = document.querySelector("#team_id");
const dobPlayer = document.querySelector("#yearOfBirth");
const country = document.querySelector("#country");
const heightPlayer = document.querySelector("#height");
const weighPlayer = document.querySelector("#weigh");
const addBtn = document.querySelector("#addPlayer");
const avatarPlayer = document.querySelector("#imagePlayer");
const tableElement = document.querySelector(".danhsach tbody");
const row = document.querySelector("tr");
const editBtn = document.querySelector("#editBtn");
const delBtn = document.querySelector("#delBtn");
const inputFileAvatar = document.querySelector("#input__file-avatar");
const stat_ss = document.querySelector("#stat-ss");
const stat_bc = document.querySelector("#stat-bc");
const stat_ls = document.querySelector("#stat-ls");
const stat_sp = document.querySelector("#stat-sp");
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW52bzEyMDIiLCJpYXQiOjE3MjM3OTI3MDcsImV4cCI6MTgxMDE5MjcwN30.KrTYRXUVSUZw5-ntBdnXV0IEkyCsDOZc2ESVe87f4DY";
// DECLARE VARIABLES EDIT FORM
const imagePreviewEdit = document.querySelector("#imagePreviewEdit");
const namePlayerEdit = document.querySelector("#nameEdit");
const positionPlayerEdit = document.querySelector("#positionEdit");
const salaryPlayerEdit = document.querySelector("#salaryEdit");
const teamEdit = document.querySelector("#teamIdEdit");
const dobPlayerEdit = document.querySelector("#yearOfBirthEdit");
const countryEdit = document.querySelector("#countryEdit");
const heightPlayerEdit = document.querySelector("#heightEdit");
const weighPlayerEdit = document.querySelector("#weighEdit");
const saveBtn = document.querySelector("#save");
const avatarPlayerEdit = document.querySelector("#imagePlayerEdit");
let avatarPlayerEditValue;
const inputFileAvatarEdit = document.querySelector("#input__file-avatarEdit");
const stat_ssEdit = document.querySelector("#stat-ssEdit");
const stat_bcEdit = document.querySelector("#stat-bcEdit");
const stat_lsEdit = document.querySelector("#stat-lsEdit");
const stat_spEdit = document.querySelector("#stat-spEdit");
function clearForm() {
  namePlayer.value = "";
  positionPlayer.value = "";
  salaryPlayer.value = "";
  teamElement.value = "";
  dobPlayer.value = "";
  country.value = "";
  heightPlayer.value = "";
  weighPlayer.value = "";
}

const renderTableHTML = (data) =>
  `<tr>
      <td>
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img src="${
                data["avatar"] || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              }" id="imagePlayer" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div class="font-bold">${data["name"]}</div>
            <div class="text-sm opacity-50">${data.team["name"]}</div>
          </div>
        </div>
      </td>
      <td>
        <div>Sprint Speed ${data["ss"]}</div>
        <div>Ball Control ${data["bc"]}</div>
        <div>Long Shot ${data["ls"]}</div>
        <div>Shot Power ${data["sp"]}</div>
      </td>
      <td class="text-center">${data["height"] + "cm" + " "} ${
    data["weigh"] + "kg"
  }</td>
      <td class="text-center">${data["salary"] + "£"} </td>
      <td class="text-center"><button onclick="editData(${
        data["id"]
      })" id="editBtn"><?xml version="1.0" ?><label for="my-drawer-4" class="drawer-button btn btn-success btn-md"><svg enable-background="new 0 0 32 32" width="1.5rem" height="1.5rem" id="svg2" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="user_x5F_profile_x5F_edit"><path d="M12.001,18c2.209,0,4-1.791,4-4s-1.791-4-4-4s-4,1.791-4,4S9.792,18,12.001,18z M24.001,14.059V5.584L18.415,0H0.001v32h24   v-0.06C28.5,31.442,32,27.633,32,23S28.5,14.557,24.001,14.059z M17.999,2.413L21.587,6h-3.588V2.413z M2.001,30V1.998h14v6.001h6   v6.06c-3.477,0.385-6.348,2.75-7.477,5.941c-3.562,0-8.523,0-8.523,0s-2,0-2,2c0,1,0,6,0,6h11.518c0.506,0.756,1.125,1.43,1.832,2   H2.001z M23.001,29.999c-3.865-0.008-6.994-3.135-7-6.999c0.006-3.865,3.135-6.994,7-7c3.864,0.006,6.991,3.135,6.999,7   C29.992,26.864,26.865,29.991,23.001,29.999z"/><polygon points="22,27 19,27 19,24  "/><rect height="4.243" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 56.5269 20.5858)" width="7.071" x="20.464" y="19.879"/></g></svg></label></button></td>                    
      <td class="text-center"><button onclick="deleteData(${
        data["id"]
      })" id="delBtn" class="btn btn-error btn-md"><?xml version="1.0" ?><svg viewBox="0 0 448 512" width="1.5rem" height="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/></svg></button></td>
    </tr>`;

const fetchApi = async (url, options) => {
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error.message);
    });
};

(async function init() {
  await fetchPlayers();
  await fetchTeams();
})();

// RENDER DATA TABLE
async function fetchPlayers() {
  try {
    const { data } = await fetchApi(API_URL + `/player`, { method: "GET" });
    if(data && data.length > 0) {
      tableElement.innerHTML =
        data?.map((data) => renderTableHTML(data))?.join("") ?? ""
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// RENDER TEAM FOOTBALL
async function fetchTeams() {
  try {
    const { data } = await fetchApi(API_URL + `/team`, { method: "GET" });
    if(data && data.length > 0) {
      teamElement.innerHTML =
        data?.map((data) => `<option value="${data["id"]}">${data["name"]}</option>`)?.join("") ?? ""
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch Team Edit
async function fetchTeamEdit(teamId) {
  fetch("https://ktc-player-base-production.up.railway.app/api/v1/team", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const teamResult = data.data.map((data) => {
        return `<option value="${data["id"]}" ${data["id"] === teamId ? "selected" : ""}>${data["name"]}</option>`;
      });
      teamEdit.innerHTML = teamResult.join("");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//UPLOAD IMAGE
inputFileAvatar.addEventListener("change", async (e) => {
  const getFile = e.target.files[0];
  console.log(getFile);
  const response = await uploadImage(getFile);
});

inputFileAvatarEdit.addEventListener("change", async (e) => {
  const getFile = e.target.files[0];
  console.log(getFile);
  const response = await uploadImage(getFile);
  imagePreviewEdit.src = avatarPlayerEditValue;
});

async function uploadImage(valueImage) {
  // Get the selected file
  const formData = new FormData();
  formData.append("file", valueImage);
  formData.append("folder", "avatar");
  // console.log(...formData)
  try {
    const res = await fetch(
      "https://ktc-player-base-production.up.railway.app/api/v1/upload/image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (!res.ok) {
      throw new Error(`Error status:${res.status()}`);
    }
    const data = await res.json();
    avatarPlayerEditValue = data.secure_url;
    // console.log("link hinh moi ne "+avatarPlayerEditValue);
    if(inputFileAvatar){
    return (imagePreview.src = data.secure_url);
  }if(inputFileAvatarEdit){
    return (imagePreviewEdit.src = avatarPlayerEditValue);
  }
  } catch (error) {
    console.log(error);
  }
}
// FUNCTIONS
// ADD FORM
addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  // Create a new player object with the form values
  const newPlayer = {
    avatar: imagePreview.src,
    name: namePlayer.value,
    ss:stat_ss.value | 80,
    bc:stat_bc.value | 89,
    ls:stat_ls.value | 91,
    sp:stat_sp.value |80,
    position: positionPlayer.value,
    salary: salaryPlayer.value,
    year_of_birth: dobPlayer.value,
    country: country.value | "England",
    height: heightPlayer.value,
    weigh: weighPlayer.value,
    team_id: teamElement.value | 1,
  };
  fetch("https://ktc-player-base-production.up.railway.app/api/v1/player", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlayer),
  });
  clearForm();
  fetchPlayers();
});
async function deleteData(id) {
  try {
    const response = await fetch(
      `https://ktc-player-base-production.up.railway.app/api/v1/player/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error status: ${response.status()}`);
    }
    fetchPlayers();
  } catch (error) {
    console.error("Error:", error);
  }
}
tableElement.addEventListener("click", (e) => {
  if (e.target.id === "delBtn") {
    const playerId = e.target.closest("tr").dataset.id;
    deleteData(playerId);
  }
});

tableElement.addEventListener("click", (e) => {
  if (e.target.id === "editBtn") {
    const playerId = e.target.closest("tr").dataset.id;
    editData(playerId);
  }
});

async function editData(id) {
  // console.log(id);
  try {
    const response = await fetch(
      `https://ktc-player-base-production.up.railway.app/api/v1/player/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error status: ${response.status()}`);
    }
    const data = await response.json();
    fetchTeamEdit(data.data.team["id"]);
    imagePreviewEdit.src = data.data.avatar || imagePreviewEdit.src;
    namePlayerEdit.value = data.data.name;
    teamEdit.innerHTML = data.data.team["name"];
    stat_ssEdit.value = data.data.ss;
    stat_bcEdit.value = data.data.bc;
    stat_lsEdit.value = data.data.ls;
    stat_spEdit.value = data.data.sp;
    positionPlayerEdit.value = data.data.position;
    salaryPlayerEdit.value = data.data.salary;
    dobPlayerEdit.value = data.data.yearOfBirth;
    countryEdit.value = data.data.country;
    heightPlayerEdit.value = data.data.height;
    weighPlayerEdit.value = data.data.weigh;
  } catch (error) {
    console.error("Error:", error);
  }

  saveBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const updatedPlayer = {
      avatar: avatarPlayerEditValue || imagePreviewEdit.src,
      name: namePlayerEdit.value,
      ss: stat_ssEdit.value,
      bc: stat_bcEdit.value,
      ls: stat_lsEdit.value,
      sp: stat_spEdit.value,
      position: positionPlayerEdit.value,
      salary: salaryPlayerEdit.value,
      year_of_birth: dobPlayerEdit.value,
      country: countryEdit.value,
      height: heightPlayerEdit.value,
      weigh: weighPlayerEdit.value,
      team_id: teamEdit.value,
    };

    try {
      const response = await fetch(
        `https://ktc-player-base-production.up.railway.app/api/v1/player/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPlayer),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error status: ${response.status()}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }  
    fetchPlayers();    
  });
}


