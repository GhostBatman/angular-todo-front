import {Component, OnInit, Input} from '@angular/core';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.css'],
    providers: [TaskService],
})
export class CreateTaskComponent implements OnInit {
    taskLists: any;
    @Input('tasks') tasks: any;
    title: any;
    newTaskText: string;
    @Input('currentTaskList') currentTaskList: any;
    newTaskListText: string = '';
    newTaskListName: string;
    taskListEditStateOff: boolean = true;

    constructor(private taskListService: TaskService) {

    }

    ngOnInit() {
    }

    public createNewTask() {
        if (this.newTaskText) {
            let task = {
                task_text: this.newTaskText,
                is_checked: 0,
                task_list_id: this.currentTaskList.id
            };
            this.newTaskText = '';

            this.currentTaskList.countTasks++;
            this.taskListService.createTask(task, this.currentTaskList.id)
                .subscribe(data => {
                    this.tasks.push(data.json()[0]);
                });
        }
    };

}
