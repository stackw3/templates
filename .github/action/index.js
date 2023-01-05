const axios = require("axios");
const { Octokit } = require("@octokit/rest");

const owner = "stackw3";
const branch = "main";
const octokit = new Octokit();

const THIS_TOKEN = process.env.GITHUB_TOKEN;
const GH_TOKEN = process.env.GH_TOKEN;

const getDependencies = (arr, start) => {
  const temp = [];
  for (let i = start + 1; i < arr.length; i++) {
    if (arr[i].includes("##")) {
      break;
    }

    if (arr[i] != "") {
      temp.push(arr[i]);
    }
  }

  // dependencies are in the form of `dependency-name`
  // console.log(temp);

  let ans = [];
  if (temp.length != 0) {
    for (let dep of temp) {
      let string = dep;
      let lastPos = string.indexOf("`", 1);
      let ele = string.slice(1, lastPos);
      ans.push(ele);
    }
  }
  return ans;
};

const getTags = (arr, start) => {
  const temp = [];
  for (let i = start + 1; i < arr.length; i++) {
    if (arr[i].includes("##")) {
      break;
    }

    if (arr[i] != "") {
      temp.push(arr[i]);
    }
  }
  // console.log(temp);

  // formatting tags
  let ans = [];
  if (temp.length != 0) {
    for (let tag of temp) {
      let string = tag;
      let firstPos = string.indexOf("-", 1);
      let lastPos = string.indexOf("-informational", firstPos + 1);
      let ele = string.slice(firstPos + 1, lastPos);
      if (ele.includes("%20")) {
        ele = ele.replaceAll("%20", "-");
      }
      ans.push(ele);
    }
  }
  return ans;
};

const getTemplatesSha = async () => {
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: owner,
      repo: "homepage",
      tree_sha: branch,
      headers: { Authorization: `Bearer ${GH_TOKEN}` },
    }
  );
  const { tree } = data;

  let templatesSha = "";
  for (let it of tree) {
    if (it.path === "templates.json") {
      templatesSha += it.sha;
      break;
    }
  }
  return templatesSha;
};

async function updateFile() {
  try {
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
      {
        owner: owner,
        repo: "templates",
        tree_sha: branch,
        headers: { Authorization: `Bearer ${THIS_TOKEN}` },
      }
    );
    const { tree } = data;

    // filter directories and remove .github
    const trees = tree.filter(
      (item) => item.type === "tree" && item.path != ".github"
    );

    let templates = [];
    let id = 0;
    for (let item of trees) {
      let { path, sha } = item;
      let name, description, tags, dependencies;
      name = path;

      const rmurl = `https://raw.githubusercontent.com/${owner}/templates/${branch}/${path}/README.md`;
      const res1 = await axios
        .get(rmurl, {
          responseType: "text",
        })
        .catch((error) => {
          console.error(error);
        });

      // readme content
      let contentData = res1.data;

      const info = contentData.split("\n");

      let desc = "";
      for (let i = 1; i < info.length; i++) {
        if (info[i].includes("##")) {
          break;
        }

        if (info[i] != "") {
          desc += info[i];
        }
      }
      description = desc;

      for (let i = 0; i < info.length; i++) {
        if (info[i].includes("## Dependencies")) {
          let dep = getDependencies(info, i);
          dependencies = dep;
        }

        if (info[i].includes("## Tags")) {
          let tag = getTags(info, i);
          tags = tag;
        }
      }

      id++;
      templates.push({ id, name, sha, description, tags, dependencies });
    }

    const tempURL = `https://raw.githubusercontent.com/${owner}/homepage/${branch}/templates.json`;
    const res2 = await axios
      .get(tempURL, {
        responseType: "json",
      })
      .catch((error) => {
        console.error(error);
      });

    let oldContentBase64 = Buffer.from(
      JSON.stringify(res2.data, null, 4)
    ).toString("base64");
    const templatesBase64 = Buffer.from(
      JSON.stringify(templates, null, 4)
    ).toString("base64");

    let templatesSha = await getTemplatesSha();

    // check before commit that previous file should not be same as current
    if (oldContentBase64 === templatesBase64) {
      console.log("same content so, don't commit");
      console.log("templates:: ", templates);
      console.log("oldContentBase64:: ", oldContentBase64);
      console.log("templatesBase64:: ", templatesBase64);
    } else {
      console.log("diff content so, do commit");
      const commitRes = await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/{path}",
        {
          owner: owner,
          repo: "homepage",
          path: "templates.json",
          message: "update templates.json",
          branch: branch,
          sha: templatesSha,
          committer: {
            name: "stackw3",
            email: "info@stackw3.app",
          },
          content: templatesBase64,
          headers: { Authorization: `Bearer ${GH_TOKEN}` },
        }
      );
      if (commitRes.status === 200) {
        console.log("commit successful");
        console.log(templates);
        console.log(templatesBase64);
        console.log(commitRes.data);
      } else {
        console.log("commit UNSUCCESSFUL");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
updateFile();
