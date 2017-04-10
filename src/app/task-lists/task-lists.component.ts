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
    title: any;
    newTaskText: string;
    currentTaskList: any;
    newTaskListText: string = '';
    newTaskListName: string;
    taskListEditStateOff: boolean = true;
    @Output() changeTab = new EventEmitter<any>();


    changeTaskList(increased :any) {
        this.changeTab.emit(increased );
    }

    constructor(private taskListService: TaskService) {
    }

    ngOnInit() {
    }

   // public changeTab = (taskList) => {
   //     this.taskListService.getTasks(taskList.id) .subscribe((data) => {
   //         this.currentTaskList.className = '';
   //         this.currentTaskList = taskList;
   //         this.tasks = data.json();
   //         this.title = taskList.name;
   //         this.newTaskListName = this.currentTaskList.name;
   //         this.currentTaskList.className = 'current-nav-bar-item';
   //     });
   // };

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
