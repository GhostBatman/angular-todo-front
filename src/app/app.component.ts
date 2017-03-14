import {Component, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import 'rxjs/add/operator/map'

@Component({
    selector: 'app-root',
    providers: [TaskService],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    taskLists: any;
    tasks: any;
    title: any;
    newTaskText: string;
    currentTaskList: any;
    newTaskListText: string = '';
    newTaskListName: string;

    constructor(private taskListService: TaskService) {
    }


    ngOnInit() {
        this.taskListService.getTaskLists() .subscribe((data) => {
            this.taskLists = data.json();
            this.currentTaskList = this.taskLists[0];
            this.changeTab(this.currentTaskList);
        });
    }

    public getTasksLists = () => {
        this.taskListService.getTaskLists() .subscribe((data) => {
            this.taskLists = data.json();
            this.changeTab(this.currentTaskList);
        });

    };

    public changeTab = (taskList) => {
        this.taskListService.getTasks(taskList.id) .subscribe((data) => {
            this.currentTaskList.className = '';
            this.currentTaskList = taskList;
            this.tasks = data.json();
            this.title = taskList.name;
            this.newTaskListName = this.currentTaskList.name;
            this.currentTaskList.className = 'current-nav-bar-item';
        });
    };

    public changeTaskCheckStatus = (task) => {
        task.is_checked = !task.is_checked;
        this.taskListService.updateTask(task) .subscribe(() => {
            this.getTasksLists();
        });

    };

    public createNewTask() {
        if (this.newTaskText) {
            let task = {
                task_text: this.newTaskText,
                is_checked: 0,
                task_list_id: this.currentTaskList.id
            };
            this.newTaskText = '';
            this.tasks.push(task);
            this.taskListService.createTask(task, this.currentTaskList.id)
                .subscribe(data => this.getTasksLists(),
                    error => this.getTasksLists()
                );
        }
    }

    public removeTask(task) {
        this.taskListService.removeTask(task.id) .subscribe(() => {
            this.getTasksLists();
        });

    }

    public createNewTaskList() {
        if (this.newTaskListText.trim()) {
            this.taskListService.createTaskList(this.newTaskListText)
                .subscribe(() => {
                    this.newTaskListText = '';
                    this.ngOnInit();
                });
        }


    }

    public renameTaskList() {
        this.currentTaskList.name = this.newTaskListName;
        this.taskListService.updateTaskList(this.currentTaskList)
            .subscribe(() => {
                this.newTaskListName = '';
                this.getTasksLists();
            });
    }
}