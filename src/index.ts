import * as core from '@actions/core'
import { analyze } from './analyzer'
import { generateReport } from './report'

async function main() {
  try {
    const days = Number(core.getInput('days'))

    const result = analyze(days)

    generateReport(result)
  } catch (error) {
    core.setFailed(
      error instanceof Error
        ? error.message
        : 'Unknown error'
    )
  }
}

main()