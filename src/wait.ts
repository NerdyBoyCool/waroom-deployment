export async function wait(milliseconds: number): Promise<string> {
  return new Promise(resolve => {
    if (isNaN(milliseconds)) {
      throw new Error('milliseconds not a number')
    }

    setTimeout(() => resolve('done!'), milliseconds)
  })
}
// const ms: string = core.getInput('milliseconds')
// core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

// core.debug(new Date().toTimeString())
// await wait(parseInt(ms, 10))
// core.debug(new Date().toTimeString())
// // token, ref, environment, platform, description, repository_owner, repository_name

// core.setOutput('time', new Date().toTimeString())
