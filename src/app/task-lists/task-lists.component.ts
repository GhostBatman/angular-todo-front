import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-task-lists',
    templateUrl: './task-lists.component.html',
    styleUrls: ['./task-lists.component.css'],
    providers: [TaskService]
})
export class TaskListsComponent implements OnInit {
    @Input('taskLists') taskLists: any;
    tasks: any;
    currentTaskList: any;
    newTaskListText: string = '';
    newTaskListName: string;
    @Output() tasksChange = new EventEmitter<any>();
    @Output() currentTaskListChange = new EventEmitter<any>();


    constructor(private taskListService: TaskService) {
    }

    ngOnInit() {
        this.taskListService.getTaskLists() .subscribe((data) => {
            this.taskLists = data.json();
            this.currentTaskList = this.taskLists[0];
            this.changeTab(this.currentTaskList);
        });
    }

    public changeTab = (taskList) => {
        this.taskListService.getTasks(taskList.id) .subscribe((data) => {
            this.currentTaskList.className = '';
            this.currentTaskList = taskList;
            this.tasks = data.json();
            this.tasksChange.emit(this.tasks);
            this.newTaskListName = this.currentTaskList.name;
            this.currentTaskList.className = 'current-nav-bar-item';
            this.currentTaskListChange.emit(this.currentTaskList);
        });
    };

    public createNewTaskList() {
        if (this.newTaskListText.trim()) {
            this.taskListService.createTaskList(this.newTaskListText)
                .subscribe(() => {
                    this.newTaskListText = '';
                    this.ngOnInit();
                });
        }


    }
}
