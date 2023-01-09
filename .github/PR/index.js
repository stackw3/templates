const axios = require("axios");
const { Octokit } = require("@octokit/rest");

const owner = "stackw3";
const repo = "templates";
const branch = "dev";
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

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
    msg += `You can't add a new template and modify existing template in the same PR. Please create two different PRs.`;
    console.log("msg is:: ", msg);
    await commentOnPR(prNo, msg);
  } else if (condn === 1) {
    msg += `You are adding a new template.`;
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
            msg += ` Invalid README.md file. Please make sure that you have added a valid README.md file in the template folder`;
            console.log("msg is:: ", msg);
            await commentOnPR(prNo, msg);
          }
          break;
        }
      }

      // if not present comment in the PR that readme is missing
      if (!isFilePresent) {
        msg += ` README.md file is missing. Please make sure that you have added a README.md file in the template folder`;
        console.log("msg :: ", msg);
        await commentOnPR(prNo, msg);
      }
    });
  } else {
    msg += `You are modifying an existing template.`;
    // check if readme is edited or not for every folder in modifiedFolder
    modifiedFolder.forEach(async function (folder) {
      for (let i = 0; i < res2.data.length; i++) {
        let targerFolder = `${folder}/README.md`;
        if (res2.data[i].filename === targerFolder) {
          // either readme is edited or removed
          if (res2.data[i].status === "removed") {
            msg += ` README.md file is missing.`;
            // Condn: after removing check if he is again adding that or not in same pr
            console.log("msg :: ", msg);
            await commentOnPR(prNo, msg);
          } else {
            msg += ` README.md file is edited in the existing template.`;
            let isReadmeValid = await validReadme(res2.data[i].raw_url, folder);
            console.log("isReadmeValid:: ", isReadmeValid);
            if (!isReadmeValid) {
              // readme is invalid
              msg += ` Invalid README.md. Please make sure that you have added a valid README.md file.`;
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
