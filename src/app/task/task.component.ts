import {Component, OnInit, Input} from '@angular/core';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
    providers: [TaskService],
})
export class TaskComponent implements OnInit {
    @Input('task') task: any;

    constructor(private taskListService: TaskService) {
    }

    ngOnInit() {
    }

    public changeTaskCheckStatus = (task) => {
        task.is_checked = !task.is_checked;
        this.taskListService.updateTask(task) .subscribe(() => {
        });

    };

    public removeTask(task) {
        this.taskListService.removeTask(task.id) .subscribe(() => {
            //this.changeTab(this.currentTaskList)
        });

    }
}
