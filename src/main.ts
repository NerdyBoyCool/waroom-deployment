import * as core from '@actions/core'
import * as http from '@actions/http-client'

const organization = core.getInput('organization', {required: true})
const service = core.getInput('service', {required: true})
const integrationToken = core.getInput('integration_token', {required: true})
const version = core.getInput('version', {required: true})
const environment = core.getInput('environment', {required: false})
const description = core.getInput('description', {required: false})
const repository_owner = core.getInput('repository_owner', {required: false})
const repository_name = core.getInput('repository_name', {required: false})
const platform = 'github'

type Deployment = {
  ref: string
  environment?: string
  description?: string
  repository_owner?: string
  repository_name?: string
  platform: 'github'
}

const createDeployment = async (): Promise<void> => {
  const client = new http.HttpClient()
  const url = `http://api.beta.waroom.com/v1/organizations/${organization}/services/${service}/deployments`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${integrationToken}`
  }

  const body: Deployment = {
    ref: version,
    repository_owner,
    repository_name,
    platform,
    environment,
    description
  }

  const response = await client.postJson(url, body, headers)
  const code = response.statusCode
  if (code === 401) {
    throw new Error('Deployment Integration Key is Invalid')
  }
  if (code !== 200) {
    throw new Error()
  }

  core.info('Completion of Waroom Deployment Data Creation')
}

async function run(): Promise<void> {
  try {
    await createDeployment()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
