const { exec } = require('child_process');

// Function to execute shell commands
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Function to delete git branches
async function deleteGitBranches() {
  try {
    // Fetch all branches
    const branchesOutput = await executeCommand('git branch');
    const branches = branchesOutput.split('\n').map(branch => branch.trim()).filter(branch => branch && !branch.startsWith('*'));

    // Loop through each branch and delete it
    for (const branch of branches) {
      await executeCommand(`git branch -D ${branch}`);
      console.log(`Deleted branch: ${branch}`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Run the deleteGitBranches function
deleteGitBranches();