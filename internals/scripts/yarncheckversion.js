const { exec } = require('child_process');
exec('yarn -v', (err, stdout) => {
  if (err) throw err;
  if (parseFloat(stdout) < 1) {
    // NOTE: This can happen if you have a dependency which lists an old version of yarn in its own dependencies.
    throw new Error(`[ERROR] You need yarn version @>=1 but you have ${stdout}`);
  }
});
