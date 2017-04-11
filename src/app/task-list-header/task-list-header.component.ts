import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-task-list-header',
    templateUrl: './task-list-header.component.html',
    styleUrls: ['./task-list-header.component.css'],

    providers: [TaskService]
})
export class TaskListHeaderComponent implements OnInit {
    taskListEditStateOff: boolean = true;
    @Input('currentTaskList') currentTaskList: any;
    newTaskListName: string;
    @Input('title') title : string;


    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
    }

    public taskListEdit() {
        this.taskListEditStateOff = this.taskListEditStateOff !== true;
    }

    public renameTaskList() {
        this.currentTaskList.name = this.newTaskListName;
        // this.title = this.newTaskListName;
        this.taskService.updateTaskList(this.currentTaskList)
            .subscribe(() => {
                this.newTaskListName = '';
            });
        this.taskListEdit()
    }
}
