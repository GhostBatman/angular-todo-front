import {Component, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import 'rxjs/add/operator/map'
import {TaskListHeaderComponent} from './task-list-header/task-list-header.component'


@Component({
    selector: 'app-root',
    providers: [TaskService, TaskListHeaderComponent],
    templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {
    taskLists: any;
    tasks: any;
    currentTaskList: any;
    title: string;

    constructor() {
    }

    ngOnInit() {
    }

    public taskChanged(tasks) {
        this.tasks = tasks;
    }

    public currentTaskListChanged(currentTaskList) {
        this.currentTaskList = currentTaskList;
        this.title = currentTaskList.name;
    }

}