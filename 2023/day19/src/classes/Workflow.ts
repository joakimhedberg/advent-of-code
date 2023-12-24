import Part from "./Part"
import WorkflowConditionalAction from "./WorkflowConditionalAction"

export default class Workflow {
  public readonly name: string
  public readonly defaultTarget: string
  public readonly actions: WorkflowConditionalAction[] = []
  
  constructor(line: string) {
    this.name = line.slice(0, line.indexOf('{'))
    this.defaultTarget = line.slice(line.lastIndexOf(',') + 1, -1)
    
    const actions = line.slice(line.indexOf('{') + 1, line.lastIndexOf(',') - line.length).split(',')
    for (const act of actions) {
      const action = new WorkflowConditionalAction(act)
      this.actions.push(action)
    }
  }

  public getPartMatch(part: Part, workflows: Map<string, Workflow>): 'A' | 'R' {
    let target: string | undefined = undefined
    for (const act of this.actions) {
      if (act.isMatch(part)) {
        target = act.targetWorkflow
        break
      }
    }

    if (target === undefined) {
      target = this.defaultTarget
    }

    part.passedWorkflows.push(`${this.name} = '${target}'`)
    if (target === 'A') return 'A'
    if (target === 'R') return 'R'

    const nextWorkflow = workflows.get(target)
    return nextWorkflow.getPartMatch(part, workflows)
  }

}