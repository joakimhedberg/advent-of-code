import Part from "./Part";
import Workflow from "./Workflow";

export default class HeapSystem {
  public readonly workflows = new Map<string, Workflow>()
  public readonly parts: Part[] = []

  constructor(data: string) {
    let inWorkflows = true
    let index = 0
    for (const line of data.split('\n').map(l => l.trim())) {
      if (line === '') {
        inWorkflows = false
        continue
      }

      if (inWorkflows) {
        const workflow = new Workflow(line)
        this.workflows.set(workflow.name, workflow)
      }
      else {
        const part = new Part(index, line)
        this.parts.push(part)
      }
    }
  }

  public get part1Result(): number {
    const resultParts: Part[] = []
    const startWorkflow = this.workflows.get('in')
    for (const part of this.parts) {
      const result = startWorkflow.getPartMatch(part, this.workflows)
      if (result === 'A') {
        resultParts.push(part)
      }
    }

    return resultParts.map(r => r.totals).reduce((a, b) => a + b)
  }

  public get part2Result(): number {
    throw new Error('Not implemented.')   
  }
}