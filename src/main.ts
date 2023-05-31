import * as core from '@actions/core'
import * as http from '@actions/http-client'

// Q: Github Input から取得できるから、最初に取得しちゃっていいいよね？
const organization = core.getInput('organization', { required: true })
const service = core.getInput('service', { required: true})
const integration_token = core.getInput('integration_token', { required: true })
const version = core.getInput('version', { required: true })
const environment = core.getInput('environment', { required: false })
const description = core.getInput('description', { required: false })
const repository_owner = core.getInput('repository_owner', { required: true })
const repository_name = core.getInput('repository_name', { required: true })
const platform = 'github'

type Service = {
  name: string;
}

type Deployment = {
  ref: string;
  environment: string;
  description: string;
  repository_owner: string;
  repository_name: string;
  platform: 'github';
  service: Service;
}

const createDeployment = async (): Promise<void> => {
  const client = new http.HttpClient()
  const url = `http://localhost:3001/v1/organizations/${organization}/services/${service}/deployments`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${integration_token}`
  };

  const body = {
    ref: version, environment, description, repository_owner, repository_name, platform
  }

  try {
    const response = await client.postJson<Deployment>(url, body, headers);

    // Q: エラーハンドリングしつつ、登録された情報をログに出力したい

    // const result = response.result?.description
    // const code = await response.result.
    // console.log(code);
  } catch(error) {
    // Q: Retry 実装するべきだと思う？sentry-release 見ながら考えるか

    console.error('HTTP request failed:', error);
  }
}

async function run(): Promise<void> {
  try {
    await createDeployment()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
