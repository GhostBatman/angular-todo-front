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
    title: any;
    currentTaskList: any;


    constructor() {
    }

    ngOnInit() {
    }

    public taskChanged(tasks) {
        this.tasks = tasks;
    }

    public currentTaskListChange(currentTaskList) {
        this.currentTaskList = currentTaskList;
    }

}