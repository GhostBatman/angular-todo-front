import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
@Injectable()
export class TaskService {

  constructor(private http: Http) {
  }

  getTaskLists() {
    return this.http.get('http://loc.todo.kg/api/v1/task-lists')
  }

  createTaskList(taskList: string) {
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    return this.http.post('http://loc.todo.kg/api/v1/task-lists', {taskList: taskList}, {headers: headers})
  }

  getTasks(id: number) {
    return this.http.get('http://loc.todo.kg/api/v1/task-lists/' + id + '/tasks');
  }

  updateTask(task: any) {
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    return this.http.put('http://loc.todo.kg/api/v1/tasks/' + task.id, JSON.stringify(task), {headers: headers})
  }

  createTask(task: any, taskListId: number) {
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    return this.http.post('http://loc.todo.kg/api/v1/task-lists/' + taskListId + '/tasks', JSON.stringify(task), {headers: headers})
  }

  removeTask(id: number) {
    return this.http.delete('http://loc.todo.kg/api/v1/tasks/' + id);
  }

  updateTaskList(taskList: any) {
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    return this.http.put('http://loc.todo.kg/api/v1/taskLists/' + taskList.id, JSON.stringify(taskList), {headers: headers})
  }

}
