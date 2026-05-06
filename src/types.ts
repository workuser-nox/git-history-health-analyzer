export interface FileChange {
  file: string
  count: number
}

export interface AnalysisResult {
  totalCommits: number
  revertCommits: number
  unstableFiles: FileChange[]
}