const axios = require("axios");
const { Octokit } = require("@octokit/rest");

const owner = "stackw3";
const repo = "templates";
const branch = "main";
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const admins = ["abhin1509", "akhilvc10", "ceejeey", "stackw3", "antstackio"];

const readmeLink = "https://stackw3.app/readme-generator";

async function commentOnPR(prNo, msg) {
  const res = await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: owner,
      repo: repo,
      issue_number: prNo,
      body: msg,
    }
  );
  console.log(res.status);
  console.log(res.data.body);
  throw new Error(msg);
}

async function validReadme(url, folderName) {
  // check if it is valid or not
  // if not valid return false else true.
  let res1 = await axios
    .get(url, {
      responseType: "text",
    })
    .catch((error) => {
      console.error(error);
    });
  let contentData = res1.data;

  if (
    !contentData.includes("## Tags") ||
    !contentData.includes("## Dependencies")
  ) {
    return false;
  }

  let info = contentData.split("\n");
  let title = info[0].replace("# ", "");

  // folderName should be same as title in readme
  if (title != folderName) {
    return false;
  }

  // check if description is present or not
  let desc = "";
  for (let i = 1; i < info.length; i++) {
    if (info[i].includes("##")) {
      break;
    }

    if (info[i] != "") {
      desc += info[i];
    }
  }
  if (!desc) {
    return false;
  }

  return true;
}

const isNewTemplate = (modifiedFolder, existingFolder) => {
  let tempModifiedFolder = new Set(modifiedFolder);

  // check if tempModifiedFolder is present in tempExistingFolder or not
  tempModifiedFolder.forEach(function (val) {
    let isPresent = existingFolder.includes(val);
    if (isPresent) {
      tempModifiedFolder.delete(val);
    }
  });

  if (tempModifiedFolder.size === 0) {
    // modifying only existing template
    return 0;
  } else if (tempModifiedFolder.size === modifiedFolder.size) {
    // adding a new template
    return 1;
  } else {
    // adding a new template and modifying existing template
    // comment or reject the PR
    return -1;
  }
};


async function validatePR() {
  let prNo = process.env.PR_NUMBER;
  console.log("pull no:: ", prNo);

  // list pull request files
  const res2 = await octokit
    .request("GET /repos/{owner}/{repo}/pulls/{pull_number}/files", {
      accept: "application/vnd.github.v3+json",
      owner,
      repo: "templates",
      pull_number: prNo,
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("pr files:: ", res2.data);

  // list of folders which are modified in the PR
  let modifiedFolder = new Set();
  for (let i = 0; i < res2.data.length; i++) {
    let pr = res2.data[i];
    let { filename } = pr;

    if(filename.includes(".github")) {
      if(!admins.includes(process.env.GITHUB_ACTOR)) {
        await commentOnPR(prNo, ":x: An error occurred: As you are not an admin user, you are not permitted to make changes to the .github folder.");
      }
      continue;
    }
    let folder = filename.split("/")[0];
    modifiedFolder.add(folder);
  }

  // list of existing folders in the repo
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: owner,
      repo: "templates",
      tree_sha: branch,
    }
  );
  const { tree } = data;
  // filter directories and remove .github
  const existingFolders = [];
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].type === "tree" && tree[i].path != ".github") {
      existingFolders.push(tree[i].path);
    }
  }

  let condn = isNewTemplate(modifiedFolder, existingFolders);
  let msg = "";

  if (condn === -1) {
    msg += `:warning: An error occurred: It is not possible to add a new template and modify an existing one in the same pull request. Please submit two separate pull requests.`;
    console.log("msg is:: ", msg);
    await commentOnPR(prNo, msg);
  } else if (condn === 1) {
    console.log("You are adding a new template.");
    // check if readme is present or not for every new folder
    modifiedFolder.forEach(async function (folder) {
      let targetFile = `${folder}/README.md`;
      // check if this file is present or not
      let isFilePresent = false;
      for (let i = 0; i < res2.data.length; i++) {
        if (res2.data[i].filename === targetFile) {
          isFilePresent = true;
          // check if readme is valid or not
          let isReadmeValid = await validReadme(res2.data[i].raw_url, folder);
          if (!isReadmeValid) {
            msg += `:warning: An error occurred: The README.md file provided with the new template is invalid. To ensure a valid README.md file is present in the template folder, you can use our [README generator](${readmeLink}) to create one.`;
            console.log("msg is:: ", msg);
            await commentOnPR(prNo, msg);
          }
          break;
        }
      }

      // if not present comment in the PR that readme is missing
      if (!isFilePresent) {
        msg += `:warning: An error occurred: The new template you are trying to submit is missing a README.md file. Please ensure that a README.md file is included in the template folder before submitting.`;
        console.log("msg :: ", msg);
        await commentOnPR(prNo, msg);
      }
    });
  } else {
    console.log("existing template is edited");
    // check if readme is edited or not for every folder in modifiedFolder
    modifiedFolder.forEach(async function (folder) {
      for (let i = 0; i < res2.data.length; i++) {
        let targerFolder = `${folder}/README.md`;
        if (res2.data[i].filename === targerFolder) {
          // either readme is edited or removed
          if(res2.data[i].status === "removed") {
            msg += `:warning: An error occurred: The README.md file is missing in the existing template you are trying to modify.`;
            // Condn: after removing check if he is again adding that or not in same pr
            console.log("msg :: ", msg);
            await commentOnPR(prNo, msg);
          } else {
            console.log("README.md file is edited in the existing template");
            let isReadmeValid = await validReadme(res2.data[i].raw_url, folder);
            console.log("isReadmeValid:: ", isReadmeValid);
            if (!isReadmeValid) {
              // readme is invalid
              msg += `:warning: An error occurred: The README.md file in the existing template you are trying to modify has been edited and is now invalid. To ensure that a valid README.md file is present in the template, you can use our [README generator](${readmeLink}) to create one.`;
              console.log("msg :: ", msg);
              await commentOnPR(prNo, msg);
            }  
          }
          break;
        }
      }
    });
  }
}
validatePR();