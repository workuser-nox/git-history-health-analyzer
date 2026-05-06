import * as core from '@actions/core'
import { AnalysisResult } from './types'

export function generateReport(result: AnalysisResult) {
  core.startGroup('Git History Health Report')

  core.info(`Total commits: ${result.totalCommits}`)
  core.info(`Revert commits: ${result.revertCommits}`)

  core.info('Top unstable files:')

  for (const file of result.unstableFiles) {
    core.info(`- ${file.file}: ${file.count} changes`)
  }

  core.endGroup()

  const revertRate =
    result.totalCommits === 0
      ? 0
      : (result.revertCommits / result.totalCommits) * 100

  if (revertRate > 15) {
    core.warning(
      `High revert rate detected: ${revertRate.toFixed(2)}%`
    )
  }
}