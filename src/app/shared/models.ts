export interface User { id: number; name: string; email: string; password?: string; role?: string; }
export interface Project { id: number; title: string; description?: string; ownerId?: number; }
export interface Task { id: number; projectId: number; title: string; status: 'todo'|'in-progress'|'done'; assigneeId?: number; }
