import { run } from './git'
import { AnalysisResult } from './types'

export function analyze(days: number): AnalysisResult {
  const since = `${days}.days`

  const commitLog = run(
    `git log --since="${since} ago" --pretty=format:%s`
  )

  const commits = commitLog.split('\n').filter(Boolean)

  const revertCommits = commits.filter((commit) =>
    commit.toLowerCase().includes('revert')
  ).length

  const changedFilesRaw = run(
    `git log --since="${since} ago" --name-only --pretty=format:`
  )

  const files = changedFilesRaw
    .split('\n')
    .filter(Boolean)

  const fileMap = new Map<string, number>()

  for (const file of files) {
    fileMap.set(file, (fileMap.get(file) || 0) + 1)
  }

  const unstableFiles = [...fileMap.entries()]
    .map(([file, count]) => ({
      file,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return {
    totalCommits: commits.length,
    revertCommits,
    unstableFiles
  }
}